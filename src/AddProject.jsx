import React, {useState} from 'react';
import { useHistory, Link } from 'react-router-dom';
import axiosHelper from './utilities/axiosHelper';

function AddProject(props) {
	let history = useHistory();

	const [projectName, setProjectName] = useState('');
	const [patternName, setPatternName] = useState('');
	const [patternUrl, setPatternUrl] = useState('');
	const [needleSize, setNeedleSize] = useState(0);
	const [yarn, setYarn] = useState('');

	const submit = (res) => {
		if(res.status === 200) {
			console.log(res)
		}
	}

	const handleClick = () => {
		const data = {
			user_id: props.userID,
			project_name: projectName,
			pattern_name: patternName,
			pattern_url: patternUrl,
			needle_size: needleSize,
			yarn};

		const headers = {
			'Content_Type': 'application/json;charset=UTF-8',
			'Access-Control-Allow-Origin': '*',
			'Access': 'application/json',
	}

	const method = 'post';
	const url = `/add-project`;
	axiosHelper({ method, url, func: submit, data, headers })
	}

	return (
		<div className="container">
			<h1>Create Project</h1>


			<div className="form-group">
				<label htmlFor="exampleFormControlInput1">Project Name</label>
				<input
				type="text"
				className="form-control"
				// id="exampleFormControlInput1"
				placeholder="Name"
				onChange={e => setProjectName(e.target.value)}
				/>
			</div>

			<div className="form-group">
				<label htmlFor="exampleFormControlInput1">Pattern Name</label>
				<input
				type="text"
				className="form-control"
				// id="exampleFormControlInput1"
				placeholder="Name"
				onChange={e => setPatternName(e.target.value)}
				/>
			</div>

			<div className="form-group">
				<label htmlFor="exampleFormControlInput1">Pattern Url</label>
				<input
				type="text"
				className="form-control"
				// id="exampleFormControlInput1"
				placeholder="http://www.example.com"
				onChange={e => setPatternUrl(e.target.value)}
				/>
			</div>

			<div className="form-group">
				<label htmlFor="exampleFormControlInput1">Needle Size</label>
				<input
				type="text"
				className="form-control"
				id="exampleFormControlInput1"
				placeholder="0"
				onChange={e => setNeedleSize(e.target.value)}
				/>
			</div>

			<div className="form-group">
				<label htmlFor="exampleFormControlInput1">Yarn</label>
				<input
				type="text"
				className="form-control"
				id="exampleFormControlInput1"
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