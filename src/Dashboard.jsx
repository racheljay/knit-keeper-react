import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axiosHelper from './utilities/axiosHelper';
import AppContext from './utilities/AppContext';


function Dashboard(props) {
  const history = useHistory();

  const {
    // loginState, setLoginState,
    accessToken, setAccessToken,
    // userName, setUserName,
    // userID, setUserID,
    // projectID, setProjectID,
    setProjectName,
    setPatternName,
    setNeedleSize,
    setYarn, yarn,
    setPatternUrl,
    projectData, setProjectData,
    setEditIndex,
    user, setUser,
    setCurrentProject, currentProject,
    setClicked, clicked
  } = useContext(AppContext);


  useEffect(() => {
    const headers = {
      'Content_Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      'Access': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    }
    axiosHelper({ method: 'get', url: `projects/${user.id}`, headers, sf: showProjects })
  }, [])



  const showProjects = (res) => {
    console.log('show res', res);
    setProjectData(res.data.data);
    console.log('project data', res.data)
    console.log('project state', projectData)
  }

  const successfulLogout = (res) => {

    sessionStorage.removeItem('token');
    history.push('/');
    // setLoginState(false);
    // console.log(loginState);
    setAccessToken('')
    setUser({});
    // setUserName('');
    // setUserID(0);
  }


  //try looking into revoking the token on the back end
  const logOut = () => {
    const url = "/logout";
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    }

    axiosHelper({ method: 'get', url, headers, sf: successfulLogout })
  }

  const addProject = () => {
    history.push('/add-project')
  }

  const deleteUser = () => {
    // console.log('delete', userID)
    const method = "delete";
    const url = '/delete-user';
    const data = {
      "id": JSON.stringify(user.id)
    }
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
    axiosHelper({ method, url, data, headers, sf: successfulLogout });
    // successfulLogout();
  }

  const goToProject = (project) => {
    // setProjectID(id);
    // setProjectName(name);
    // const tempProject = JSON.parse(JSON.stringify(project))
    sessionStorage.setItem('currentProject', JSON.stringify(project))
    setCurrentProject(project)
    setProjectName(project.project_name)
    setPatternName(project.pattern_name)
    setPatternUrl(project.pattern_url)
    setNeedleSize(project.needle_size)
    setYarn(project.yarn)
    console.log('go to project', currentProject)
    history.push('/project')
    // console.log(id);
  }

  const goToEdit = (project, index) => {
    // const tempProject = JSON.parse(JSON.stringify(project))
    // setCurrentProject(previousState => previousState = { ...tempProject })
    setCurrentProject(project);

    //setting these on this page because state won't cooperate
    setProjectName(project.project_name)
    setPatternName(project.pattern_name)
    setPatternUrl(project.pattern_url)
    setNeedleSize(project.needle_size)
    setYarn(project.yarn)
    console.log('Goto edit', project)
    // setProjectID(id)
    setEditIndex(index)
    history.push('/edit-project')
  }

  const deleteProject = (id) => {
    console.log('project to be deleted', id)
    const url = "/delete-project";
    const data = {
      "id": id
    }

    const successfulDelete = (res) => {
      setProjectData(res.data.data)
    }
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    }
    axiosHelper({ method: 'delete', url, data, headers, sf: successfulDelete })
    // "page refresh" magic stolen from todo list

    //Todo: ask Ian how to make better
    // let arr = projectData.filter(item => {
    //   if (item.id !== id) {
    //     return item;
    //   }
    // })
    // setProjectData(arr);
  }

  // if (loginState === true) {

  return (
    <div className="container">

      <h1>Dashboard</h1>

      { user &&
        <h2>Welcome, {user.name}!</h2>
      }

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


          projectData.map((project, index) => {
            return (
              <div className="btn-group btn-block" key={index}>
                <button type="button" className="btn btn-light btn-lg btn-block" onClick={() => goToProject(project)}>{project.project_name}</button>
                <button type="button" className="btn btn-light btn-lg dropdown-toggle dropdown-toggle-split" id="dropdownMenuReference" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-reference="parent">
                  <span className="sr-only">Toggle Dropdown</span>
                </button>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuReference">
                  <a className="dropdown-item" target="_blank" href={project.pattern_url}>Pattern Name: {project.pattern_name}</a>
                  <a className="dropdown-item" href="#">Needle Size: {project.needle_size}</a>
                  <a className="dropdown-item" href="#">Yarn: {project.yarn}</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item text-success" onClick={() => goToEdit(project, index)}>Edit Details</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item text-danger" onClick={() => deleteProject(project.id)}>Delete Project</a>

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