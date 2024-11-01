import axios from "axios";
import { SERVER } from "../ApiSource";

export const authinstance = axios.create();

authinstance.interceptors.response.use(
    // (response) => response,
    // async (error) => {
    //     const originalRequest = error.config;

    //     if (error.response.status === 401 && !originalRequest._retry) {
    //         originalRequest._retry = true;
    //         const refreshToken = localStorage.getItem("refresh_token")

    //         return axios.get<string>(`${SERVER}/accaunt/getAccessToken`, {params: {"refresh_token" : refreshToken}})
    //         .then((response) => {
    //             localStorage.setItem("access_token", response.data)
    //             return axios(originalRequest)
    //         })
    //     }

    //     return Promise.reject(error);
    // }
);