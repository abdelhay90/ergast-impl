import axios from 'axios';

const BASE_API_URL = 'http://ergast.com/api/f1';

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL || BASE_API_URL,
    timeout: 600000,
    headers: {
        'Content-Type': 'application/json',
    },
});
