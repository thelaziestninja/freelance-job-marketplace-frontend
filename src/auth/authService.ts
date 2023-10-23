import axios from "axios";

const API_URL = "http://localhost:3000/user";

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    return response.data.token;
  } catch (error) {
    console.error("Login error", error);
    throw error;
  }
};

export const logout = async (token: string) => {
  try {
    await axios.post(
      `${API_URL}/logout`,
      {},
      { headers: { Authorization: `Bearer ${token}` } } // The authentication token is included in the request headers to authorize the request.
    );
  } catch (error) {
    console.error("Logout error", error);
    throw error;
  }
};
