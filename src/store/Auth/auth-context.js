import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
  userInfo: {},
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
});

export default AuthContext;
