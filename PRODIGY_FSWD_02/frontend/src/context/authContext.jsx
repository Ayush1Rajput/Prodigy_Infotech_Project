import React, { createContext, useContext, useState } from 'react';

const userContext = createContext();

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <userContext.Provider value={{ user, login, logout }}>
      {children}
    </userContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(userContext); // Return the value from useContext
};

export default AuthContext;