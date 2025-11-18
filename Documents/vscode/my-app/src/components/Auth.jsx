import { Button, TextField } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Auth = ({setUser}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = () => {
      return (
        localStorage.getItem("token") &&
        localStorage.getItem("refreshToken") &&
        localStorage.getItem("userId") &&
        localStorage.getItem("email")
      );
    };
    if (isLoggedIn()) {
      navigate("/calendar", { replace: true });
    }
  }, []);

  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  const [registerInput, setRegisterInput] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname:"",
    timeZone: ""
  });

  const [pass, setPass] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleChange = () => {
    setLoginInput({ email: "", password: "" });
    setRegisterInput({ email: "", password: "", firstname: "",lastname:"", timeZone: "" });
    setPass("");
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    

    try {
      const url = isLogin
        ? "http://localhost:3000/api/v1/auth/login"
        : "http://localhost:3000/api/v1/auth/signup";

      const body = isLogin
        ? loginInput
        : {
            email: registerInput.email,
            password: registerInput.password,
            firstname: registerInput.firstname,
            lastname: registerInput.lastname,
            timeZone: registerInput.timeZone,
          };

      console.log(body);
      if (pass !== registerInput.password && isLogin === false) {
        alert("password should match");
        return;
      }

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        alert(data.error || "Signup/Login failed");
        return;
      }

      if (data?.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshToken", data.refreshToken || "");
        localStorage.setItem("userId", data.user?.id || "");
        localStorage.setItem("email", data.user?.email || "");

        setUser({
          token: data.token,
          refreshToken: data.refreshToken || "",
          userId: data.user?.id || "",
          email: data.user?.email || ""
        });
        
        alert(isLogin ? "Login successful!" : "Signup successful!");
        navigate("/calendar", { replace: true });
      } else {
        console.error("No token in response:", data);
        alert("No token received from server.");
      }
    } catch (error) {
      console.error("Network or server error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <>
      {isLogin ? (
        <Box component="form" onSubmit={handleSubmit} id="login-form">
          <Stack spacing={2}>
            <TextField
              label="Email"
              name="email"
              fullWidth
              value={loginInput.email}
              onChange={(e) =>
                setLoginInput({ ...loginInput, email: e.target.value })
              }
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              value={loginInput.password}
              onChange={(e) =>
                setLoginInput({ ...loginInput, password: e.target.value })
              }
              required
            />
          </Stack>
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Login
          </Button>
        </Box>
      ) : (
        <Box component="form" onSubmit={handleSubmit} id="register-form">
          <Stack spacing={2}>
            <TextField
              label="Email"
              name="email"
              fullWidth
              value={registerInput.email}
              onChange={(e) =>
                setRegisterInput({ ...registerInput, email: e.target.value })
              }
              required
            />
            <TextField
              label="FirstName"
              name="name"
              fullWidth
              value={registerInput.firstname}
              onChange={(e) =>
                setRegisterInput({ ...registerInput, firstname: e.target.value })
              }
              required
            />
            <TextField
              label="Last Name"
              name="name"
              fullWidth
              value={registerInput.lastname}
              onChange={(e) =>
                setRegisterInput({ ...registerInput, lastname: e.target.value })
              }
            />
            <TextField
              label="TimeZone"
              name="timeZone"
              fullWidth
              value={registerInput.timeZone}
              onChange={(e) =>
                setRegisterInput({ ...registerInput, timeZone: e.target.value })
              }
              required
            />
            <TextField
              label="Password"
              name="password"
              fullWidth
              type="password"
              value={registerInput.password}
              onChange={(e) =>
                setRegisterInput({ ...registerInput, password: e.target.value })
              }
              required
            />
            <TextField
              label="Re-enter Password"
              name="repassword"
              fullWidth
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
            />
          </Stack>
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Register
          </Button>
        </Box>
      )}

      <Button onClick={handleChange} sx={{ mt: 2 }}>
        {isLogin ? "Need an account? Register" : "Already have an account? Login"}
      </Button>
    </>
  );
};

export default Auth;