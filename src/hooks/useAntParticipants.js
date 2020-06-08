import { useEffect, useState } from 'react';
import * as _ from 'lodash';
import { GraphQLClient } from 'graphql-request';
import { DateTime } from 'luxon';
import { Period } from '../template/graphContainer/Period';

const PAGE = 1000;

function GET_STATS(skip = 0) {
  return `query GetStats {
    stats(first: ${PAGE}, orderBy: timestamp, orderDirection: desc, skip: ${skip}) {
      id
      holders
      block
      timestamp
    }
  }
`;
}

function GET_STATS_AROUND_DAY(dateTime) {
  const dayBefore = Math.round(dateTime.minus({ day: 1 }).valueOf() / 1000);
  const dayAfter = Math.round(dateTime.plus({ day: 1 }).valueOf() / 1000);
  return `query GetStats {
    stats(where: {timestamp_lt: ${dayAfter}, timestamp_gt: ${dayBefore}}) {
      id
      holders
      block
      timestamp
    }
  }
`;
}

const PARTICIPANTS_SUBGRAPH_ENDPOINT = 'https://api.thegraph.com/subgraphs/name/ukstv/ant-cumulative-stats';
const graphQLClient = new GraphQLClient(PARTICIPANTS_SUBGRAPH_ENDPOINT);

const today = DateTime.local();
const lastMonth = today.minus({ month: 1 });

function headOfPeriod(period) {
  switch (period) {
    case Period.M1:
      return today.minus({ month: 1 });
    case Period.M3:
      return today.minus({ month: 3 });
    case Period.M6:
      return today.minus({ month: 6 });
    default:
      throw new Error(`Unknown period ${period}`);
  }
}

async function loadPeriod(head, skip = 0, stats = []) {
  if (stats && stats[0] && stats[0].timestamp && stats[0].timestamp.valueOf() <= head.valueOf()) {
    return stats;
  } else {
    const data = await graphQLClient.request(GET_STATS(skip));
    const nextStats = data.stats.map((stat) => {
      const timestamp = DateTime.fromJSDate(new Date(Number(stat.timestamp) * 1000));
      const value = Number(stat.holders);
      return { timestamp, value };
    });
    return loadPeriod(head, skip + PAGE, nextStats.concat(...stats));
  }
}

function daysPerPeriod(period) {
  switch (period) {
    case Period.M1:
      return 3;
    case Period.M3:
      return 10;
    case Period.M6:
      return 20;
    default:
      throw new Error(`Unknown period ${period}`);
  }
}

function totalDays(period) {
  switch (period) {
    case Period.M1:
      return 30;
    case Period.M3:
      return 90;
    case Period.M6:
      return 180;
    default:
      throw new Error(`Unknown period ${period}`);
  }
}

export function useAntParticipants(period) {
  const [state, setState] = useState({ loading: true, error: null, data: null });

  useEffect(() => {
    setState({
      loading: true,
      error: null,
      data: null,
    });
    const head = headOfPeriod(period);
    const daysNumber = totalDays(period);
    const allDays = _.times(daysNumber).map((i) => today.minus({ day: i }));
    const dayChunks = _.chunk(allDays, daysPerPeriod(period));
    const actualDaysToLoad = dayChunks.map((d) => _.maxBy(d, d => d.valueOf()));
    const loaded = actualDaysToLoad.map(async (day) => {
      const data = await graphQLClient.request(GET_STATS_AROUND_DAY(day));
      return data.stats.map((stat) => {
        const timestamp = DateTime.fromJSDate(new Date(Number(stat.timestamp) * 1000));
        const value = Number(stat.holders);
        return { timestamp, value };
      });
    });
    Promise.all(loaded).then(async (chunks) => {
      const timeseries = _.sortBy(_.flatten(chunks), (p) => p.timestamp.valueOf());
      const groupedByDay = _.groupBy(timeseries, (point) => point.timestamp.startOf('day'));
      let daySeries = [];
      for (let dayString in groupedByDay) {
        const day = DateTime.fromISO(dayString);
        const points = groupedByDay[day].map((d) => d.value);
        const mean = Math.floor(_.max(points));
        if (day.valueOf() >= head.valueOf()) {
          daySeries.push({
            timestamp: day,
            value: mean,
          });
        }
      }
      const step = Math.round(daySeries.length / 10);
      const series = _.chunk(_.sortBy(daySeries, (s) => s.timestamp.valueOf()).reverse(), step)
        .map((group) => {
          const timestamp = group[0].timestamp;
          const value = _.max(group.map((g) => g.value));
          return {
            timestamp,
            value,
          };
        })
        .reverse();
      setState({
        loading: false,
        error: null,
        data: series,
      });
    });
  }, [period]);

  return state;
}
