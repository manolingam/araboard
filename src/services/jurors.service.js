import { blockNumbersForPeriod } from "../hooks/blockNumbers.util";
import * as _ from 'lodash';
import BigNumber from 'bignumber.js';
import { DateTime } from 'luxon';
import { GraphQLClient } from 'graphql-request';
import { DECIMALS } from '../hooks/contracts.util';

const today = DateTime.local();

const SUBGRAPH_ENDPOINT = 'https://api.thegraph.com/subgraphs/name/aragon/aragon-court';
const graphQLClient = new GraphQLClient(SUBGRAPH_ENDPOINT);

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

export class JurorsService {
  constructor(ethereum) {
    this.ethereum = ethereum;
    this._timeseriesCache = new Map()
  }

  async timeseries(period) {
    const found = this._timeseriesCache.get(period)
    if (found) {
      return found
    }
    const lastBlockNumber = await this.ethereum.getLastBlockNumber();
    const blocks = blockNumbersForPeriod(today, period, lastBlockNumber);
    const promises = blocks.map(async (block) => {
      const data = await graphQLClient.request(GET_JURORS(block.blockNumber));
      const activeBalance = _.sumBy(data.jurors, (point) => {
        const active = new BigNumber(point.activeBalance).div(10 ** DECIMALS).toNumber();
        const available = new BigNumber(point.availableBalance).div(10 ** DECIMALS).toNumber();
        const locked = new BigNumber(point.lockedBalance).div(10 ** DECIMALS).toNumber();
        const deactivation = new BigNumber(point.deactivationBalance).div(10 ** DECIMALS).toNumber();
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
    const timeseries = await Promise.all(promises);
    const result = _.sortBy(timeseries, (t) => t.timestamp.valueOf());
    this._timeseriesCache.set(period, result)
    return result
  }
}
