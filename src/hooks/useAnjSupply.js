import { useCallback, useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { blockNumbers } from './blockNumbers.util';
const Web3EthContract = require('web3-eth-contract');

const ANJ_ADDR_MAINNET = '0xcD62b1C403fa761BAadFC74C525ce2B51780b184';
const ABI = [
  {
    constant: true,
    inputs: [{ name: '_blockNumber', type: 'uint256' }],
    name: 'totalSupplyAt',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];

const today = DateTime.local();

export function useAnjSupply(lastBlockNumber) {
  const AnjTokenContract = new Web3EthContract(ABI, ANJ_ADDR_MAINNET);
  const [state, setState] = useState({ loading: true, error: null, data: null });

  const fetchSupply = useCallback(() => {
    if (lastBlockNumber) {
      const blocks = blockNumbers(today, lastBlockNumber);
      const promises = blocks.map(async (point) => {
        const totalSupply = await AnjTokenContract.methods.totalSupplyAt(point.blockNumber).call();
        return {
          ...point,
          timestamp: point.day.startOf('day'),
          value: totalSupply,
        };
      });
      Promise.all(promises).then((timeseries) => {
        setState({
          loading: false,
          error: null,
          data: timeseries.reverse(),
        });
      });
    }
  }, [lastBlockNumber]);

  useEffect(() => {
    fetchSupply();
  }, [lastBlockNumber, fetchSupply]);

  return state;
}
