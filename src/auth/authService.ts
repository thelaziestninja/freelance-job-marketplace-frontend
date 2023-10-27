import axios from "axios";

const API_URL = "http://localhost:3000/user";

export const setToken = (token: string) => {
  console.log("Token before setting to session storage:", token);
  sessionStorage.setItem("token", token);
};

export const getToken = () => {
  return sessionStorage.getItem("token");
};

export const removeToken = () => {
  sessionStorage.removeItem("token");
};

export const setUserType = (userType: "client" | "freelancer") => {
  sessionStorage.setItem("userType", userType);
};

export const getUserType = () => {
  return sessionStorage.getItem("userType") as "client" | "freelancer" | null;
};

export const removeUserType = () => {
  sessionStorage.removeItem("userType");
};

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    console.log("Token from login response:", response.data.token);
    console.log("Type of token:", typeof response.data.token);
    const token = response.data.token;
    const userType = response.data.user.user_type as "client" | "freelancer";
    setToken(token);
    setUserType(userType);
    return { token, userType };
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
    removeUserType();
  } catch (error) {
    console.error("Logout error", error);
    throw error;
  }
};
