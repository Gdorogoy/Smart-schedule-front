import { sendRequest } from "./AxiosRequestHandler";

const BASE_URL="http://localhost:8000/auth"




export const signup = async (data) => {
    const res=await sendRequest("POST",`${BASE_URL}/signup`,data,null,null);
    return res;
};

export const logoutRequest=async(userId)=>{
    const res=await sendRequest("PUT",`${BASE_URL}/logout/${userId}`,data,null,null);
    return res;
};

export const loginRequest=async(data)=>{
    const res=await sendRequest("POST",`${BASE_URL}/login/`,data,null,null);
    return res;
};

export const deleteUser = async(userId)=>{
    const res=await sendRequest("DELETE",`${BASE_URL}/delete/${userId}`,data,null,null);
    return res;
};