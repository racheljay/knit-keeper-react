import React from 'react';
import { useHistory } from 'react-router-dom';

function Dashboard() {
    const history = useHistory();
    const logOut = () => {
        sessionStorage.removeItem('token');
        history.push('/')
    }
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
}

export default Dashboard;