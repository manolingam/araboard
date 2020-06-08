import { blockNumbersForPeriod } from '../hooks/blockNumbers.util';
import { DateTime } from 'luxon';
import * as _ from 'lodash';
import {
  ANJ_ADDR_MAINNET,
  ANT_ADDR_MAINNET,
  ANT_ANJ_TOKEN_CONTRACT_ABI,
  DECIMALS,
  NETWORK_AGENT_ADDR,
} from '../hooks/contracts.util';
import BigNumber from 'bignumber.js';
const Web3EthContract = require('web3-eth-contract');

const today = DateTime.local();

export class AntTreasuryService {
  constructor(ethereum, antPriceService, anjPriceService) {
    this.ethereum = ethereum;
    this.antPriceService = antPriceService;
    this.anjPriceService = anjPriceService;
    this.AntTokenContract = new Web3EthContract(ANT_ANJ_TOKEN_CONTRACT_ABI, ANT_ADDR_MAINNET);
    this.AnjTokenContract = new Web3EthContract(ANT_ANJ_TOKEN_CONTRACT_ABI, ANJ_ADDR_MAINNET);

    this._timeseriesCache = new Map();
  }

  async balanceOfAt(contract, blockNumber) {
    const agentBalanceS = await contract.methods.balanceOfAt(NETWORK_AGENT_ADDR, blockNumber).call();
    return new BigNumber(agentBalanceS).div(10 ** DECIMALS).toNumber();
  }

  async timeseries(period) {
    const found = this._timeseriesCache.get(period);
    if (found) {
      return found;
    }

    const lastBlockNumber = await this.ethereum.getLastBlockNumber();
    const blocks = blockNumbersForPeriod(today, period, lastBlockNumber);
    const antPrice = await this.antPriceService.timeseries(period);
    const anjPrice = await this.anjPriceService.timeseries(period);

    const balanceP = blocks.map(async (point) => {
      const antTreasuryBalance = await this.balanceOfAt(this.AntTokenContract, point.blockNumber);
      const anjTreasuryBalance = await this.balanceOfAt(this.AnjTokenContract, point.blockNumber);
      const antPricePoint = _.minBy(antPrice, (pricePoint) => {
        return Math.abs(pricePoint.timestamp.valueOf() - point.timestamp.valueOf());
      });
      const anjPricePoint = _.minBy(anjPrice, (pricePoint) => {
        return Math.abs(pricePoint.timestamp.valueOf() - point.timestamp.valueOf());
      });
      const antTreasuryUSD = antTreasuryBalance * antPricePoint.value;
      // const anjTreasuryUSD = 0// anjTreasuryBalance * anjPricePoint.value;
      const anjTreasuryUSD = anjTreasuryBalance * anjPricePoint.value;
      return {
        ...point,
        value: anjTreasuryUSD + antTreasuryUSD,
      };
    });
    const result = (await Promise.all(balanceP)).reverse();
    this._timeseriesCache.set(period, result);
    return result;
  }
}
