import axios from 'axios';
const BASE_URL='https://13.200.112.130:8443'

export default axios.create({
    baseURL:BASE_URL,
    headers:{ 'Content-Type':'application/json'


    },
    withCredentials:true
});

