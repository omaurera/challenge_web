import axios from "axios";

const baseUrl = 'https://localhost:7294/api/v1/';
const api = axios.create({
    baseURL: baseUrl
});

export default api;