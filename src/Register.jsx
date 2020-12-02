import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import axiosHelper from './utilities/axiosHelper';
import axios from 'axios';


function Register(props) {
    let history = useHistory();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [accessToken, setAccessToken] = useState('')


    const submit = (res) => {
        if (res.status === 200) {
            console.log(res)
            // console.log(res.data.message, res.data.data.token)
            props.setAccessToken(res.data.data.token);
            sessionStorage.setItem('token', res.data.data.token)
            history.push('/dashboard');
        }
    }

    const handleClick = () => {
        const data = { name, email, password };

        const headers = {
            'Content_Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'Access': 'application/json',
        }

        const method = 'post';
        const url = '/register';
        axiosHelper({ method, url, func: submit, data, headers })
        props.setLoginState(true);
        console.log(props.loginState)
    }


    return (
        <div className="container">
            <h1>New Account:</h1>

            <div className="form-group row">
                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">User Name</label>
                <div className="col-sm-10">
                    <input
                        type="username"
                        className="form-control"
                        id="inputEmail3"
                        placeholder="username"
                        onChange={e => setName(e.target.value)}
                        value={name}
                    />
                </div>
            </div>

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
                    >Create Account</button>
                </div>
            </div>
            <Link to="/">Oh wait, I have an account</Link>
        </div>
    )
}

export default Register;