import React, { useEffect, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axiosHelper from './utilities/axiosHelper';
import AppContext from './utilities/AppContext';
import {Alert} from 'reactstrap';

import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import { faHistory } from '@fortawesome/free-solid-svg-icons'

function SubProject() {
	const history = useHistory();

	//things that a use effect should check for on different pages
	//bearer token
	//projects
	//subprojects
	//to fix reload issue
	//current project id in LS
	//current subproject id in LS

	const {
		subID, subIndex, projectName,
		subData, setSubData,
		accessToken,
		subProjectData,
		currentSubProject, setCurrentSubProject,
		currentProject,
		setCurrentProject,
		setSubProjectData
	} = useContext(AppContext);

	useEffect(() => {
		console.log('sub projects', subProjectData)
		console.log('current sub project', currentSubProject)
		console.log('subcount', subCount)
	}, [])

	const [subProjID, setSubProjID] = useState(currentSubProject.id);
	const [subName, setSubName] = useState(currentSubProject.name);
	const [subCount, setSubCount] = useState(currentSubProject.count);
	const [subNotes, setSubNotes] = useState(currentSubProject.notes)
	const [saveStatus, setSaveStatus] = useState(false)


	useEffect(() => {

		const lscurrentProject = sessionStorage.getItem('currentProject')
		const lssubData = sessionStorage.getItem('subData')
		const lscount = sessionStorage.getItem('currentSubCount')

		if (lscurrentProject) {
			setCurrentProject(JSON.parse(lscurrentProject))
			// console.log('sub data', JSON.parse(lscurrentProject.sub_projects))
			// setSubProjectData(JSON.parse(lscurrentProject.sub_projects))
		}
		if (lssubData) {
			setSubProjectData(JSON.parse(lssubData));
		}
		const lscurrentSubProject = sessionStorage.getItem('currentSubProject')

		if (lscurrentSubProject) {
			setCurrentSubProject(JSON.parse(lscurrentSubProject))
		}
		if (lscount) {
			setSubCount(JSON.parse(lscount));

		}
	}, [])
	// useEffect(() => {
		// console.log(subData[subIndex])
		// console.log('Sub ID', subID)

		const saveProgress = () => {
			setSaveStatus(true)

			const data = {
				name: subName,
				count: subCount,
				notes: subNotes
			};
			
			const headers = {
				'Content_Type': 'application/json;charset=UTF-8',
				'Access-Control-Allow-Origin': '*',
				'Access': 'application/json',
				'Authorization': `Bearer ${accessToken}`,
			}
			
			const method = 'put';
			const url = `/edit-subproject/${currentSubProject.id}`;
			
			axiosHelper({ method, url, data, headers, sf: success, ff: failure })
		}


	// }, [subCount, subNotes])

	const success = (res) => {
		console.log('in submit', res)
		// setRes(res)
		if (res.status === 200) {
			console.log('add project', res)

		}
	}

	const failure = (e) => {
		console.log(e)
	}
	const increase = () => {
		console.log('plus')
		setSubCount(0)
		setSubCount(subCount + 1)
		console.log('subcount increase', subCount)
	}

	const decrease = () => {
		console.log('minus')
		subCount > 0 && setSubCount(subCount - 1)
	}

	const reset = () => {
		console.log('reset')
		setSubCount(0)
	}

	const deleteSection = () => {
		console.log(currentSubProject.id)

		const data = {
			id: currentSubProject.id
		};

		const headers = {
			'Content_Type': 'application/json;charset=UTF-8',
			'Access-Control-Allow-Origin': '*',
			'Access': 'application/json',
			'Authorization': `Bearer ${accessToken}`,
		}

		const method = 'delete';
		const url = '/delete-sub-project';

		axiosHelper({ method, url, data, headers })
		history.push('/project')
	}

	const backToProject = () => {
		setCurrentSubProject({})
		sessionStorage.removeItem('currentSubCount')
		sessionStorage.removeItem('currentSubProject')

		history.push('/project')
	}

	return (
		<div className="container">
			<h2>{currentProject.project_name}: </h2>
			<h2>{currentSubProject.name}</h2>

			<Saved saveStatus={saveStatus} setSaveStatus={setSaveStatus}/>
			
			{/* <div>SubID: {subID}</div>
            <div>SubIndex: {subIndex}</div> */}
			<div className="row justify-content-center">
				<div className="col-4 ">
					<h1
						className="text-center border border-danger rounded-pill p-2"
					>{subCount}</h1>
				</div>
			</div>
			<div className="row justify-content-center">

				<div className="col-3">
				</div>

				<div className="col-6" align="center">
					<button
						className="btn btn-lg btn-outline-info"
						onClick={decrease}
					><FontAwesomeIcon icon={faMinusCircle} /></button>
					<button
						className="btn btn-lg btn-outline-info"
						onClick={reset}
					><FontAwesomeIcon icon={faHistory} /></button>
					<button
						className="btn btn-lg btn-outline-info"
						onClick={increase}
					><FontAwesomeIcon icon={faPlusCircle} /></button>
				</div>

				<div className="col-3">
				</div>
			</div>


			<div className="row justify-content-center">
				<div className="col-10">

					<div className="form-group">
						<label for="exampleFormControlTextarea1">Section Notes:</label>
						<textarea
							className="form-control"
							id="exampleFormControlTextarea1"
							rows="3"
							defaultValue={currentSubProject.notes}
							onChange={e => setSubNotes(e.target.value)}

						></textarea>
					</div>

				</div>

			</div>
			<button
				className="btn btn-link"
				onClick={backToProject}
			>Back to Project</button>
			<button
			className="btn btn-success"
			onClick={saveProgress}
			>Save</button>
			<button
				className="btn btn-danger"
				onClick={deleteSection}
			>Delete Section</button>
		</div>
	)
}

export default SubProject;

const Saved = ({saveStatus, setSaveStatus}) => {
	// const [visible, setVisible] = useState(true);

	const onDismiss = () => setSaveStatus(false);

	return (
		<Alert color="success" isOpen={saveStatus} toggle={onDismiss} fade={true}>
			Progress saved!
		</Alert>
	);
}