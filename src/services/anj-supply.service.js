import { ANJ_ADDR_MAINNET } from '../hooks/contracts.util';
import { blockNumbersForPeriod } from '../hooks/blockNumbers.util';
import { DateTime } from 'luxon';

const Web3EthContract = require('web3-eth-contract');

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

export class AnjSupplyService {
  constructor(ethereum) {
    this.ethereum = ethereum;
    this._timeseriesCache = new Map();
    this.AnjTokenContract = new Web3EthContract(ABI, ANJ_ADDR_MAINNET);
  }

  async timeseries(period) {
    const found = this._timeseriesCache.get(period);
    if (found) {
      return found;
    } else {
      const lastBlockNumber = await this.ethereum.getLastBlockNumber();
      const blocks = blockNumbersForPeriod(today, period, lastBlockNumber);
      const timeseriesP = blocks.map(async (point) => {
        const totalSupply = await this.AnjTokenContract.methods.totalSupplyAt(point.blockNumber).call();
        return {
          ...point,
          timestamp: point.day.startOf('day'),
          value: totalSupply,
        };
      });
      const timeseries = await Promise.all(timeseriesP);
      return timeseries.reverse();
    }
  }
}
