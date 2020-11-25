import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


function Login() {
    return (
        <div className="container">
            <h1>Login:</h1>


            <div className="form-group row">
                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                    <input type="email" className="form-control" id="inputEmail3" />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                <div className="col-sm-10">
                    <input type="password" className="form-control" id="inputPassword3" />
                </div>
            </div>

            <div className="form-group row">
                <div className="col-sm-10">
                    <button type="submit" className="btn btn-danger">Sign in</button>
                </div>
            </div>
            <Link to="register">New Here?</Link>
        </div>
    )
}

export default Login;