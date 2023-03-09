import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_INVESTMENT_MANAGER_URL
})

export default axiosInstance;