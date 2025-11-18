import { refreshToken } from "./auth";

export const fetchUser=async (user)=>{
    const res = await fetch(`http://localhost:3000/api/v1/user/${user.userId}`, {
        method: "GET",
        headers: {
          "authorization": "Bearer " + user.token,
        },
      });
    
      if (res.status === 403) {
        const newToken = await refreshToken();
        if (!newToken) throw new Error("Unable to refresh token");
    
        const retry = await fetch(`http://localhost:3000/api/v1/user/${user.userId}/`, {
          method: "GET",
          headers: { "authorization": "Bearer " + newToken },
        });
    
        return await retry.json();
      }
    
    return await res.json();
};

export const update=async (user,data)=>{
    const res = await fetch(`http://localhost:3000/api/v1/user/${user.userId}`, {
        method: "PUT",
        headers: {
          "authorization": "Bearer " + user.token,
        },
        body: JSON.stringify(data)
      });
    
      if (res.status === 403) {
        const newToken = await refreshToken();
        if (!newToken) throw new Error("Unable to refresh token");
    
        const retry = await fetch(`http://localhost:3000/api/v1/user/${user.userId}/`, {
          method: "GET",
          headers: { "authorization": "Bearer " + newToken },
        });
    
        return await retry.json();
      }
    
    return await res.json();
};