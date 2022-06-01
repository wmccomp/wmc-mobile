import { createContext, ReactNode, useMemo, useState } from 'react';
import { wmcApi } from '../api';

interface ILoginData {
  email: string;
  password: string;
}

interface ILoginContext {
  token: string;
  logIn: (data: ILoginData) => Promise<void>;
  logOut: () => void;
}

interface LoginProviderProps {
  children: ReactNode;
}

export const LoginContext = createContext<ILoginContext>({} as ILoginContext);

export function LoginProvider({ children }: LoginProviderProps) {
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
