import React, { useEffect, useContext, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axiosHelper from './utilities/axiosHelper';
import AppContext from './utilities/AppContext';

function EditProject() {
    let history = useHistory();

    const {
        projectData, setProjectData, projectID, editIndex, accessToken,
        projectName, setProjectName,
        patternName, setPatternName,
        patternUrl, setPatternUrl,
        needleSize, setNeedleSize,
        yarn, setYarn,
        res, setRes,
    } = useContext(AppContext)


    useEffect(() => {
        console.log('edit mount', projectData[editIndex])

        setProjectName(projectData[editIndex].project_name)
        setPatternName(projectData[editIndex].pattern_name)
        setPatternUrl(projectData[editIndex].pattern_url)
        setNeedleSize(projectData[editIndex].needle_size)
        setYarn(projectData[editIndex].yarn)
    }, [])

    const success = (res) => {
        console.log('in submit', res)
        setRes(res)
        if (res.status === 200) {
            console.log('add project', res)
            setTimeout(() => {
                setRes({})
                history.push('/dashboard')
            }, 1500)
        }
    }

    const failure = (e) => {
        console.log(e)
    }

    const handleClick = () => {
        const data = {
            project_name: projectName,
            pattern_name: patternName,
            pattern_url: patternUrl,
            needle_size: needleSize,
            yarn
        };

        const headers = {
            'Content_Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'Access': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        }

        const method = 'put';
        const url = `/edit-project/${projectID}`;
        axiosHelper({ method, url, sf: success, data, headers, ff: failure })
    }

    return (
        <div className="container">
            <h1>Edit Project:</h1>


            {res.status === 200 ?
				<Success />
				: <></>
			}

            <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Project Name</label>
                <input
                    type="text"
                    className="form-control"
                    defaultValue={projectName}
                    onChange={e => setProjectName(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Pattern Name</label>
                <input
                    type="text"
                    className="form-control"
                    defaultValue={patternName}
                    onChange={e => setPatternName(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Pattern Url</label>
                <input
                    type="url"
                    className="form-control"
                    defaultValue={patternUrl}
                    onChange={e => setPatternUrl(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Needle Size</label>
                <input
                    type="number"
                    className="form-control"
                    defaultValue={needleSize}
                    onChange={e => setNeedleSize(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Yarn</label>
                <input
                    type="text"
                    className="form-control"
                    defaultValue={yarn}
                    onChange={e => setYarn(e.target.value)}
                />
            </div>

            <button
                className="btn btn-success"
                onClick={handleClick}
            >Save</button>
            <Link to="/dashboard">Back to Dash</Link>
        </div>
    )
}

export default EditProject;

function Success() {
	return (
		<div className="alert alert-success" role="alert">
			Project Updated Successfully!
		</div>
	)
}

function Failure() {
	return (
		<div className="alert alert-danger" role="alert">
			Needle Size must be a number
		</div>
	)
}