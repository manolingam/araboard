import React from 'react';

import { ThemeContextProvider } from './context/ThemeContext';

import { Main } from './pages/Main';

import './App.css';
import { ServicesProvider } from './context/ServicesContext';

export function App() {
  return (
    <ThemeContextProvider>
      <ServicesProvider>
        <Main />
      </ServicesProvider>
    </ThemeContextProvider>
  );
}
