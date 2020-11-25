import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


function Register() {
    return (
        <div className="container">
            <h1>New Account:</h1>

            <div className="form-group row">
                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">User Name</label>
                <div className="col-sm-10">
                    <input type="username" className="form-control" id="inputEmail3" />
                </div>
            </div>

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
                    <button type="submit" className="btn btn-danger">Create Account</button>
                </div>
            </div>
            <Link to="/">Oh wait, I have an account</Link>
        </div>
    )
}

export default Register;