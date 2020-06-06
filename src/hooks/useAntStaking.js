import { useEffect, useState } from 'react';
import { BigNumber } from 'bignumber.js';
import { NETWORK_RESERVE_ADDR, ANT_ADDR_MAINNET, ANT_ANJ_TOKEN_CONTRACT_ABI } from './contracts.util';

const Web3EthContract = require('web3-eth-contract');

export function useAntStaking() {
  const AntTokenContract = new Web3EthContract(ANT_ANJ_TOKEN_CONTRACT_ABI, ANT_ADDR_MAINNET);
  const [error, setError] = useState(null);
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
      .balanceOf(NETWORK_RESERVE_ADDR)
      .call()
      .then((ant) => {
        setVault(new BigNumber(ant));
      })
      .catch((error) => setError(error));
  }, []);

  const value =
    vault
      ? vault
          .div(10 ** Number(decimals))
          .toNumber()
      : null;
  return {
    loading: !((vault && decimals) || error),
    error: error,
    value: value,
  };
}
