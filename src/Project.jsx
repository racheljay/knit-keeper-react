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
		subData, setSubData
	} = useContext(AppContext);

	const [showAdd, setShowAdd] = useState(false)

	useEffect(() => {
		console.log('did mount', projectID)
		const url = `/sub_projects/${projectID}`

		const headers = {
			'Accept': 'application/json',
			'Authorization': `Bearer ${accessToken}`,
		}
		axiosHelper({ method: 'get', url, sf: showSubProjects, headers })
	}, [])

	const showSubProjects = (res) => {
		console.log(res.data);
		setSubData(res.data)
	}

	const goToSubProject = (index, id) => {
		setSubID(id);
    setSubIndex(index);
    history.push('/sub-project')
	}


	return (
		<div className="container">

			<h1>{projectName} <span> +</span></h1>
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
					subData={subData}
					setSubData={setSubData}
				/>
				: <></>
			}
			{subData.map((item, index) => {
				return (
					<ul className="list-group" key={index}>
						<li
						className="list-group-item list-group-item-action list-group-item-info d-flex justify-content-between align-items-center"
						onClick={() => goToSubProject(index, item.id)}
						>{item.name}
						<span class="badge badge-info badge-pill">{item.count}</span>
						</li>
						{/* <li className="list-group-item">{item.notes}</li> */}

					</ul>
				)

			})}



			<Link to="/dashboard">Back to dash</Link>
		</div>
	)
}

export default Project;

function AddSubProject(props) {
	const {
		accessToken, setAccessToken,
		projectID, setProjectID,
		projectName,
		subData, setSubData
	} = useContext(AppContext);

	const [name, setName] = useState('')

	const success = (res) => {
		console.log('in submit', res)
		if (res.status === 200) {
			console.log(res)
		}
	}

	const handleClick = () => {
		const data = {
			project_id: projectID,
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
		setSubData(subData.concat(data))
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