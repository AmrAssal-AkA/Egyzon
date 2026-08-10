import axios from 'axios';

declare const process: {
    env: Record<string, string | undefined>;
};


export const serverClient = axios.create({
    baseURL: process.env.SERVER_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});