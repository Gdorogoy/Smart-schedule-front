import axios from "axios";

const BASE_URL="http://localhost:8000/auth"




export const signup = async (userId,data) => {
  const res=await axios.post(`${BASE_URL}/signup/${userId}`,
    {headers: {'Content-Type':'application/json'}}
  );
  return res.data;
};

export const logout=async(userId)=>{
    const res = await axios.put(
    `${BASE_URL}/logout/${userId}`,
        {headers: {'Content-Type': 'application/json'}}
        );
        return res.data;
};

export const login=async(data)=>{
    const res= await axios.post(`${BASE_URL}/login`,data,
        {headers: {'Content-Type': 'application/json',}}
    );
    return res.data;
};

export const refreshToken=async(token)=>{
    const res= await axios.post(`${BASE_URL}/refresh`,
        token,
        {headers:{'Content-Type':'application/json'}}
        );
    return res.data;
}

export const deleteUser = async(userId)=>{
    const res=await axios.delete(`${BASE_URL}/delete/${userId}`,
        {headers:{'Content-Type':'application/json'}}
    );
    return res.data;
}