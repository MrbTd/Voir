/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useMemo, useReducer} from 'react';
import reducerAuth, {initialState} from '../contexts/reducers/reducer';
import {AuthContext} from '../contexts/authContext';

const AuthProvider = ({children}: any) => {
  const [auhtContext, dispatchAuhtContext] = useReducer(
    reducerAuth,
    initialState,
  );

  return (
    <AuthContext.Provider value={{auhtContext, dispatchAuhtContext}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => React.useContext(AuthContext);
