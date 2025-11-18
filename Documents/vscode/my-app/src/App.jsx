import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth.jsx";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./Home.jsx";
import UserSetting from "./components/UserSetting.jsx";

const App = () => {



  const [user,setUser]=useState({
      token: localStorage.getItem('token'),
      userId: localStorage.getItem('userId'),
      refreshToken:localStorage.getItem("refreshToken"),
      email:localStorage.getItem('email')
  });



  return (
    <Router>
      <Routes>
        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <Home user={user}/>
            </ProtectedRoute>
          }
        />
        <Route path="/user" element={<ProtectedRoute> <UserSetting user={user}/></ProtectedRoute>}/>
        <Route path="/auth" element={<Auth user={user} setUser={setUser}/>} />
        <Route path="/" element={<Auth user={user} setUser={setUser}/>} />
      </Routes>
    </Router>
  );
};

export default App;
