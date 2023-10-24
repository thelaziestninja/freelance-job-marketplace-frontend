// frontend2/src/auth/authService.ts
import axios from "axios";

const API_URL = "http://localhost:3000/user";

export const setToken = (token: string) => {
  sessionStorage.setItem("token", token);
};

export const getToken = () => {
  return sessionStorage.getItem("token");
};

export const removeToken = () => {
  sessionStorage.removeItem("token");
};

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    setToken(response.data.token); // Using setToken here
    return response.data.token;
  } catch (error) {
    console.error("Login error", error);
    throw error;
  }
};

export const logout = async () => {
  const token = getToken(); // Retrieve token from sessionStorage
  if (!token) throw new Error("No token found"); // Handle case where no token is found

  try {
    await axios.post(
      `${API_URL}/logout`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    removeToken(); // Using removeToken here
  } catch (error) {
    console.error("Logout error", error);
    throw error;
  }
};
