import React, { useContext, useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axiosHelper from './utilities/axiosHelper';
import AppContext from './utilities/AppContext';

function AddProject() {
	let history = useHistory();

const {
	accessToken, setAccessToken,
	user,
	// userID, setUserID,
	res, setRes,
	projectName, setProjectName,
    patternName, setPatternName,
    patternUrl, setPatternUrl,
    needleSize, setNeedleSize,
    yarn, setYarn, projectData, setProjectData, setCurrentProject

} = useContext(AppContext);

useEffect(() => {
	setProjectName('')
	setPatternName('')
	setPatternUrl('')
	setNeedleSize(0)
	setYarn('')
}, [])

	const success = (res) => {
		console.log('in submit', res)
		setRes(res)
		if (res.status === 200) {
			//this is the line that fixed it
			setProjectData(res.data)
			console.log('success', res)
			setTimeout(() => {
				setRes({})
				history.push('/dashboard')
			}, 1500)
		}
	}

	const failure = (e) => {
		console.log(e)

	}

	const handleClick = () => {
		const data = {
			user_id: user.id,
			project_name: projectName,
			pattern_name: patternName,
			pattern_url: patternUrl,
			needle_size: needleSize,
			yarn
		};

		const headers = {
			'Content_Type': 'application/json;charset=UTF-8',
			'Access-Control-Allow-Origin': '*',
			'Access': 'application/json',
			'Authorization': `Bearer ${accessToken}`,
		}

		const method = 'post';
		const url = `/add-project`;
		axiosHelper({ method, url, sf: success, data, headers, })

		// projectData.concat(data);

	}

	const backToDash = () => {
        const obj = {};
        setCurrentProject(prev => prev = obj)
        history.push('/dashboard')
    }

	return (
		<div className="container">
			<h1>Create Project</h1>

			{res.status === 200 ?
				<Success />
				: <></>
			}

			<div className="form-group">
				<label htmlFor="exampleFormControlInput1">Project Name</label>
				<input
					type="text"
					className="form-control"
					
					placeholder="Name"
					onChange={e => setProjectName(e.target.value)}
				/>
			</div>

			<div className="form-group">
				<label htmlFor="exampleFormControlInput1">Pattern Name</label>
				<input
					type="text"
					className="form-control"
					
					placeholder="Name"
					onChange={e => setPatternName(e.target.value)}
				/>
			</div>

			<div className="form-group">
				<label htmlFor="exampleFormControlInput1">Pattern Url</label>
				<input
					type="url"
					className="form-control"
					
					placeholder="http://www.example.com"
					onChange={e => setPatternUrl(e.target.value)}
				/>
			</div>

			<div className="form-group">
				<label htmlFor="exampleFormControlInput1">Needle Size</label>
				<input
					type="number"
					className="form-control"
					placeholder="0"
					onChange={e => setNeedleSize(e.target.value)}
				/>
			</div>

			<div className="form-group">
				<label htmlFor="exampleFormControlInput1">Yarn</label>
				<input
					type="text"
					className="form-control"
					placeholder="Worsted"
					onChange={e => setYarn(e.target.value)}
				/>
			</div>

			<button
				className="btn btn-danger"
				onClick={handleClick}
			>Submit</button>
            <button className="btn btn-link" onClick={backToDash}>Back to Dash</button>

			{/* <div class="form-group">
				<label for="exampleFormControlTextarea1">Example textarea</label>
				<textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
			</div> */}


		</div>
	)
}

export default AddProject;

function Success() {
	return (
		<div className="alert alert-success" role="alert">
			Project Created Successfully!
		</div>
	)
}

function Failure() {
	return (
		<div className="alert alert-danger" role="alert">
			Needle Size must be a number
		</div>
	)
}