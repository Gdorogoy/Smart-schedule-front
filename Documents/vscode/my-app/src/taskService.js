import { refreshToken } from "./auth";

export const fetchAll = async (user) => {
  try {
    const res = await fetch(`http://localhost:3000/api/v1/user/${user.userId}/tasks`, {
      method: "GET",
      headers: {
        "authorization": "Bearer " + user.token,
      },
    });

    if (res.status === 403 || res.status === 401) {
      console.log("Token expired, attempting refresh...");
      const newToken = await refreshToken();
      
      if (!newToken) {
        throw new Error("Unable to refresh token - please login again");
      }

      const retry = await fetch(`http://localhost:3000/api/v1/user/${user.userId}/tasks`, {
        method: "GET",
        headers: { "authorization": "Bearer " + newToken },
      });

      if (!retry.ok) {
        throw new Error("Failed to fetch tasks after token refresh");
      }

      return await retry.json();
    }

    if (!res.ok) {
      throw new Error(`Failed to fetch tasks: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error in fetchAll:", error);
    throw error;
  }
};

export const create = async (user, data) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/v1/user/${user.userId}/tasks/`,
      {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "authorization": "Bearer " + user.token
        },
        body: JSON.stringify(data)
      }
    );

    if (res.status === 403 || res.status === 401) {
      const newToken = await refreshToken();
      if (!newToken) throw new Error("Unable to refresh token");

      const retry = await fetch(
        `http://localhost:3000/api/v1/user/${user.userId}/tasks/`,
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "authorization": "Bearer " + newToken
          },
          body: JSON.stringify(data)
        }
      );

      return await retry.json();
    }

    return await res.json();
  } catch (error) {
    console.error("Error in create:", error);
    throw error;
  }
};

export const updateTask = async (user, data) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/v1/user/${user.userId}/tasks/${data.id}`,
      {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "authorization": "Bearer " + user.token
        },
        body: JSON.stringify(data)
      }
    );

    if (res.status === 403 || res.status === 401) {
      const newToken = await refreshToken();
      if (!newToken) throw new Error("Unable to refresh token");

      const retry = await fetch(
        `http://localhost:3000/api/v1/user/${user.userId}/tasks/${data.id}`,
        {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json",
            "authorization": "Bearer " + newToken
          },
          body: JSON.stringify(data)
        }
      );

      return await retry.json();
    }

    return await res.json();
  } catch (error) {
    console.error("Error in updateTask:", error);
    throw error;
  }
};

export const deleteTask = async (user, data) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/v1/user/${user.userId}/tasks/${data.id}`,
      {
        method: "DELETE",
        headers: { 
          "Content-Type": "application/json",
          "authorization": "Bearer " + user.token
        }
      }
    );

    if (res.status === 403 || res.status === 401) {
      const newToken = await refreshToken();
      if (!newToken) throw new Error("Unable to refresh token");

      const retry = await fetch(
        `http://localhost:3000/api/v1/user/${user.userId}/tasks/${data.id}`,
        {
          method: "DELETE",
          headers: { 
            "Content-Type": "application/json",
            "authorization": "Bearer " + newToken
          }
        }
      );

      return await retry.json();
    }

    return await res.json();
  } catch (error) {
    console.error("Error in deleteTask:", error);
    throw error;
  }
};