import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import Nav from './Nav';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';
import AddProject from './AddProject';
import Project from './Project';
import SubProject from './SubProject';
import EditProject from './EditProject';
import { AppProvider } from './utilities/AppContext';
import axiosHelper from './utilities/axiosHelper';



function App() {
  // const [loginState, setLoginState] = useState(false) // figure out how to get rid
  const [accessToken, setAccessToken] = useState('')
  // const [userName, setUserName] = useState('');
  // const [userID, setUserID] = useState(0);
  const [res, setRes] = useState({}); // figure out how to get rid
  // const [projectID, setProjectID] = useState(0);
  const [failStatus, setFailStatus] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [currentSubProject, setCurrentSubProject] = useState({});
  // const [subIndex, setSubIndex] = useState(-1); // figure out how to get rid Ian's fault and rachels fault
  const [subProjectData, setSubProjectData] = useState([])
  const [projectData, setProjectData] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [patternName, setPatternName] = useState('');
  const [patternUrl, setPatternUrl] = useState('');
  const [needleSize, setNeedleSize] = useState(0);
  const [yarn, setYarn] = useState('');
  const [currentProject, setCurrentProject] = useState({});
  const [user, setUser] = useState({});
  const [clicked, setClicked] = useState(false)
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const token = window.sessionStorage.getItem('token')
    if (token) {
      setAccessToken(token);
      // setLoginState(true); //get rid
    }
  }, [])

  const getAllUserData = (res) => {
    console.log(res)
    setUser(res.data[0]);
    // setUserName(res.data[0].name);
    // setUserID(res.data[0].id);
    setProjectData(res.data[0].projects);

    console.log(res.data);
    // const url = `/projects/${res.data.id}`;
    // const headers = {
    //   'Accept': 'application/json',
    //   'Authorization': `Bearer ${accessToken}`,
    // }
    // axiosHelper({ method: 'get', url, sf: showProjects, headers })
  }

  //did mount
  useEffect(() => {
    // console.log('did mount', loginState)
    // console.log('bearer', accessToken)
    if(accessToken.length > 0) {

      
      //conditionally render only if bearer length > 0
      const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'Content_Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      }
      const method = 'get';
      const url = '/getUserData';
      axiosHelper({ method, url, sf: getAllUserData, headers })
    }
  }, [accessToken])

  const initialContext = {
    // loginState, setLoginState,
    accessToken, setAccessToken,
    // userName, setUserName,
    user, setUser,
    // userID, setUserID,
    res, setRes,
    // projectID, setProjectID,
    failStatus, setFailStatus,
    projectData, setProjectData,
    projectName, setProjectName,
    patternName, setPatternName,
    patternUrl, setPatternUrl,
    needleSize, setNeedleSize,
    yarn, setYarn,
    editIndex, setEditIndex,
    // subID, setSubID,
    // subIndex, setSubIndex,
    // subData, setSubData,
    currentProject, setCurrentProject,
    currentSubProject, setCurrentSubProject,
    subProjectData, setSubProjectData,
    clicked, setClicked,
    loading, setLoading
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

  // const { loginSt ate, userID } = useContext(AppContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        (token !== null && token.length > 0) ? (
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