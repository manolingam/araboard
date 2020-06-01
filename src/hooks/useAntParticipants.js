import React, { useEffect, useState } from "react";
import * as _ from 'lodash';
import { GraphQLClient } from 'graphql-request';
import { DateTime } from 'luxon';

function GET_STATS(skip = 0) {
  return `query GetStats {
    stats(orderBy: timestamp, orderDirection: desc, skip: ${skip}) {
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

async function loadMonth(skip = 0, stats = []) {
  if (stats && stats[0] && stats[0].timestamp && stats[0].timestamp.valueOf() <= lastMonth.valueOf()) {
    return stats;
  } else {
    const data = await graphQLClient.request(GET_STATS(skip));
    const nextStats = data.stats.map(stat => {
          const timestamp = DateTime.fromJSDate(new Date(Number(stat.timestamp) * 1000))
          const value = Number(stat.holders);
          return { timestamp, value };
    })
    return loadMonth(skip + 100, nextStats.concat(...stats))
  }
}

export function useAntParticipants() {
  const [state, setState] = useState({loading: true, error: null, data: null})

  useEffect(() => {
    loadMonth()
      .then((timeseries) => {
        const groupedByDay = _.groupBy(timeseries, (point) => point.timestamp.startOf('day'));
        let daySeries = []
        for (let dayString in groupedByDay) {
          const day = DateTime.fromISO(dayString)
          const points = groupedByDay[day].map((d) => d.value);
          const mean = Math.floor(_.mean(points));
          if (day.valueOf() >= lastMonth.valueOf()) {
            daySeries.push({
              timestamp: day,
              value: mean
            })
          }
        }
        const series = _.chunk(_.sortBy(daySeries, s => s.timestamp.valueOf()).reverse(), 3).map(group => {
          const timestamp = group[0].timestamp
          const value = _.max(group.map(g => g.value))
          return {
            timestamp, value
          }
        }).reverse()
        setState({
          loading: false,
          error: null,
          data: series
        })
      })
      .catch((err) => {
        setState({
          loading: false,
          error: err,
          data: null
        })
      });
  }, [loadMonth]);

  return state
}
