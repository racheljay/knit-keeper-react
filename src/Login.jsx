import React, {useState} from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import { axiosHelper } from './utilities/axiosHelper';



function Login() {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	// const [accessToken, setAccessToken] = useState('')
	let history = useHistory();

//submit method used in axios call
	const submit = (res) => {
		if (res.status === 200) {
			console.log(res)
			// console.log(res.data.message, res.data.data.token)
			sessionStorage.setItem('token', res.data.access_token)
			history.push('/dashboard')
		}
	}
	
	const handleClick = () => {
		const data = {
			username: email,
			password,
			client_secret: "J0DOlVzrDoxH7tVY0sAXqEWYz2vxEc81psNVxEVe",
			client_id: '2',
			grant_type: 'password',
			scope: ''
		};
		
		const method = 'post';
		const url = '/v1/oauth/token';
		axiosHelper(method, url, submit, data)
	}

	return (
		<div className="container">
			<h1>Login:</h1>

			<div className="form-group row">
				<label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
				<div className="col-sm-10">
					<input
						type="email"
						className="form-control"
						id="inputPassword3"
						placeholder="Email"
						onChange={e => setEmail(e.target.value)}
						value={email}
					/>
				</div>
			</div>
			<div className="form-group row">
				<label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
				<div className="col-sm-10">
					<input
						type="password"
						className="form-control"
						id="inputPassword3"
						placeholder="Password"
						onChange={e => setPassword(e.target.value)}
						value={password}
					/>
				</div>
			</div>

			<div className="form-group row">
				<div className="col-sm-10">
					<button
						type="submit"
						className="btn btn-danger"
						onClick={() => handleClick()}
					>Sign In</button>
				</div>
			</div>

			<Link to="register">New Here?</Link>
		</div>
	)
}

export default Login;