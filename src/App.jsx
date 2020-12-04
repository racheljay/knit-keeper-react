import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Nav from './Nav';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';
import AddProject from './AddProject';
import Project from './Project';
import { AppProvider } from './utilities/AppContext';

function App() {
  const [loginState, setLoginState] = useState(false)
  const [accessToken, setAccessToken] = useState('')
  const [userName, setUserName] = useState('');
  const [userID, setUserID] = useState(0);
  const [res, setRes] = useState({});
  const [projectID, setProjectID] = useState(0);
  const [projectName, setProjectName] = useState('');
  const [failStatus, setFailStatus] = useState(false);

  useEffect(() => {
    const token = window.sessionStorage.getItem('token')
    if (token) {
      setAccessToken(token);
      setLoginState(true);
    }
  }, [])

  const initialContext = {
    loginState, setLoginState,
    accessToken, setAccessToken,
    userName, setUserName,
    userID, setUserID,
    res, setRes,
    projectID, setProjectID,
    projectName, setProjectName,
    failStatus, setFailStatus
  }
  return (
    <div>
      <Router>
        <AppProvider value={initialContext}>
          <Nav />

          <Route exact path="/">
            <Login />
          </Route>

          <Route path="/register">
            <Register />
          </Route>

          <Route path="/dashboard">
            <Dashboard />
          </Route>

          <Route path="/project">
            <Project />
          </Route>

          <Route path="/add-project">
            <AddProject />
          </Route>

        </AppProvider>
      </Router>
    </div>
  );
}

export default App;
