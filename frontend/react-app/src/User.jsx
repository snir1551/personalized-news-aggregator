import React, { useState } from "react";
import Register from "./Register";
import Login from "./Login";

const User = () => {
  const [showLogin, setShowLogin] = useState(true);  // הגדרת מצב להחלפת דפים
  const [showRegister, setShowRegister] = useState(false);

  const handleShowRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const handleShowLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  return (
    <div className="user-container">
      <h1>User Service</h1>

      
      <div>
        <button onClick={handleShowRegister}>Register</button>
        <button onClick={handleShowLogin}>Login</button>
      </div>

     
      {showLogin && <Login />}
      {showRegister && <Register />}
    </div>
  );
};

export default User;