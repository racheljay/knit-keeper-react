import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axiosHelper from './utilities/axiosHelper';
import AppContext from './utilities/AppContext';



function Project() {
	const history = useHistory();

	const {
		loginState, setLoginState,
		accessToken, setAccessToken,
		projectID, setProjectID,
		projectName,
		subID, setSubID,
		setSubIndex,
		subProjectData, setSubProjectData, currentProject, setCurrentProject,
		currentSubProject, setCurrentSubProject,
		clicked, setClicked
		
	} = useContext(AppContext);

	const [showAdd, setShowAdd] = useState(false)
	// const [clicked, setClicked] = useState(false)

	useEffect(() => {


		const lscurrentProject = sessionStorage.getItem('currentProject')
		const lssubData = sessionStorage.getItem('subData')

		if(lscurrentProject) {
			setCurrentProject(JSON.parse(lscurrentProject))
			// console.log('sub data', JSON.parse(lscurrentProject.sub_projects))
			// setSubProjectData(JSON.parse(lscurrentProject.sub_projects))
		}
		if(lssubData) {
			setSubProjectData(JSON.parse(lssubData));
		}
		
		
		console.log('did mount', currentProject)
		const url = `/sub_projects/${currentProject.id}`

		const headers = {
			'Accept': 'application/json',
			'Authorization': `Bearer ${accessToken}`,
		}
		
		axiosHelper({ method: 'get', url, sf: showSubProjects, headers })
	}, [showAdd, clicked])

	const showSubProjects = (res) => {
		console.log(res.data);
		setSubProjectData(res.data)
		sessionStorage.setItem('subData', JSON.stringify(res.data))
	}

	const goToSubProject = (subProject) => {
		// setSubID(id);
		setCurrentSubProject(subProject);
		sessionStorage.setItem('currentSubProject', JSON.stringify(subProject))
		sessionStorage.setItem('currentSubCount', JSON.stringify(subProject.count))
    history.push('/sub-project')
	}

	const backToDash = () => {
		setSubProjectData([])
		sessionStorage.removeItem('subData')
		sessionStorage.removeItem('currentProject')
		history.push('/dashboard')
	}


	return (
		<div className="container">

			<h1>{currentProject.project_name}</h1>
			{!showAdd ?
				<button
					className="btn btn-light"
					onClick={() => setShowAdd(true)}
				>Add Section</button>
				: <button
					className="btn btn-light"
					onClick={() => setShowAdd(false)}
				>Hide</button>
			}

			{showAdd ?
				<AddSubProject
					showAdd={showAdd}
					setShowAdd={setShowAdd}
					setClicked={setClicked}

				/>
				: <></>
			}
			{subProjectData.map((item, index) => {
				return (
					<ul className="list-group" key={index}>
						<li
						className="list-group-item list-group-item-action list-group-item-info d-flex justify-content-between align-items-center"
						onClick={() => goToSubProject(item)}
						>{item.name}
						<span className="badge badge-info badge-pill">{item.count}</span>
						</li>
						{/* <li className="list-group-item">{item.notes}</li> */}

					</ul>
				)

			})}



<button className="btn btn-link" onClick={backToDash}>Back to Dashboard</button>
		</div>
	)
}

export default Project;

function AddSubProject() {
	const {
		accessToken, setAccessToken,
		projectID, setProjectID,
		projectName,
		subData, setSubData,
		subProjectData, setSubProjectData, currentProject,
		clicked, setClicked
	} = useContext(AppContext);

	const [name, setName] = useState('')

	const success = (res) => {
		console.log('in submit', res)
		if (res.status === 200) {
			console.log(res)
			setClicked(false);
		}
	}

	const handleClick = () => {
		const data = {
			project_id: currentProject.id,
			name,
			count: 0,
			notes: ""
		};

		const headers = {
			'Content_Type': 'application/json;charset=UTF-8',
			'Access-Control-Allow-Origin': '*',
			'Access': 'application/json',
			'Authorization': `Bearer ${accessToken}`,
		}

		const method = 'post';
		const url = `/add-sub-project`;
		axiosHelper({ method, url, sf: success, data, headers, })
		// props.setShowAdd(false)
		setSubProjectData(subProjectData.concat(data))
		setClicked(true)
	}
	return (

		<>
			<h1>Add Section:</h1>
			<div className="form-group">
				<label htmlFor="exampleFormControlInput1">Section:</label>
				<input
					type="text"
					className="form-control"
					placeholder="Name"
					onChange={e => setName(e.target.value)}
				/>

				<button
					className="btn btn-warning"
					onClick={handleClick}
				>Add Section</button>

			</div>
		</>
	)
}