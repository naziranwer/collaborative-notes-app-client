import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:5000/api/",
  baseURL: "https://collaborative-notes-app-server.onrender.com/api/",
});

API.interceptors.request.use((req) => {
  const token = sessionStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
