import axios from "axios";

// Set up base URL from environment
// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const API_URL = "http://localhost:5000";

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = async (email, password) => {
  const data = await apiClient.post(
    "/api/users/login",
    {
      email,
      password,
    },
    { withCredentials: true }
  );
  return data;
};
export const registerUser = async (name, email, password) => {
  const { data } = await apiClient.post("/api/users/register", {
    name,
    email,
    password,
  });
  return data;
};
export const products = async (obj) => {
  const { data } = await apiClient.post(
    "/api/products/addProduct",
    obj, // Send the object directly without wrapping it in another object
    {
      headers: {
        "Content-Type": "multipart/form-data;",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, X-Requested-With",
      },
    }
  );
  return data;
};
export const addorders = async (obj) => {
  const { data } = await apiClient.post(
    "/api/orders",
    obj, // Send the object directly without wrapping it in another object
    {
      headers: {
        "Content-Type": "multipart/form-data;",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, X-Requested-With",
      },
    }
  );
  return data;
};

export const fetchProducts = async () => {
  const { data } = await apiClient.get("/api/products");
  return data;
};
