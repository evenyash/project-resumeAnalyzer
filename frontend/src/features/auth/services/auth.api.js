import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.API_URL}`,
  withCredentials: true,
});

export const register = async ({ username, email, password }) => {
  try {
    const res = await api.post("/api/auth/register", {
      username,
      email,
      password,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const login = async ({ email, password }) => {
  try {
    const res = await api.post("/api/auth/login", {
      email,
      password,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    const res = await api.get("/api/auth/logout");

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getMe = async () => {
  try {
    const res = await api.get("/api/auth/get-me");

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
