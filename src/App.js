import React from 'react';

import ThemeContextProvider from './context/ThemeContext';

import { Main } from './pages/Main';

import './App.css';

export function App() {
  return (
    <ThemeContextProvider>
      <Main />
    </ThemeContextProvider>
  );
}
