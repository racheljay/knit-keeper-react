import axios from 'axios';

function axiosHelper({
    method,
    url,
    data = {},
    headers = {},
    sf = res => console.log(res),
    ff = e => console.log(e),

}) {
    const API_URL = 'http://localhost:8000'



    return axios(
        {
            method,
            url: API_URL + url,
            data,
            headers
        }
    ).then(res => {
        sf(res)

    }).catch(e => {
        ff(e)

    })
}

export default axiosHelper;
