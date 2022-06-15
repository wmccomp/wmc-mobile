import { createContext, PropsWithChildren } from 'react';
import { IForceUpdateProviderProps } from '../@types';

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
