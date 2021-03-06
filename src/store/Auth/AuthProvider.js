import { useState } from 'react';
import { useHistory } from 'react-router';
import AuthContext from './auth-context';

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const history = useHistory();

  //authentication check here //move to app.js to resolve reload on home bug (can't not keep auth on Home when reload)
  //useEffect()

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    setUserInfo(null);
    setIsLoggedIn(false);

    history.push('/sign-in');
  };

  const loginHandler = async (username, password) => {
    if (
      !username ||
      !password ||
      username.trim() === '' ||
      password.trim() === ''
    ) {
      return alert('Please fill all blank fields!');
    }
    // check email and password
    let data;

    try {
      //api data
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response) {
        return alert('Send request to server failed!');
      }

      data = await response.json();

      //get data response
      if (!data || data.status || data.statusCode) {
        return alert('Login fail! Incorrect username or password!');
      }
    } catch (error) {
      console.log(error);

      //fake data
      data = {
        accessToken:
          'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjMzMDY5MzM2LCJleHAiOjE2MzM2NzQxMzZ9.UUjCJqQhaBPimCBf1lozMKxu8x6hK5KUPvW4qhR74E8fDfE6EzrvZxi_R2xO3U0g5B1vdvUTdc3AkSj2iCKBwQ',
        tokenType: 'Bearer',
        userName: 'admin',
        id: '1',
      };
    }

    //save auth info
    localStorage.setItem('isLoggedIn', '1');
    localStorage.setItem('token', data.accessToken);
    localStorage.setItem('userId', data.id);
    localStorage.setItem('username', data.userName);

    setUserInfo({
      userId: data.id,
      username: data.userName,
      token: data.accessToken,
    });

    setIsLoggedIn(true);

    //enter home page
    history.push('/');
  };

  const signupHandler = async (username, password) => {
    if (
      !username ||
      !password ||
      username.trim() === '' ||
      password.trim() === ''
    ) {
      return alert('Please fill all required fields!');
    }

    let data;

    try {
      const response = await fetch('http://localhost:8080/api/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response) {
        return alert('Send request to server failed!');
      }

      data = await response.json();

      console.log(data);
      if (data.status === false) {
        return alert('Signup fail! Try another username!');
      }
    } catch (error) {
      console.log(error);

      //fake data
      data = { status: true };
    }

    alert('Sign up successfully!');
    //enter sign in page
    window.location.href = '/sign-in';
  };

  return (
    <AuthContext.Provider
      value={{
        userInfo: userInfo,
        setUserInfo: setUserInfo,

        isLoggedIn: isLoggedIn,
        setIsLoggedIn: setIsLoggedIn,

        onLogout: logoutHandler,
        onLogin: loginHandler,
        onSignup: signupHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
