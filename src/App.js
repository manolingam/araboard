import React from 'react';

import { ThemeContextProvider } from './context/ThemeContext';
import { ServicesProvider } from './context/ServicesContext';

import { Main } from './pages/Main';

import './App.css';

export function App() {
  return (
    <ThemeContextProvider>
      <ServicesProvider>
        <Main />
      </ServicesProvider>
    </ThemeContextProvider>
  );
}
