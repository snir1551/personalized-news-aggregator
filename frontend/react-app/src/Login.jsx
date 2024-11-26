import React, { useState } from "react";
import "./Login.css"; // יש להוסיף קובץ CSS כדי לעצב את הדף
import { useNavigate } from "react-router-dom"; // 

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [response, setResponse] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        navigate("/dashboard", { state: { user: data.user } });
        alert("Login successful!");
      } else {
        setResponse({ error: data.message || "Invalid credentials" });
      }
    } catch (error) {
      setResponse({ error: "Error while logging in." });
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Login
        </button>
      </form>
      {response && (
        <div className="error-message">
          <p>{response.error}</p>
        </div>
      )}
    </div>
  );
};

export default Login;