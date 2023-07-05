import axios from "axios";
import auth from "./auth";

const client = axios.create()

client.interceptors.request.use(
    (config) => {
        const data = auth.getAuthData();
        if (data.token) {
            config.headers.Authorization = `Bearer ${data.token}`
        }
        return config
    },
    (err) => {
        return Promise.reject(err)
    }
)

client.interceptors.response.use(
    res => res,
    err => {
        if (err.response.status === 401) {
            auth.logout();
        }
        return Promise.reject(err);
    }
)

export default client;