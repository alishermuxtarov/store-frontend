import axios from "axios";

const http = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL
})

http.interceptors.request.use((config) => {
    let token = localStorage.getItem('_token')

    if (token)
        config.headers['Authorization'] = `Token ${token}`

    return config;
})

export default http;