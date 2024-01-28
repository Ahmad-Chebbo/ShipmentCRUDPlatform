import React, { createContext, useContext, useState } from 'react';

const defaultErrorMessage = 'An error occurred. Please try again later!';

const StateContext = createContext({
  user: null,
  token: null,
  errorMessage: defaultErrorMessage,
  setUser: () => {},
  setToken: () => {},
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, setTokenLocally] = useState(localStorage.getItem('authToken'));

  const setToken = (newToken) => {
    setTokenLocally(newToken);
    newToken ? localStorage.setItem('authToken', newToken) : localStorage.removeItem('authToken');
  };
  
  return (
    <StateContext.Provider
      value={{
        user,
        token,
        errorMessage: defaultErrorMessage,
        setUser,
        setToken,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);