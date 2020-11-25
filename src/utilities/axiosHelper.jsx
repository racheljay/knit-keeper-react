import React from 'react';
import axios from 'axios';

export function axiosHelper(method, data, url, headers) {
    const API_URL = 'http://localhost:8000'
    return axios(
        {
            method,
            url: API_URL + url,
            data,
        } 
    ).then(res => {
        console.log(res)
    }).catch(e => console.log(e))
}

// export default axiosHelper;