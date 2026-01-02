import axios from "axios";
import { sendRequest } from "./AxiosRequestHandler";
const BASE_URL="http://localhost:8000/users"






export const getUser = async (userId,token,refreshToken) => {
  const res=await sendRequest("GET",`${BASE_URL}/get/${userId}/`,null,token,refreshToken);
  return res;
};

export const updateUser = async (userId,token,data,refreshToken) => {
  const res=await sendRequest("PUT",`${BASE_URL}/update/`,data,token,refreshToken);
  return res;
}

export const deleteUser = async (token,refreshToken) => {
  const res=await sendRequest("DELETE",`${BASE_URL}/delete/${userId}/`,null,token,refreshToken);
  return res;
};

