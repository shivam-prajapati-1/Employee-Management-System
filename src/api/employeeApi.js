import axios from "axios";

const API_URL = "https://localhost:7051/api/Employees";

export const getEmployees = (search = "", page = 1, pageSize = 10) =>
  axios.get(API_URL, {
    params: { search, page, pageSize }
  });

export const getEmployeeById = (id) =>
  axios.get(`${API_URL}/${id}`);

export const createEmployee = (data) =>
  axios.post(API_URL, data);

export const updateEmployee = (id, data) =>
  axios.put(`${API_URL}/${id}`, data);

export const deleteEmployee = (id) =>
  axios.delete(`${API_URL}/${id}`);
