import {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';

import { ILoginContext, ILoginData, IUserProfile } from '../@types';
import { wmcApi } from '../api';

const USER_PROFILE_INITIAL_STATE = {
  email: '',
  username: '',
  createdAt: '',
  updatedAt: '',
  profilePicture: '',
  _id: '',
};

export const LoginContext = createContext<ILoginContext>({} as ILoginContext);

export function LoginProvider({ children }: PropsWithChildren<{}>) {
  const [token, setToken] = useState('');
  const [user, setUser] = useState<IUserProfile>(USER_PROFILE_INITIAL_STATE);

  const logIn = async ({ email, password }: ILoginData) => {
    const response = await wmcApi.post('login', { email, password });
    setToken(response.data.token);
  };

  const logOut = () => {
    setToken('');
    setUser(USER_PROFILE_INITIAL_STATE);
  };

  const context = {
    token,
    user,
    logIn,
    logOut,
  };

  useEffect(() => {
    if (token) {
      wmcApi
        .get('user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data: { user } }) => {
          setUser(user);
        })
        .catch((err) => {
          Toast.show({
            type: 'error',
            text1: 'Erro',
            text2: err.response.data.message,
            visibilityTime: 3000,
          });
        });
    }
  }, [token]);

  return (
    <LoginContext.Provider value={context}>{children}</LoginContext.Provider>
  );
}
