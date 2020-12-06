import React, { useEffect, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axiosHelper from './utilities/axiosHelper';
import AppContext from './utilities/AppContext';

function SubProject() {
    const history = useHistory();

    const {
        subID, subIndex, projectName,
        subData, setSubData,
        accessToken
    } = useContext(AppContext);

    const [subProjID, setSubProjID] = useState(subData[subIndex].project_id);
    const [subName, setSubName] = useState(subData[subIndex].name);
    const [subCount, setSubCount] = useState(subData[subIndex].count);
    const [subNotes, setSubNotes] = useState(subData[subIndex].notes)

    useEffect(() => {
        // console.log(subData[subIndex])
        // console.log('Sub ID', subID)

        const data = {
            name: subName,
            count: subCount,
            notes: subNotes
        };

        const headers = {
            'Content_Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'Access': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        }

        const method = 'put';
        const url = `/edit-subproject/${subID}`;

        axiosHelper({method, url, data, headers, sf: success, ff: failure})


    }, [subCount, subNotes])

    const success = (res) => {
        console.log('in submit', res)
        // setRes(res)
        if (res.status === 200) {
            console.log('add project', res)
            
        }
    }

    const failure = (e) => {
        console.log(e)
    }
    const increase = () => {
        console.log('plus')
        setSubCount(subCount + 1)
    }

    const decrease = () => {
        console.log('minus')
        subCount > 0 && setSubCount(subCount - 1)
    }

    const reset = () => {
        console.log('reset')
        setSubCount(0)
    }


    return (
        <div className="container">
            <h2>{projectName}: </h2>
            <h2>{subName}</h2>
            {/* <div>SubID: {subID}</div>
            <div>SubIndex: {subIndex}</div> */}
            <div className="row justify-content-center">
                <div className="col-4 ">
                    <h1 className="text-center border border-danger rounded-pill p-2">{subCount}</h1>
                </div>
            </div>
            <div className="row justify-content-center">

                <div className="col-4">
                    <button
                        className="btn btn-info"
                        onClick={decrease}
                    >-</button>
                </div>
                <div className="col-4">
                    <button
                        className="btn btn-info"
                        onClick={reset}
                    >Reset</button>
                </div>
                <div className="col-4">
                    <button
                        className="btn btn-info"
                        onClick={increase}
                    >+</button>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-10">

            <textarea
            name="notes"
            id=""
            cols="50"
            rows="5"
            defaultValue={subNotes}
            onChange={e => setSubNotes(e.target.value)}
            ></textarea>
                </div>

            </div>

            <Link to="/project">Back to Project</Link>
        </div>
    )
}

export default SubProject;