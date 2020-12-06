import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import Nav from './Nav';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';
import AddProject from './AddProject';
import Project from './Project';
import SubProject from './SubProject';
import EditProject from './EditProject';
import { AppProvider } from './utilities/AppContext';
import AppContext from './utilities/AppContext';


function App() {
  const [loginState, setLoginState] = useState(false)
  const [accessToken, setAccessToken] = useState('')
  const [userName, setUserName] = useState('');
  const [userID, setUserID] = useState(0);
  const [res, setRes] = useState({});
  const [projectID, setProjectID] = useState(0);
  const [failStatus, setFailStatus] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [subID, setSubID] = useState(0);
  const [subIndex, setSubIndex] = useState(-1);
  const [subData, setSubData] = useState([])


const [projectData, setProjectData] = useState([]);
  const [projectName, setProjectName] = useState('');
	const [patternName, setPatternName] = useState('');
	const [patternUrl, setPatternUrl] = useState('');
	const [needleSize, setNeedleSize] = useState(0);
	const [yarn, setYarn] = useState('');

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
    failStatus, setFailStatus,
    projectData, setProjectData,
    projectName, setProjectName,
    patternName, setPatternName,
    patternUrl, setPatternUrl,
    needleSize, setNeedleSize,
    yarn, setYarn,
    editIndex, setEditIndex,
    subID, setSubID,
    subIndex, setSubIndex,
    subData, setSubData
  }
  return (
    <div>
      <Router>
        <AppProvider value={initialContext}>
          <Nav />
          <Switch>

            <PrivateRoute path="/dashboard" >
              <Dashboard />
            </PrivateRoute>

            <PrivateRoute path="/project">
              <Project />
            </PrivateRoute>

            <PrivateRoute path="/add-project">
              <AddProject />
            </PrivateRoute>

            <PrivateRoute path="/edit-project">
              <EditProject />
            </PrivateRoute>

            <PrivateRoute path="/sub-project">
              <SubProject />
            </PrivateRoute>

            <Route exact path="/">
              <Login />
            </Route>

            <Route path="/register">
              <Register />
            </Route>

          </Switch>

        </AppProvider>
      </Router>
    </div>
  );
}

export default App;

function PrivateRoute({ children, ...rest }) {
  const token = window.sessionStorage.getItem('token')

  const {loginState, userID} = useContext(AppContext);

  return (
    <Route
    {...rest}
    render={({ location }) =>
    token !== null ? (
      children
      ) : (
          <Redirect
          to={{
            pathname: "/",
            state: { from: location }
          }}
          />
          )
        }
        />
        );
      
}