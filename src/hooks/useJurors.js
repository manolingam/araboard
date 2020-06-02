import { useCallback, useContext, useEffect, useState } from 'react';
import { EthereumProviderContext } from '../context/EthereumProviderContext';
import * as _ from 'lodash';
import { GraphQLClient } from 'graphql-request';
import { DateTime } from 'luxon';

const SUBGRAPH_ENDPOINT = 'https://api.thegraph.com/subgraphs/name/aragon/aragon-court';
const graphQLClient = new GraphQLClient(SUBGRAPH_ENDPOINT);

const BLOCKS_PER_DAY = (24 * 60 * 60) / 15;
const DAYS = 30;

function GET_JURORS(blockNumber) {
  return `query GetJurors {
    jurors(first: 1000, where: {activeBalance_gt: 0}, block: {number: ${blockNumber}}) {
      id
    }
  }`;
}

const today = DateTime.local();

function blockNumbers(lastBlockNumber) {
  return _.times(DAYS).map((shift) => {
    const blockNumber = lastBlockNumber - shift * BLOCKS_PER_DAY;
    const day = today.minus({ day: shift });
    return {
      blockNumber,
      day,
    };
  });
}

export function useJurors() {
  const web3 = useContext(EthereumProviderContext);
  const [lastBlockNumber, setLastBlockNumber] = useState(null);
  const [state, setState] = useState({ loading: true, error: null, data: null });

  const fetchLastBlockNumber = useCallback(() => {
    if (!lastBlockNumber && !state.error) {
      web3.eth
        .getBlockNumber()
        .then((num) => {
          setLastBlockNumber(num - 100); // To adjust for lagging Graph indexer
        })
        .catch((error) => {
          setState({
            loading: false,
            error: error,
            data: null,
          });
        });
    }
  }, [lastBlockNumber, web3.eth, state.error]);

  const fetchJurors = useCallback(() => {
    if (lastBlockNumber && !state.error) {
      const blocks = blockNumbers(lastBlockNumber);
      const promises = blocks.map(async (block) => {
        const data = await graphQLClient.request(GET_JURORS(block.blockNumber));
        const jurorsLength = data.jurors.length;
        return {
          timestamp: block.day,
          value: jurorsLength,
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
    fetchLastBlockNumber();
  });

  useEffect(() => {
    fetchJurors();
  }, [fetchJurors, lastBlockNumber]);

  return state;
}
