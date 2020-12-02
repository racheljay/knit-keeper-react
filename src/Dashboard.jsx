import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axiosHelper from './utilities/axiosHelper';

function Dashboard(props) {
  const history = useHistory();


  const [projectData, setProjectData] = useState([]);

  const getUserInfo = (res) => {
    console.log(res)
    props.setUserName(res.data.name);
    props.setUserID(res.data.id);

    console.log(res.data.id);
    const url = `/projects/${res.data.id}`;
    axiosHelper({ method: 'get', url, func: showProjects })
  }
  //did mount
  useEffect(() => {
    console.log('did mount', props.loginState)
    // console.log('bearer', props.accessToken)
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${props.accessToken}`
    }
    const method = 'get';
    const url = '/api/user';
    axiosHelper({ method, url, func: getUserInfo, headers })
  }, [props.accessToken])

  const showProjects = (res) => {
    console.log(res);
    setProjectData(res.data);
    console.log('project state', projectData)
  }

  // useEffect(() => {
  //     console.log(userID);
  //     const url = `/projects/${userID}`;
  //     axiosHelper({method: 'get', url, func: showProjects})      
  // }, [userID])

  //try looking into revoking the token on the back end
  const logOut = () => {
    sessionStorage.removeItem('token');
    history.push('/');
    props.setLoginState(false);
    console.log(props.loginState);
    props.setUserName('');
    props.setUserID(0);
  }

  const addProject = () => {
    history.push('/add-project')
  }

  if (props.loginState === true) {

    return (
      <div className="container">

        <h1>Dashboard</h1>
        <h2>Welcome, {props.userName}!</h2>

        <button
          className="btn btn-success"
          onClick={logOut}
        >Log Out</button>
        <button
          className="btn btn-light"
          onClick={addProject}
        >Add New</button>
        <br />


        {/* conditional to make sure that there is data */}
        {
          projectData.length > 0 ?


            projectData.map((item, index) => {
              return (
                <div className="btn-group">
                  <button type="button" className="btn btn-secondary">{item.project_name}</button>
                  <button type="button" className="btn btn-secondary dropdown-toggle dropdown-toggle-split" id="dropdownMenuReference" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-reference="parent">
                    <span className="sr-only">Toggle Dropdown</span>
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuReference">
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <a className="dropdown-item" href="#">Something else here</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">Separated link</a>
                  </div>
                </div>
              )
            })

            : <div>No projects yet!</div>
        }

      </div>
    )
  } else {
    // return(
    //   <h1>You're not supposed to be here</h1>
    // )
  }
}

export default Dashboard;

{/* <div className="card">
<div className="card-header" id="headingOne">
  <h2 className="mb-0">
    <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
      {index.project_name}
    </button>
  </h2>
</div>

<div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
  <div className="card-body">

  </div>
</div>
</div> */}