import React, { Suspense, useContext, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import AppNavigation from './components/layout/AppNavigation';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/UI/Spinner/LoadingSpinner';
import AuthContext from './store/Auth/auth-context';

// lazy load for using page
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Signin = React.lazy(() => import('./pages/Signin'));
const Signup = React.lazy(() => import('./pages/Signup'));
const Room = React.lazy(() => import('./pages/Room'));
const Forgetpass = React.lazy(() => import('./pages/Forgetpass'));

function App() {
  const authCtx = useContext(AuthContext);

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  //authentication check here
  useEffect(() => {
    if (!token || !userId || !username || !isLoggedIn) {
      authCtx.setIsLoggedIn(false);
      authCtx.setUserInfo(null);
    } else {
      authCtx.setUserInfo({
        userId,
        username,
        token,
      });
      authCtx.setIsLoggedIn(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Suspense
      fallback={
        <div className="centered">
          <LoadingSpinner />
        </div>
      }
    >
      <Switch>
        <Route exact path="/sign-up">
          <Signup />
        </Route>
        <Route exact path="/sign-in">
          <Signin />
        </Route>
        <Route exact path="/forget">
          <Forgetpass />
        </Route>
        <Route path="/about">
          <AppNavigation logoTitle="TodoList." />
          <About />
        </Route>

        {isLoggedIn && token && userId && username ? (
          <>
            <Layout>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/room/:roomId">
                <Room />
              </Route>
            </Layout>
          </>
        ) : (
          <Redirect to="/sign-in" />
        )}
      </Switch>
    </Suspense>
  );
}

export default App;
