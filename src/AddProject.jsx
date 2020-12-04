import React, { useContext, useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axiosHelper from './utilities/axiosHelper';
import AppContext from './utilities/AppContext';

function AddProject(props) {
	let history = useHistory();

const {
	loginState, setLoginState,
	accessToken, setAccessToken,
	userID, setUserID,
	res, setRes
} = useContext(AppContext);

	const [projectName, setProjectName] = useState('');
	const [patternName, setPatternName] = useState('');
	const [patternUrl, setPatternUrl] = useState('');
	const [needleSize, setNeedleSize] = useState(0);
	const [yarn, setYarn] = useState('');




// console.log(props.res);

	const success = (res) => {
		console.log('in submit', res)
		setRes(res)
		if (res.status === 200) {
			console.log('add project', res)
			setTimeout(() => {
				setRes({})
				history.push('/dashboard')
			}, 2000)
		}
	}

	const failure = (e) => {
		console.log(e)

	}

	const handleClick = () => {
		const data = {
			user_id: userID,
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
		}

		const method = 'post';
		const url = `/add-project`;
		axiosHelper({ method, url, sf: success, data, headers, })
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
			<Link to="/dashboard">Back to Dash</Link>

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