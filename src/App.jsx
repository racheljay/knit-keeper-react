import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Nav from './Nav';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';
import AddProject from './AddProject';

function App() {
  const [loginState, setLoginState] = useState(false)
  const [accessToken, setAccessToken] = useState('')
  const [userName, setUserName] = useState('');
  const [userID, setUserID] = useState(0);

  useEffect(() => {
    const token = window.sessionStorage.getItem('token')
    if (token) {
      setAccessToken(token);
      setLoginState(true);
    }
  }, [])

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
            userName={userName}
            setUserName={setUserName}
            userID={userID}
            setUserID={setUserID}
          />
        </Route>

        <Route path="/add-project">
          <AddProject
            setLoginState={setLoginState}
            loginState={loginState}
            accessToken={accessToken}
            setAccessToken={setAccessToken}
            userID={userID}
            setUserID={setUserID}
          />
        </Route>

      </Router>
    </div>
  );
}

export default App;
