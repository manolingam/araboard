import { dayChunks, totalDays } from '../hooks/blockNumbers.util';
import * as _ from 'lodash';
import { DateTime } from 'luxon';
import { GraphQLClient } from 'graphql-request';

const PARTICIPANTS_SUBGRAPH_ENDPOINT = 'https://api.thegraph.com/subgraphs/name/ukstv/ant-cumulative-stats';
const graphQLClient = new GraphQLClient(PARTICIPANTS_SUBGRAPH_ENDPOINT);

const today = DateTime.local();

const PAGE = 1000;

function GET_STATS_AROUND_DAY(dateTime) {
  const dayBefore = Math.round(dateTime.minus({ day: 1 }).startOf('day').valueOf() / 1000);
  const dayAfter = Math.round(dateTime.endOf('day').valueOf() / 1000);
  return `query GetStats {
    stats(first: ${PAGE}, where: {timestamp_lte: ${dayAfter}, timestamp_gte: ${dayBefore}}) {
      id
      holders
      block
      timestamp
    }
  }
`;
}

export class AntParticipantsService {
  constructor() {
    this._timeseriesCache = new Map();
  }

  async timeseries(period) {
    const found = this._timeseriesCache.get(period);
    if (found) {
      return found;
    } else {
      const daysNumber = totalDays(period);
      const allDays = _.times(daysNumber).map((i) => today.minus({ day: i }));
      const actualDaysToLoad = dayChunks(allDays).map((d) => _.maxBy(d, (d) => d.startOf('day').valueOf()));
      const loaded = actualDaysToLoad.map(async (day) => {
        const data = await graphQLClient.request(GET_STATS_AROUND_DAY(day));
        return data.stats.map((stat) => {
          const timestamp = DateTime.fromJSDate(new Date(Number(stat.timestamp) * 1000));
          const value = Number(stat.holders);
          return { timestamp, value };
        });
      });
      const chunks = await Promise.all(loaded);
      const timeseries = _.sortBy(_.flatten(chunks), (p) => p.timestamp.valueOf());
      const groupedByDay = _.groupBy(timeseries, (point) => point.timestamp.startOf('day'));
      let daySeries = [];
      for (let dayString in groupedByDay) {
        const day = DateTime.fromISO(dayString);
        const points = groupedByDay[dayString].map((d) => d.value);
        const mean = Math.floor(_.max(points));
        daySeries.push({
          timestamp: day,
          value: mean,
        });
      }
      const step = Math.round(daySeries.length / 10);
      const result = _.chunk(_.sortBy(daySeries, (s) => s.timestamp.valueOf()).reverse(), step)
        .map((group) => {
          const timestamp = group[0].timestamp;
          const value = _.max(group.map((g) => g.value));
          return {
            timestamp,
            value,
          };
        })
        .reverse();
      this._timeseriesCache.set(period, result);
      return result;
    }
  }
}
