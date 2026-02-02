import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./AuthProvider.jsx";
import { CssBaseline } from "@mui/material";
import UserSetting from "./components/User/UserSetting.jsx";
import Home from "./Home.jsx";
import TeamsComponent from "./components/Teams/TeamsComponent.jsx";
import TeamView from "./components/Teams/TeamView.jsx";
import Auth from './components/Auth.jsx';

const App = () => {



  /*
    add team component
    add colors etc 
  */



  return (
    <AuthProvider>
      <CssBaseline></CssBaseline>
      <Router>
        <Routes>
          <Route path="/calendar" element={<ProtectedRoute><Home/></ProtectedRoute>} />
          <Route path="/user" element={<ProtectedRoute><UserSetting/></ProtectedRoute>} />
          <Route path="/teams" element={<ProtectedRoute > <TeamsComponent></TeamsComponent>  </ProtectedRoute>}></Route>
          <Route path="/team" element={<ProtectedRoute > <TeamView></TeamView> </ProtectedRoute>}></Route>
          <Route path="/auth" element={<Auth/>} />
          <Route path="/" element={<Auth />} />
        </Routes>
      </Router>
    </AuthProvider>
);
};

export default App;
