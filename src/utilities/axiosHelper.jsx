import axios from 'axios';

function axiosHelper({method, url, func=(res) => console.log(res), data={}, headers={}}) {
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
        alert('Error', e)
    })
}

export default axiosHelper;
