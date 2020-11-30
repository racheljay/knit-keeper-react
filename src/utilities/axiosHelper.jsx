import React, { useState } from 'react';
import axios from 'axios';

export function axiosHelper(method, url, func, data={}, headers={}) {
    const API_URL = 'http://localhost:8000'


    
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