import { createContext, PropsWithChildren, useState } from 'react';
import { ISplashContext } from '../@types';

export const SplashContext = createContext<ISplashContext>(
  {} as ISplashContext,
);

export function SplashProvider({ children }: PropsWithChildren<{}>) {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <SplashContext.Provider value={{ showSplash, setShowSplash }}>
      {children}
    </SplashContext.Provider>
  );
}
