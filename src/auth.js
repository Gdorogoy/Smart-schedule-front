export const getUser = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  if (!token || !userId) return null;
  return { token, userId };
};

export const refreshToken = async () => {
  const storedRefresh = localStorage.getItem("refreshToken");
  const storedEmail = localStorage.getItem("email");
  const storedUser = localStorage.getItem("userId");
  
  if (!storedRefresh || !storedEmail || !storedUser) {
    console.error("Missing refresh credentials");
    return null;
  }

  try {
    const res = await fetch("http://localhost:3000/api/v1/auth/give", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        refreshToken: storedRefresh,
        email: storedEmail,
        userId: storedUser
      }),
    });

    if (!res.ok) {
      console.error("Refresh token failed:", res.status, res.statusText);
      localStorage.clear();
      return null;
    }

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      if (data.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }
      return data.token;
    }

    return null;
  } catch (error) {
    console.error("Error refreshing token:", error);
    localStorage.clear();
    return null;
  }
};