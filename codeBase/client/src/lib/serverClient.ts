import axios from "axios";

export const serverClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json",
  },
});

