import { useCallback, useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { useLastBlockNumber } from './useLastBlockNumber';
import {
  ANJ_ADDR_MAINNET,
  ANT_ADDR_MAINNET,
  ANT_ANJ_TOKEN_CONTRACT_ABI,
  DECIMALS,
  NETWORK_AGENT_ADDR,
} from './contracts.util';
import { blockNumbers } from './blockNumbers.util';
import BigNumber from 'bignumber.js';
import { useAntPrice } from './useAntPrice';
import { useAnjPrice } from './useAnjPrice';
import { useAnjSupply } from './useAnjSupply';
const Web3EthContract = require('web3-eth-contract');

const today = DateTime.local();

export function useAntTreasury() {
  const lastBlockNumber = useLastBlockNumber();
  const antPrice = useAntPrice();
  const anjSupply = useAnjSupply(lastBlockNumber);
  const anjPrice = useAnjPrice(anjSupply);
  const [state, setState] = useState({ loading: true, error: null, data: null });

  const AntTokenContract = new Web3EthContract(ANT_ANJ_TOKEN_CONTRACT_ABI, ANT_ADDR_MAINNET);
  const AnjTokenContract = new Web3EthContract(ANT_ANJ_TOKEN_CONTRACT_ABI, ANJ_ADDR_MAINNET);

  const balanceOfAt = async (contract, blockNumber) => {
    const agentBalanceS = await contract.methods.balanceOfAt(NETWORK_AGENT_ADDR, blockNumber).call();
    return new BigNumber(agentBalanceS).div(10 ** DECIMALS).toNumber();
  };

  const fetchTreasury = useCallback(() => {
    if (lastBlockNumber && antPrice.data && anjPrice.data) {
      const blocks = blockNumbers(today, lastBlockNumber);
      const balanceP = blocks.map(async (point) => {
        const antTreasuryBalance = await balanceOfAt(AntTokenContract, point.blockNumber);
        const anjTreasuryBalance = await balanceOfAt(AnjTokenContract, point.blockNumber);
        const antPricePoint = antPrice.data[antPrice.data.length - 1];
        const anjPricePoint = anjPrice.data[anjPrice.data.length - 1];
        const antTreasuryUSD = antTreasuryBalance * antPricePoint.value;
        // const anjTreasuryUSD = 0// anjTreasuryBalance * anjPricePoint.value;
        const anjTreasuryUSD = anjTreasuryBalance * anjPricePoint.value;
        return {
          ...point,
          value: anjTreasuryUSD + antTreasuryUSD,
        };
      });
      Promise.all(balanceP)
        .then((balanceTimeseries) => {
          setState({
            loading: false,
            error: null,
            data: balanceTimeseries,
          });
        })
        .catch((error) => {
          console.error(error);
          setState({
            loading: false,
            error: error,
            data: null,
          });
        });
    }
  }, [lastBlockNumber, antPrice.data, anjPrice.data]);

  useEffect(() => {
    fetchTreasury();
  }, [lastBlockNumber, antPrice.data, anjPrice.data]);

  return state;
}
