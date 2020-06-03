import { useEffect, useState } from 'react';
import { BigNumber } from 'bignumber.js';

const Web3EthContract = require('web3-eth-contract');

const NETWORK_AGENT_ADDR = '0x5E8c17A6065C35b172B10E80493D2266e2947DF4';
const NETWORK_RESERVE_ADDR = '0xec0dd1579551964703246becfbf199c27cb84485';
const ANT_ADDR_MAINNET = '0x960b236A07cf122663c4303350609A66A7B288C0';

const TOKEN_BALANCE_OF_ABI = [
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    payable: false,
    type: 'function',
  },
];


export function useAntStaking() {
  const AntTokenContract = new Web3EthContract(TOKEN_BALANCE_OF_ABI, ANT_ADDR_MAINNET);
  const [error, setError] = useState(null);
  const [agent, setAgent] = useState(null);
  const [vault, setVault] = useState(null);
  const [decimals, setDecimals] = useState(0);

  useEffect(() => {
    AntTokenContract.methods
      .decimals()
      .call()
      .then((decimals) => {
        setDecimals(decimals);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  useEffect(() => {
    AntTokenContract.methods
      .balanceOf(NETWORK_AGENT_ADDR)
      .call()
      .then((ant) => {
        setAgent(new BigNumber(ant));
      })
      .catch((error) => setError(error));
  }, []);

  useEffect(() => {
    AntTokenContract.methods
      .balanceOf(NETWORK_RESERVE_ADDR)
      .call()
      .then((ant) => {
        setVault(new BigNumber(ant));
      })
      .catch((error) => setError(error));
  }, []);

  const value =
    agent && vault
      ? agent
          .plus(vault)
          .div(10 ** Number(decimals))
          .toNumber()
      : null;
  return {
    loading: !((agent && vault && decimals) || error),
    error: error,
    value: value,
  };
}
