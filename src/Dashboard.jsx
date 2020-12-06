import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axiosHelper from './utilities/axiosHelper';
import AppContext from './utilities/AppContext';


function Dashboard(props) {
  const history = useHistory();

  const {
    loginState, setLoginState,
    accessToken, setAccessToken,
    userName, setUserName,
    userID, setUserID,
    projectID, setProjectID,
    setProjectName,
    projectData, setProjectData,
    setEditIndex
  } = useContext(AppContext);


  

  const getUserInfo = (res) => {
    console.log(res)
    setUserName(res.data.name);
    setUserID(res.data.id);

    console.log(res.data.id);
    const url = `/projects/${res.data.id}`;
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    }
    axiosHelper({ method: 'get', url, sf: showProjects, headers })
  }

  //did mount
  useEffect(() => {
    console.log('did mount', loginState)
    // console.log('bearer', accessToken)

    //conditionally render only if bearer length > 0
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
      'Content_Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    }
    const method = 'get';
    const url = '/api/user';
    axiosHelper({ method, url, sf: getUserInfo, headers })
  }, [accessToken])

  const showProjects = (res) => {
    console.log(res);
    setProjectData(res.data);
    console.log('project data', res.data)
    console.log('project state', projectData)
  }



  //try looking into revoking the token on the back end
  const logOut = () => {
    const url = "/logout";
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    }

    axiosHelper({ method: 'get', url, headers })
    sessionStorage.removeItem('token');
    history.push('/');
    setLoginState(false);
    console.log(loginState);
    setUserName('');
    setUserID(0);
  }

  const addProject = () => {
    history.push('/add-project')
  }

  const deleteUser = () => {
    console.log('delete', userID)
    const method = "delete";
    const url = '/delete-user';
    const data = {
      "id": JSON.stringify(userID)
    }
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }


    axiosHelper({ method, url, data, headers });
    logOut();
  }

  const goToProject = (id, name) => {
    setProjectID(id);
    setProjectName(name);
    history.push('/project')
    // console.log(id);
  }

  const goToEdit = (id, index) => {
    setProjectID(id)
    setEditIndex(index)
    history.push('/edit-project')
  }

  const deleteProject = (id) => {
    console.log('project to be deleted', id)
    const url = "/delete-project";
    const data = {
      "id": id
    }

    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    }
    axiosHelper({ method: 'delete', url, data, headers })
    // "page refresh" magic stolen from todo list
    let arr = projectData.filter(item => {
      if (item.id !== id) {
        return item;
      }
    })
    setProjectData(arr);
  }

  // if (loginState === true) {

  return (
    <div className="container">

      <h1>Dashboard</h1>
      <h2>Welcome, {userName}!</h2>

      <button
        className="btn btn-success"
        onClick={logOut}
      >Log Out</button>
      <button
        className="btn btn-danger"
        onClick={deleteUser}
      >Delete Account</button>
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
              <div className="btn-group btn-block" key={index}>
                <button type="button" className="btn btn-light btn-lg btn-block" onClick={() => goToProject(item.id, item.project_name)}>{item.project_name}</button>
                <button type="button" className="btn btn-light btn-lg dropdown-toggle dropdown-toggle-split" id="dropdownMenuReference" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-reference="parent">
                  <span className="sr-only">Toggle Dropdown</span>
                </button>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuReference">
                  <a className="dropdown-item" target="_blank" href={item.pattern_url}>Pattern Name: {item.pattern_name}</a>
                  <a className="dropdown-item" href="#">Needle Size: {item.needle_size}</a>
                  <a className="dropdown-item" href="#">Yarn: {item.yarn}</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item text-success" onClick={() => goToEdit(item.id, index)}>Edit Details</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item text-danger" onClick={() => deleteProject(item.id)}>Delete Project</a>

                </div>
              </div>
            )
          })

          : <div>No projects yet!</div>
      }

    </div>
  )
  // } else {
  //   return(
  //     <h1>You're not supposed to be here</h1>
  //   )
  // }
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