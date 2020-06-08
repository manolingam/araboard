import {
  ANT_ADDR_MAINNET,
  BANCOR_FORMULA_ADDRESS,
  DECIMALS,
  MAINNET_CONNECTOR_WEIGHT,
  NETWORK_RESERVE_ADDR,
} from '../hooks/contracts.util';
import * as _ from 'lodash';
import BigNumber from 'bignumber.js';

const Web3EthContract = require('web3-eth-contract');

const ANT_TOKEN_ABI = [
  {
    constant: true,
    inputs: [
      { name: '_owner', type: 'address' },
      { name: '_blockNumber', type: 'uint256' },
    ],
    name: 'balanceOfAt',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    type: 'function',
  },
];

const ONE_TOKEN = 10 ** DECIMALS;

const BANCOR_FORMULA_ABI = [
  {
    constant: true,
    inputs: [
      {
        name: '_supply',
        type: 'uint256',
      },
      {
        name: '_connectorBalance',
        type: 'uint256',
      },
      {
        name: '_connectorWeight',
        type: 'uint32',
      },
      {
        name: '_depositAmount',
        type: 'uint256',
      },
    ],
    name: 'calculatePurchaseReturn',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_supply',
        type: 'uint256',
      },
      {
        name: '_connectorBalance',
        type: 'uint256',
      },
      {
        name: '_connectorWeight',
        type: 'uint32',
      },
      {
        name: '_sellAmount',
        type: 'uint256',
      },
    ],
    name: 'calculateSaleReturn',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];

export class AnjPriceService {
  constructor(anjSupplyService, antPriceService) {
    this.anjSupplyService = anjSupplyService;
    this.antPriceService = antPriceService;

    this._timeseriesCache = new Map();

    this.antToken = new Web3EthContract(ANT_TOKEN_ABI, ANT_ADDR_MAINNET);
    this.bancorFormula = new Web3EthContract(BANCOR_FORMULA_ABI, BANCOR_FORMULA_ADDRESS);
  }

  async antInAnj(anjTotalSupply, antTreasuryBalance) {
    try {
      return await this.bancorFormula.methods
        .calculateSaleReturn(anjTotalSupply, antTreasuryBalance, MAINNET_CONNECTOR_WEIGHT, ONE_TOKEN.toString())
        .call();
    } catch (error) {
      console.warn('Trying to calculate ANT in ANJ Exchange', error);
      return '0';
    }
  }

  async timeseries(period) {
    const found = this._timeseriesCache.get(period);
    if (found) {
      return found;
    }

    const supply = await this.anjSupplyService.timeseries(period);
    const antPrice = await this.antPriceService.timeseries(period);

    const priceTimeseriesP = supply.map(async (point) => {
      const blockNumber = point.blockNumber;
      const antTreasuryBalance = await this.antToken.methods.balanceOfAt(NETWORK_RESERVE_ADDR, blockNumber).call();
      const anjTotalSupply = point.value;
      const anjInAt = await this.antInAnj(anjTotalSupply, antTreasuryBalance);
      return {
        ...point,
        anjTotalSupply: anjTotalSupply,
        value: anjInAt,
      };
    });
    const timeseries = await Promise.all(priceTimeseriesP);
    const result = timeseries.map((point) => {
      const startOfDay = point.timestamp.startOf('day');
      const found = _.minBy(antPrice, (a) => Math.abs(a.timestamp.valueOf() - startOfDay.valueOf()));
      const antInUsd = found.value;
      const anjInAnt = new BigNumber(point.value).div(10 ** 18);
      const anjInUsd = anjInAnt.toNumber() * antInUsd;
      return {
        timestamp: point.timestamp.startOf('day'),
        value: anjInUsd,
      };
    });
    this._timeseriesCache.set(period, result);
    return result;
  }
}
