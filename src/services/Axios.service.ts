import axios from "axios";



export const AxiosService = axios.create({
    baseURL : import.meta.env.VITE_BACKEND_URI
})