import { createContext, PropsWithChildren } from 'react';

interface IForceUpdateProviderProps {
  forceUpdate: () => void;
}

export const ForceUpdateContext = createContext<IForceUpdateProviderProps>(
  {} as IForceUpdateProviderProps,
);

export function ForceUpdateProvider({
  forceUpdate,
  children,
}: PropsWithChildren<IForceUpdateProviderProps>) {
  return (
    <ForceUpdateContext.Provider value={{ forceUpdate }}>
      {children}
    </ForceUpdateContext.Provider>
  );
}
