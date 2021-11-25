import React, { useCallback, useState } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Product from './products/Product';

import { f_asyncLogin } from './login/utilities/Login';


import Login from './login/Login';

import Nav from './Nav';
import NotFound from './NotFound';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = useCallback(
    async (username, password) => {
      const result = await f_asyncLogin(username, password);
      if (result == 1) {
        username = 'user';
        password = 'password';
        setLoggedIn(username === 'user' && password === 'password');
      }
    },

    [],
  );


  const handleLogout = useCallback(() => setLoggedIn(false), []);


  // <Route component={From} path="/ProductProfile" />
  return (
    <Router>
      {loggedIn && <Nav onLogout={handleLogout} />}
      <Switch>
        <Route
          path="/"
          exact
          render={() => {
            if (loggedIn) {
              return <Redirect to="/game" />;
            }
            return <Login onLogin={handleLogin} error="" />;
          }}
        />
        <Route path="/products/products">
          {() => {
            if (loggedIn) {
              return <Product />;
            }
            return <Redirect to="/" />;
          }}
        </Route>

      </Switch>
    </Router>
  );
}
