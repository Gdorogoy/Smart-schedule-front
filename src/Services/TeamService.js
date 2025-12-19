import axios from "axios";
import { refreshToken } from "./AuthService.js";
const BASE_URL="http://localhost:8000/teams"


export const getValidToken = async () => {
  try {
    let token = localStorage.getItem("token");

    if (token) return token;

    const rToken = localStorage.getItem("refreshToken");
    if (!rToken) return "logout";

    const res = refreshToken(rToken);

    const newToken = res.token;

    localStorage.setItem("token", newToken);
    return newToken;

  } catch (err) {
    console.error("Token error:", err);
    return "logout";
  }
};

export const getTeam = async (teamId) => {
  try {
    const token = await getValidToken();
    if (token === "logout") return "logout";

    const res = await axios.get(`${BASE_URL}/get/${teamId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getAllTeams = async () => {
  try {
    const token = await getValidToken();
    if (token === "logout") return "logout";

    const res = await axios.get(`${BASE_URL}/getAll`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const createTeam = async (teamData) => {
  try {
    const token = await getValidToken();
    if (token === "logout") return "logout";

    const res = await axios.post(`${BASE_URL}/create`, teamData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const updateTeam = async (teamId, updateData) => {
  try {
    const token = await getValidToken();
    if (token === "logout") return "logout";

    const res = await axios.put(`${BASE_URL}/update/${teamId}`, updateData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const assignTasksToTeam = async (teamId, taskList) => {
  try {
    const token = await getValidToken();
    if (token === "logout") return "logout";

    const res = await axios.put(`${BASE_URL}/assign/${teamId}`, { tasks: taskList }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const deleteTeam = async (teamId) => {
  try {
    const token = await getValidToken();
    if (token === "logout") return "logout";

    const res = await axios.delete(`${BASE_URL}/delete/${teamId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};