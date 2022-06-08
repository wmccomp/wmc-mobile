import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from 'react';
interface ISplashContext {
  showSplash: boolean;
  setShowSplash: Dispatch<SetStateAction<boolean>>;
}
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
