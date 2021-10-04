import React from 'react';

const AuthContext = React.createContext({
  userInfo: {},
  setUserInfo: ({}) => {},
  isLoggedIn: false,
  setIsLoggedIn: (boolean) => {},
  onLogout: () => {},
  onLogin: (username, password) => {},
  onSignup: (username, password) => {},
});

export default AuthContext;
