import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/UI/Spinner/LoadingSpinner';
import Room from './pages/Room';

// lazy load for using page
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/room/:roomId">
            <Room />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
