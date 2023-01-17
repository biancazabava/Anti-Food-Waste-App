import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const user = {
      username: data.get("uname"),
      password: data.get("pass"),
    };

    const response = await fetch("http://localhost:7000/api/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 201) {
      const json = await response.json();
      localStorage.setItem("userId", json.userId);
      window.location.href = `http://localhost:3000/`;
    } else {
      alert("Utilizatorul nu a fost gasit");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <div className="login-input-container">
            <label>Username </label>
            <input type="text" name="uname" autoComplete="off" required />
          </div>
          <div className="login-input-container">
            <label>Password </label>
            <input type="password" name="pass" required />
          </div>
          <div className="login-button-container">
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
