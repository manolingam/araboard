import { useCallback, useEffect, useState } from 'react';
import { useAntPrice } from "./useAntPrice";
import BigNumber from "bignumber.js";

const Web3EthContract = require('web3-eth-contract');

const MAINNET_CONNECTOR_WEIGHT = 250000;
const DECIMALS = 18;
const BANCOR_FORMULA_ADDRESS = '0x274Aac49b63F07Bf6998964aD20020b18383a09D';
const BONDING_CURVE_TREASURY_ADDRESS = '0xEc0DD1579551964703246BeCfbF199C27Cb84485';
const ANT_TOKEN_ADDRESS = '0x960b236A07cf122663c4303350609A66A7B288C0';
const ONE_TOKEN = 10 ** DECIMALS;

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

/**
 * In USD
 */
export function useAnjPrice(anjSupply) {
  const [state, setState] = useState({ loading: true, error: null, data: null });
  const antPrice = useAntPrice()

  const fetchPriceTimeseries = useCallback(() => {
    if (anjSupply.data && antPrice.data) {
      const supply = anjSupply.data;
      const antToken = new Web3EthContract(ANT_TOKEN_ABI, ANT_TOKEN_ADDRESS);
      const bancorFormula = new Web3EthContract(BANCOR_FORMULA_ABI, BANCOR_FORMULA_ADDRESS);

      const priceTimeseriesP = supply.map(async (point) => {
        const blockNumber = point.blockNumber;
        const antTreasuryBalance = await antToken.methods
          .balanceOfAt(BONDING_CURVE_TREASURY_ADDRESS, blockNumber)
          .call();
        const anjTotalSupply = point.value;
        const anjInAt = await bancorFormula.methods
          .calculateSaleReturn(anjTotalSupply, antTreasuryBalance, MAINNET_CONNECTOR_WEIGHT, ONE_TOKEN.toString())
          .call();
        return {
          ...point,
          anjTotalSupply: anjTotalSupply,
          value: anjInAt,
        };
      });
      Promise.all(priceTimeseriesP)
        .then((timeseries) => {
          const inUSD = timeseries.map(point => {
            const startOfDay = point.timestamp.startOf('day')
            const found = antPrice.data.find(a => a.timestamp.valueOf() === startOfDay.valueOf())
            const antInUsd = found.value
            const anjInAnt = new BigNumber(point.value).div(10 ** 18)
            const anjInUsd = anjInAnt.toNumber() * antInUsd
            return {
              timestamp: point.timestamp.startOf('day'),
              value: anjInUsd
            }
          })
          setState({
            loading: false,
            error: null,
            data: inUSD,
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
  }, [anjSupply.data, antPrice.data]);

  useEffect(() => {
    fetchPriceTimeseries();
  }, [anjSupply, fetchPriceTimeseries]);

  return state;
}
