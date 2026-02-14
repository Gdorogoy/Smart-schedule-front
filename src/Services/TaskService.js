import { sendRequest } from "./AxiosRequestHandler";
const BASE_URL = "http://localhost:8000/tasks";

export const getTasks = async (token, userId,refreshToken) => {
  const res=await sendRequest("GET",`${BASE_URL}/get/${userId}`,null,token,refreshToken);
  return res;
};

export const createTask = async (token, userId, data,refreshToken) => {
  const res=await sendRequest("POST",`${BASE_URL}/create/${userId}`,data,token,refreshToken);
  return res;
};

export const updateTask = async (token, userId, taskId, data,refreshToken) => {
  const res=await sendRequest("PUT",`${BASE_URL}/update/${userId}/${taskId}`,data,token,refreshToken);
  return res;
};

export const deleteTask = async (token, userId, taskId ,refreshToken) => {
  const res=await sendRequest("DELETE",`${BASE_URL}/delete/${userId}/${taskId}`,null,token,refreshToken);
  return res;
};

export const finishTask= async (token, userId ,taskId ,refreshToken)=>{
  const res=await sendRequest("PATCH",`${BASE_URL}/update/complete/${userId}/${taskId}`,null,token,refreshToken);
  return res;
}
