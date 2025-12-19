import axios from "axios";
import { refreshToken } from "./AuthService.js";
const BASE_URL="http://localhost:8000/users"






export const getUser = async (userId,token,longToken) => {
  let rtoken;
  let res = await axios.get(`${BASE_URL}/get/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  });
  if(res.status===401){
    rtoken=await refreshToken(longToken);
  }
  res = await axios.get(`${BASE_URL}/get/${userId}`, {
      headers: {
        Authorization: `Bearer ${rtoken}`,
      },
  });
    
  return res.data;
};




export const updateUser = async (userId,token,data,longToken) => {

  let rtoken;

  let res = await axios.put(
    `${BASE_URL}/update/`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  if(res.status===401){
    rtoken=await refreshToken(longToken);
  }
  res = await axios.put(
    `${BASE_URL}/update/`,
    data,
    {
    headers: {
        Authorization: `Bearer ${rtoken}`,
      },
  });

  return res.data;
}




export const deleteUser = async (token,longToken) => {
  let rtoken;
  let res = await axios.delete(
    `${BASE_URL}/delete/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if(res.status===401){
    rtoken=await refreshToken(longToken);
  }
  res = await axios.delete(
    `${BASE_URL}/delete/`,
    {
      headers: {
        Authorization: `Bearer ${rtoken}`,
      },
    }
  );


  return res.data;
};

