import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const setUserDetails = (userDetails) => {
    setUser(userDetails);
  };

  const unsetUserDetails = () => {
    setUser(null);
  };

  const values = {
    user, setUserDetails, unsetUserDetails
  }

  return (
    <UserContext.Provider value={values}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
