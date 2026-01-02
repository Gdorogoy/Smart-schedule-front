import { sendRequest } from "./AxiosRequestHandler";
const BASE_URL="http://localhost:8000/teams"


export const getTeams=async(userId,token,refreshToken)=>{
  // const res=await sendRequest("GET",`${BASE_URL}/getAll/`,null,token,refreshToken);
  return 1;

  
}


//  todo :::: 
// 3) add auto access token update when updated from backend (used refresh token);