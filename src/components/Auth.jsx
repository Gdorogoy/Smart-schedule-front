import { Button, TextField } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login, signup } from '../Services/AuthService.js';
import { AuthContext } from "../AuthProvider.jsx";
const Auth = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.token) {
      navigate("/calendar", { replace: true });
    }
  }, [user, navigate]);

  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  const [registerInput, setRegisterInput] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    timeZone: ""
  });

  const [pass, setPass] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleChange = () => {
    setLoginInput({ email: "", password: "" });
    setRegisterInput({ email: "", password: "", firstname: "", lastname: "", timeZone: "" });
    setPass("");
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let data;

      if (isLogin) {
        data = await login(loginInput);
      } else {
        if (pass !== registerInput.password) {
          alert("Passwords should match");
          return;
        }
        data = await signup(registerInput);
      }

      if (data?.token) {
        console.log("isLogin:", isLogin);
        console.log("data:", data);

        setUser({
          token: data.token,
          userId: isLogin ? data.user.userId : data.user.id || null,
          email: data.user.email,
          refreshToken: data.refreshToken,
        });

        alert(isLogin ? "Login successful!" : "Signup successful!");
        navigate("/calendar", { replace: true });

      } else {
        console.error("No token in response:", data);
        alert("No token received from server.");
      }
    } catch (error) {
      console.error("Network or server error:", error);
      alert(error.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <>
      {isLogin ? (
        <Box component="form" onSubmit={handleSubmit} id="login-form">
          <Stack spacing={2}>
            <TextField
              label="Email"
              fullWidth
              value={loginInput.email}
              onChange={(e) =>
                setLoginInput({ ...loginInput, email: e.target.value })
              }
              required
            />
            <TextField
              label="Password"
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
              fullWidth
              value={registerInput.email}
              onChange={(e) =>
                setRegisterInput({ ...registerInput, email: e.target.value })
              }
              required
            />
            <TextField
              label="First Name"
              fullWidth
              value={registerInput.firstname}
              onChange={(e) =>
                setRegisterInput({ ...registerInput, firstname: e.target.value })
              }
              required
            />
            <TextField
              label="Last Name"
              fullWidth
              value={registerInput.lastname}
              onChange={(e) =>
                setRegisterInput({ ...registerInput, lastname: e.target.value })
              }
            />
            <TextField
              label="Time Zone"
              fullWidth
              value={registerInput.timeZone}
              onChange={(e) =>
                setRegisterInput({ ...registerInput, timeZone: e.target.value })
              }
              required
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={registerInput.password}
              onChange={(e) =>
                setRegisterInput({ ...registerInput, password: e.target.value })
              }
              required
            />
            <TextField
              label="Re-enter Password"
              type="password"
              fullWidth
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
