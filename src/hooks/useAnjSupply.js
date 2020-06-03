import { useCallback, useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { useLastBlockNumber } from './useLastBlockNumber';
import { blockNumbers } from './blockNumbers.util';
import BigNumber from 'bignumber.js';
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
const DECIMALS = 18;

const today = DateTime.local();

export function useAnjSupply() {
  const lastBlockNumber = useLastBlockNumber();
  const AnjTokenContract = new Web3EthContract(ABI, ANJ_ADDR_MAINNET);
  const [state, setState] = useState({ loading: true, error: null, data: null });

  const fetchSupply = useCallback(() => {
    if (lastBlockNumber) {
      const blocks = blockNumbers(today, lastBlockNumber);
      const promises = blocks.map(async (point) => {
        const response = await AnjTokenContract.methods.totalSupplyAt(point.blockNumber).call();
        const totalSupply = new BigNumber(response).div(10 ** DECIMALS).toNumber();
        return {
          ...point,
          timestamp: point.day,
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
  }, [lastBlockNumber]);

  return state;
}
