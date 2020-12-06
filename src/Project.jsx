import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosHelper from './utilities/axiosHelper';
import AppContext from './utilities/AppContext';



function Project() {

    const {
        loginState, setLoginState,
        accessToken, setAccessToken,
        projectID, setProjectID,
        projectName
    } = useContext(AppContext);

    const [subData, setSubData] = useState([])

    useEffect(() => {
        console.log('did mount', projectID)
        const url = `/sub_projects/${projectID}`

        const headers = {
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        }
        axiosHelper({ method: 'get', url, sf: showSubProjects, headers })
    }, [])

    const showSubProjects = (res) => {
        console.log(res.data);
        setSubData(res.data)
    }

    return (
        <div className="container">

            <h1>{projectName} <span> +</span></h1>
            <button 
            className="btn btn-light"
            onClick={() => console.log('click')}
            >Add Section</button>

            {subData.map((item, index) => {
                return (
                    <ul className="list-group" key={index}>
                        <li className="list-group-item">{item.name}</li>
                        <li className="list-group-item">{item.notes}</li>

                    </ul>
                )

            })}

            <AddSubProject/>



            <Link to="/dashboard">Back to dash</Link>
        </div>
    )
}

export default Project;

function AddSubProject () {
    return(
        <>
            <h1>Addproject</h1>
            <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Section:</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    // onChange={e => setProjectName(e.target.value)}
                />
                
                <button className="btn btn-warning">Add Section</button>

            </div>
        </>
    )
}