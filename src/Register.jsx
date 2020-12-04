import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import axiosHelper from './utilities/axiosHelper';
import AppContext from './utilities/AppContext';


function Register(props) {
    let history = useHistory();

    const { setLoginState, loginState, accessToken, setAccessToken } = useContext(AppContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [accessToken, setAccessToken] = useState('')

    const [failStatus, setFailStatus] = useState(false);


    const submit = (res) => {
        if (res.status === 200) {
            console.log(res)
            // console.log(res.data.message, res.data.data.token)
            setAccessToken(res.data.data.token);
            sessionStorage.setItem('token', res.data.data.token)
            history.push('/dashboard');
        }
    }

    const fail = (e) => {
        console.log(e)
        setFailStatus(true)
    }

    const handleClick = () => {
        // setFailStatus(false)
        const data = { name, email, password };

        const headers = {
            'Content_Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'Access': 'application/json',
        }

        const method = 'post';
        const url = '/register';
        axiosHelper({ method, url, sf: submit, data, headers, ff: fail })
        setLoginState(true);
        console.log(loginState)
    }


    return (
        <div className="container">
            <h1>New Account:</h1>

            {failStatus === true &&
                <Failure />
            }

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

const Failure = () => {
    const { setFailStatus } = useContext(AppContext);

    return (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Oops!</strong> This email is taken, or invalid. Try again!
            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={setFailStatus(false)}>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
}