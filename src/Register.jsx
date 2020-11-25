import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { axiosHelper } from './utilities/axiosHelper';
import axios from 'axios';


function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const data = { name, email, password };
    const headers = {
        'Content_Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
    }
    const method = 'post';
    const url = '/register';


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
                        onClick={() => axiosHelper(method, data, url, headers)}
                    >Create Account</button>
                </div>
            </div>
            <Link to="/">Oh wait, I have an account</Link>
        </div>
    )
}

export default Register;