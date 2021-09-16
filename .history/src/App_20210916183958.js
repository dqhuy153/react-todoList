import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';
import Layout from './components/layout/Layout';
import Home from './components/pages/Home';

function App() {
  return (
    <Layout>
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
    </Layout>
  );
}

export default App;
