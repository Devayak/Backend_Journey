// API LAYER - this is where we will make all our API calls related to authentication (login, register, logout, etc.)


import axios from "axios";
const API_URL = axios.create({
  baseURL: "http://localhost:3000/api/auth", // base URL for all auth-related API calls
  withCredentials: true, // to send cookies with every request (for session management)
});

export const login = async (username, password) => {
  try {
    const response = await API_URL.post("/login", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await API_URL.post("/register", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
