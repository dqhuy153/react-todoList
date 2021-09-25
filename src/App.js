import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';
import Room from './pages/Room';

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
<<<<<<< HEAD
=======
          
>>>>>>> e03ad3e3d5a6333ac6bfd01d91fd75c6948711e7
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
