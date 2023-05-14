import React, { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';

export const AppContext = createContext({});

const AppProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState(null);
  const [info, setInfo] = useState(undefined);
  const [accessToken, setAccessToken] = useState(localStorage.getItem(import.meta.env.VITE_NAME_AT_KEY));

  useEffect(() => {
          if (accessToken) {
            setToken(accessToken);
            const decodedToken = jwt.decode(accessToken);
            setInfo(decodedToken)
            grantAuth()
          }
        }, [accessToken]);
     
  const stopAuth = () => {
    setAuth(false);
  };

  const grantAuth = () => {
     setAuth(true);
  };

  return (
    <AppContext.Provider
      value={{
        auth,
        setAuth,
        stopAuth,
        grantAuth,
        token,
        setToken,
        info,
        setInfo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
