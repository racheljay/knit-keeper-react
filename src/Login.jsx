import React, {useEffect, useState, useContext} from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import {Alert} from 'reactstrap';
import  axiosHelper  from './utilities/axiosHelper';
import AppContext from './utilities/AppContext';


function Login(props) {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	let history = useHistory();

	const { accessToken, setAccessToken } = useContext(AppContext);
	const [failStatus, setFailStatus] = useState(false);


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

	const fail = (e) => {
        console.log(e)
        setFailStatus(true)
        // $('.alert-fail').alert()
    }
	
	const handleClick = () => {
		const data = {
			username: email,
			password,
			// client_secret: "KCTUwZGFHBSYxbU4l0SEz8L7ZaJK5OagXoihAQk6", //secret to put on firebase
			client_secret: "3PV3uqDwO5iO50d58BS5xjtPuNV0Nj6sSrs7ZzSa", //old local secret
			client_id: '2', //change to 4 for the public version
			grant_type: 'password',
			scope: ''
		};


		const headers = {
            'Content_Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'Access': 'application/json',
        }
		
		const method = 'post';
		const url = '/v1/oauth/token';
		axiosHelper({method, url, sf: submit, data, ff: fail, headers})
		//check if bearer token is in session storage if it it, then set
		// setLoginState(true);
		// console.log('after axios', loginState);
	}

	return (
		<div className="container">
			<h1>Login:</h1>

			<Failure failStatus={failStatus} setFailStatus={setFailStatus}/>


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

const Failure = ({failStatus, setFailStatus}) => {
    // const [visible, setVisible] = useState(true);
  
    const onDismiss = () => setFailStatus(false);
  
    return (
      <Alert color="danger" isOpen={failStatus} toggle={onDismiss} fade={true}>
        Username or password is incorrect
      </Alert>
    );
  }