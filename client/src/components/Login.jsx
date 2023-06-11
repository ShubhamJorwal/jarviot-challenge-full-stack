import React, { useEffect } from "react";
import axios from "axios";
import "./login.scss";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const Navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.get("http://localhost:5000/auth/login");
      const { authorizationUrl } = response.data;

      window.location.href = authorizationUrl;
      setTimeout(() => {
        Navigate("/analytics");
      }, 2500);
    } catch (error) {
      console.error("Login error:", error);
    }
    // setTimeout(() => {
      Navigate("/analytics");
    // }, 1500);
  };

  return (
    <div className="loginpage">
      <h1>Google Drive Risk Report</h1>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
};

export default Login;
