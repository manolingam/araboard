import React from 'react';

import { ThemeContextProvider } from './context/ThemeContext';
import { ServicesProvider } from './context/ServicesContext';

import { Helmet } from 'react-helmet';

import { Main } from './pages/Main';

import './App.css';

export function App() {
  return (
    <ThemeContextProvider>
      <Helmet>
        <title>Aragon Network Metrics</title>
        <meta charSet="utf-8" />
        <meta property="og:title" content="Aragon Network Metrics" />
        <meta
          name="description"
          content="The Aragon Network is a digital jurisdiction that offers services to DAOs. It does so via linked protocols like Aragon Court. All these linked protocols have their tokens linked to ANT — the native token of the Aragon Network."
        />
        <meta
          property="og:description"
          content="The Aragon Network is a digital jurisdiction that offers services to DAOs. It does so via linked protocols like Aragon Court. All these linked protocols have their tokens linked to ANT — the native token of the Aragon Network."
        />
      </Helmet>
      <ServicesProvider>
        <Main />
      </ServicesProvider>
    </ThemeContextProvider>
  );
}
