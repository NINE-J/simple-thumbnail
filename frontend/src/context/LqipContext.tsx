import { createContext, useState, useContext, ReactNode } from 'react';

interface LqipContextProps {
  lqip: string;
  setLqip: (lqip: string) => void;
}

interface LqipProviderProps {
  children: ReactNode;
}

const LqipContext = createContext<LqipContextProps | undefined>(undefined);

export const LqipProvider = ({ children }: LqipProviderProps) => {
  const [lqip, setLqip] = useState<string>('');

  return <LqipContext.Provider value={{ lqip, setLqip }}>{children}</LqipContext.Provider>;
};

export const useLqip = () => {
  const context = useContext(LqipContext);
  if (!context) {
    throw new Error('useLqip must be used within a LqipProvider');
  }
  return context;
};
