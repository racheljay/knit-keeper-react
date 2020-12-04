import React, {useEffect, useState, useContext} from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import  axiosHelper  from './utilities/axiosHelper';
import AppContext from './utilities/AppContext';


function Login(props) {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	let history = useHistory();

	const { setLoginState,loginState, accessToken, setAccessToken } = useContext(AppContext);

	useEffect(() => {
		console.log('did mount', loginState)
	}, [])
//submit method used in axios call
	const submit = (res) => {
		if (res.status === 200) {
			console.log(res)
			// console.log(res.data.message, res.data.data.token)
			setAccessToken(res.data.access_token);
			sessionStorage.setItem('token', res.data.access_token)
			history.push('/dashboard')
		}
	}
	
	const handleClick = () => {
		const data = {
			username: email,
			password,
			client_secret: "3PV3uqDwO5iO50d58BS5xjtPuNV0Nj6sSrs7ZzSa",
			client_id: '2',
			grant_type: 'password',
			scope: ''
		};

		// const headers = {
        //     'Content_Type': 'application/json;charset=UTF-8',
        //     'Access-Control-Allow-Origin': '*',
        //     'Access': 'application/json',
        // }
		
		const method = 'post';
		const url = '/v1/oauth/token';
		axiosHelper({method, url, sf: submit, data})
		//check if bearer token is in session storage if it it, then set
		setLoginState(true);
		console.log('after axios', loginState);
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