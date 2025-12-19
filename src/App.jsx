import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth.jsx";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./Home.jsx";
import UserSetting from "./components/UserSetting.jsx";
import { AuthProvider,AuthContext } from "./AuthProvider.jsx";
const App = () => {



  /*
    fix task problem, (update git and container)
    add team component
    add colors etc 

    

  */



  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/calendar" element={<ProtectedRoute><Home/></ProtectedRoute>} />
          <Route path="/user" element={<ProtectedRoute><UserSetting/></ProtectedRoute>} />
          {/* <Route path="/team" element={<ProtectedRoute > </ProtectedRoute>}></Route> */}
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Auth />} />
        </Routes>
      </Router>
    </AuthProvider>
);
};

export default App;
