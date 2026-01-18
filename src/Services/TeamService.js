import { sendRequest } from "./AxiosRequestHandler";
const BASE_URL="http://localhost:8000/teams"


export const getTeams=async(token,refreshToken)=>{
  const res=await sendRequest("GET",`${BASE_URL}/getAll/`,null,token,refreshToken);
  return res;
}

export const getTeam=async(token,refreshToken,teamId)=>{
  const res=await sendRequest("GET",`${BASE_URL}/get/${teamId}`,null,token,refreshToken);
  return res;
}


//  todo :::: 
// 3) add auto access token update when updated from backend (used refresh token);