import axios from "axios";


const API_URL = "https://localhost:7051/api/auth"; 

export const loginApi = (data) => axios.post(`${API_URL}/login`, data);

export const registerApi = (data) => axios.post(`${API_URL}/register`, data);
