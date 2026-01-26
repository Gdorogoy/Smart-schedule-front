import { Button, TextField } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useEffect, useState, useContext } from "react";
import { data, useNavigate } from "react-router-dom";
import { loginRequest, signup } from '../Services/AuthService.js';
import { AuthContext } from "../AuthProvider.jsx";
const Auth = () => {
  const { user, setUser,auth,login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
  if (auth?.token) {
      navigate("/calendar", { replace: true });
    }
  }, [auth]);

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
      let res;

      if (isLogin) {
        res = await loginRequest(loginInput);
      } else {
        if (pass !== registerInput.password) {
          alert("Passwords should match");
          return;
        }
        res = await signup(registerInput);
      }
      if (res.data?.token) {
        
        login({
          token: res.data.token,
          userId:res.data.user.userId,
          refreshToken: res.data.refreshToken,
        });

        setUser(res.data.user);

        alert(isLogin ? "Login successful!" : "Signup successful!");
        navigate("/calendar", { replace: true });

      } else {
        console.error("No token in response:", res);
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
