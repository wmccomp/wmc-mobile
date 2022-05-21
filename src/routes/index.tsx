import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { LoginContext } from '../context/auth';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

const Routes = () => {
  const { token } = useContext(LoginContext);
  console.log(token);

  return (
    <NavigationContainer>
      {token ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};

export default Routes;
