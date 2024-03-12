import axios from "axios";

const baseUrl: string = import.meta.env.VITE_API_URL;

export const api = axios.create({
    baseURL: baseUrl,
});