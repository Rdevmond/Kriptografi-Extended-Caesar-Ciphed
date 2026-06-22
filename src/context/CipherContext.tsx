import React, { createContext, useContext, type ReactNode } from 'react';
import { useCipher } from '../hooks/useCipher';

type CipherContextType = ReturnType<typeof useCipher>;

const CipherContext = createContext<CipherContextType | undefined>(undefined);

export const CipherProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const cipherState = useCipher();
  
  return (
    <CipherContext.Provider value={cipherState}>
      {children}
    </CipherContext.Provider>
  );
};

export const useCipherContext = () => {
  const context = useContext(CipherContext);
  if (!context) {
    throw new Error('useCipherContext must be used within a CipherProvider');
  }
  return context;
};
