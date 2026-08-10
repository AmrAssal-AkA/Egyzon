import axios from "axios";

export const serverClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080",
  timeout: 10000,
  headers: {
    Accept: "application/json",
  },
});
