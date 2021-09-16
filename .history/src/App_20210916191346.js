import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';

const Home = React.lazy(() => import('./components/pages/Home'));
const About = React.lazy(() => import('./components/pages/About'));

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
          <Route path="/about">
            <About />
          </Route>
          {/* <Route path="/products" exact>
          <Products />
        </Route>
        <Route path="/products/:productId">
          <ProductDetail />
        </Route> */}
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
