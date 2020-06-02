import React, { createContext } from 'react';
import Web3 from 'web3'
const Web3EthContract = require('web3-eth-contract');

export const EthereumProviderContext = createContext(null);

export function EthereumEndpointProvider(props) {
  const provider = new Web3.providers.WebsocketProvider('wss://mainnet.eth.aragon.network/ws')
  Web3EthContract.setProvider(provider);

  return (
    <EthereumProviderContext.Provider value={provider}>
      {props.children}
    </EthereumProviderContext.Provider>
  );
}
