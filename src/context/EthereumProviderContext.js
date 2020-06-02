import React, { createContext } from 'react';
import Web3 from 'web3'
const Web3EthContract = require('web3-eth-contract');

export const EthereumProviderContext = createContext(null);

export function EthereumEndpointProvider(props) {
  const provider = new Web3.providers.WebsocketProvider('wss://mainnet.eth.aragon.network/ws')
  const web3 = new Web3(provider)
  Web3EthContract.setProvider(provider);

  return (
    <EthereumProviderContext.Provider value={web3}>
      {props.children}
    </EthereumProviderContext.Provider>
  );
}
