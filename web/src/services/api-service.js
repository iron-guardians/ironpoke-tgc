import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL || "http://localhost:3000/api/v1",
  withCredentials: true,
});

http.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error);
  }
);

const profile = () => http.get("/users/me");

const register = (user) => http.post("/users", user);

const login = (user) => http.post("/sessions", user);

const getUser = (userId) => http.get(`/users/${userId}`);

const getUserCards = (userId) => http.get(`/user-cards/${userId}`);

const getSet = (setId) => http.get(`/card-sets/${setId}`);


export { login, register, profile, getUser, getUserCards, getSet };