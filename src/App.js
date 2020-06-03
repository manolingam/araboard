import React from 'react';

import { ThemeContextProvider } from './context/ThemeContext';
import { EthereumEndpointProvider } from "./context/EthereumProviderContext";

import { Main } from './pages/Main';

import './App.css';

export function App() {
  return (
    <ThemeContextProvider>
      <EthereumEndpointProvider>
        <Main />
      </EthereumEndpointProvider>
    </ThemeContextProvider>
  );
}
