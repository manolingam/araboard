import { useCallback, useEffect, useState } from 'react';
import * as _ from 'lodash';
import { GraphQLClient } from 'graphql-request';
import { DateTime } from 'luxon';
import BigNumber from 'bignumber.js';
import { blockNumbers } from './blockNumbers.util';
import { useLastBlockNumber } from './useLastBlockNumber';

const SUBGRAPH_ENDPOINT = 'https://api.thegraph.com/subgraphs/name/aragon/aragon-court';
const graphQLClient = new GraphQLClient(SUBGRAPH_ENDPOINT);

const ANJ_DECIMALS = 18; // To query blockchain for this as well is too much

function GET_JURORS(blockNumber) {
  return `query GetJurors {
    jurors(first: 1000, block: {number: ${blockNumber}}) {
      id
      activeBalance
      availableBalance
      lockedBalance
      deactivationBalance
    }
  }`;
}

const today = DateTime.local();

export function useJurors() {
  const lastBlockNumber = useLastBlockNumber();
  const [state, setState] = useState({ loading: true, error: null, data: null });

  const fetchJurors = useCallback(() => {
    if (lastBlockNumber && !state.error) {
      const blocks = blockNumbers(today, lastBlockNumber);
      const promises = blocks.map(async (block) => {
        const data = await graphQLClient.request(GET_JURORS(block.blockNumber));
        const activeBalance = _.sumBy(data.jurors, (point) => {
          const active = new BigNumber(point.activeBalance).div(10 ** ANJ_DECIMALS).toNumber();
          const available = new BigNumber(point.availableBalance).div(10 ** ANJ_DECIMALS).toNumber();
          const locked = new BigNumber(point.lockedBalance).div(10 ** ANJ_DECIMALS).toNumber();
          const deactivation = new BigNumber(point.deactivationBalance).div(10 ** ANJ_DECIMALS).toNumber();
          return active + available + locked + deactivation;
        });
        const jurorsLength = _.sumBy(data.jurors, (point) => {
          if (new BigNumber(point.activeBalance).gt(0)) {
            return 1;
          } else {
            return 0;
          }
        });
        return {
          timestamp: block.day,
          jurorsCount: jurorsLength,
          activeBalance: activeBalance,
        };
      });
      Promise.all(promises)
        .then((timeseries) => {
          const sorted = _.sortBy(timeseries, (t) => t.timestamp.valueOf());
          setState({
            loading: false,
            error: null,
            data: sorted,
          });
        })
        .catch((error) => {
          setState({
            loading: false,
            error: error,
            data: null,
          });
        });
    }
  }, [lastBlockNumber, state.error]);

  useEffect(() => {
    fetchJurors();
  }, [fetchJurors, lastBlockNumber]);

  return state;
}
