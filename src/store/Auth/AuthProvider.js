import { useEffect, useState } from 'react';
import AuthContext from './auth-context';

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const storedUserLoggedInInfo = localStorage.getItem('isLoggedIn');

    if (storedUserLoggedInInfo === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');

    setUserInfo(null);

    setIsLoggedIn(false);
  };

  const loginHandler = (email, password) => {
    // check email and password
    //assume pass

    localStorage.setItem('isLoggedIn', '1');

    //token
    localStorage.setItem('token', 'token_here');

    //dummy user info
    setUserInfo({
      userId: 3,
      username: 'Huy',
    });

    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{
        userInfo: userInfo,
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
