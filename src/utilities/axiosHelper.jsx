import React, { useState } from 'react';
import axios from 'axios';

export function axiosHelper(method, url, func, data ={}) {
    const API_URL = 'http://localhost:8000'
    const headers = {
        'Content_Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access': 'application/json'
    }

    
    return axios(
        {
            method,
            url: API_URL + url,
            data,
            // body,
            headers
        } 
    ).then(res => {
         func(res)
        
    }).catch(e => {
        console.log(e)
        
    })
}

// export default axiosHelper;