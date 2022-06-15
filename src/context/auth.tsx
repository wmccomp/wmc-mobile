import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useMemo,
  useState,
} from 'react';
import { ILoginContext, ILoginData } from '../@types';
import { wmcApi } from '../api';

export const LoginContext = createContext<ILoginContext>({} as ILoginContext);

export function LoginProvider({ children }: PropsWithChildren<{}>) {
  const [token, setToken] = useState('');

  const logIn = async ({ email, password }: ILoginData) => {
    const response = await wmcApi.post('login', { email, password });
    setToken(response.data.token);
  };

  const logOut = () => {
    setToken('');
  };

  const context = useMemo(
    () => ({
      token,
      logIn,
      logOut,
    }),
    [token],
  );

  return (
    <LoginContext.Provider value={context}>{children}</LoginContext.Provider>
  );
}
