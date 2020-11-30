import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import {axiosHelper} from './utilities/axiosHelper';

function Dashboard(props) {
    const history = useHistory();
    const [user, setUser] = useState('');

    const getUserInfo = (res) => {
        console.log(res)
    }

    useEffect(() => {
        console.log('did mount', props.loginState)
        console.log('bearer', props.accessToken)
        const headers = {
            'Accept': 'application/json',
            'Authorization': `Bearer ${props.accessToken}`
        }
        const data = {

        }
        const method = 'get';
        const url = '/api/user';
        axiosHelper(method, url, getUserInfo, data, headers)
        
	}, [])
    const logOut = () => {
        sessionStorage.removeItem('token');
        history.push('/');
        props.setLoginState(false);
        console.log(props.loginState)
    }
    if(props.loginState === true) {

        return (
            <div className="container">

        <h1>Dashboard</h1>
        <div>No current projects</div>
        <button
        className="btn btn-success"
        onClick={logOut}
        >Log Out</button>
        </div>
    )
} else {
    return(
        <h1>You're not supposed to be here</h1>
    )
}
}

export default Dashboard;