import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Nav from './Nav';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';

function App() {
  const [loginState, setLoginState] = useState(false)
  const [accessToken, setAccessToken] = useState('')

  return (
    <div>
      <Router>
        <Nav />

        <Route exact path="/">
          <Login
            setLoginState={setLoginState}
            loginState={loginState}
            accessToken={accessToken}
            setAccessToken={setAccessToken}
          />
        </Route>

        <Route path="/register">
          <Register
            setLoginState={setLoginState}
            loginState={loginState}
            accessToken={accessToken}
            setAccessToken={setAccessToken}
          />
        </Route>

        <Route path="/dashboard">
          <Dashboard
            setLoginState={setLoginState}
            loginState={loginState}
            accessToken={accessToken}
            setAccessToken={setAccessToken}
          />
        </Route>

      </Router>
    </div>
  );
}

export default App;
