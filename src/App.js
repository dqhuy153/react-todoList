import React, { Suspense, useContext, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/UI/Spinner/LoadingSpinner';
import Forgetpass from './pages/Forgetpass';
import Room from './pages/Room';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import AuthContext from './store/Auth/auth-context';

// lazy load for using page
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));

function App() {
  const authCtx = useContext(AuthContext);

  //dummy assume login
  useEffect(() => {
    authCtx.onLogin('Huy', '1234');
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
        <Route exact path="/">
          <Signin />
        </Route>
        <Route exact path="/sign-up">
          <Signup />
        </Route>
        <Route exact path="/sign-in">
          <Signin />
        </Route>
        <Route exact path="/forget">
          <Forgetpass />
        </Route>

        <Layout>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/room/:roomId">
            <Room />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Layout>
      </Switch>
    </Suspense>
  );
}

export default App;
