import axios from 'axios';

declare const process: {
    env: Record<string, string | undefined>;
};


const apiBaseUrl =
    process.env.REACT_APP_API_BASE_URL ?? "http://localhost:8080/api";

export const serverClient = axios.create({
    baseURL: `${apiBaseUrl}/admin`,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
});