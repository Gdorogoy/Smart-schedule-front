import axios from "axios";
import { refreshToken } from "./AuthService";
const BASE_URL = "http://localhost:8000/tasks";

export const getTasks = async (token, userId,longToken) => {
  let rtoken;
  let res = await axios.get(`${BASE_URL}/get/${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if(res.status===401){
    rtoken=await refreshToken(longToken);
  }
  await axios.get(`${BASE_URL}/get/${userId}`, {
    headers: { Authorization: `Bearer ${rtoken}` }
  });

  return res.data;
};

export const createTask = async (token, userId, taskData) => {
  let rtoken;
  let res = await axios.post(
    `${BASE_URL}/create/${userId}`,
    taskData,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if(res.status===401){
    rtoken=await refreshToken(longToken);
  }
  return res.data;
};

export const updateTask = async (token, userId, taskId, data) => {
  let rtoken;
  let res = await axios.put(
    `${BASE_URL}/update/${userId}/${taskId}`,
    data,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if(res.status===401){
    rtoken=await refreshToken(longToken);
  }
  return res.data;
};

export const deleteTask = async (token, userId, taskId) => {
  let rtoken;
  let res = await axios.delete(
    `${BASE_URL}/delete/${userId}/${taskId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if(res.status===401){
    rtoken=await refreshToken(longToken);
  }
  return res.data;
};
