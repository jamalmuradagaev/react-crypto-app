import React from 'react';

import CryptoContext, { CryptoContextProvider } from './Context/CryptoContext';
import AppLayout from './components/layout/AppLayout';

export default function App() {
  return (
    <CryptoContextProvider>
      <AppLayout />
    </CryptoContextProvider>
  )
}