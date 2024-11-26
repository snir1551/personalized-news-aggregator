import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // הוספת useNavigate
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    preferences: {
      newsCategories: [], 
      technology: [], 
    },
    chatid: "",
  });

  const navigate = useNavigate();


  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name.includes("preferences")) {
      const [type, key] = name.split(".");
      setFormData({
        ...formData,
        preferences: {
          ...formData.preferences,
          [key]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };


  const handleCategoryChange = (event) => {
    const selectedCategories = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setFormData({
      ...formData,
      preferences: {
        ...formData.preferences,
        newsCategories: selectedCategories,
      },
    });
  };


  const handleTechnologiesChange = (event) => {
    const selectedTechnologies = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setFormData({
      ...formData,
      preferences: {
        ...formData.preferences,
        technology: selectedTechnologies,
      },
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Form Data being sent to server: ", formData); // הדפסת המידע לפני שליחה

    try {
      const res = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("API Response:", data);

      if (data.success) {
        navigate("/login");
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred during registration.");
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Chat ID:</label>
          <input
            type="text"
            name="chatid"
            value={formData.chatid}
            onChange={handleChange}
            required
          />
        </div>

        
        <div>
          <label>Categories:</label>
          <select
            multiple
            name="preferences.newsCategories"
            value={formData.preferences.newsCategories}
            onChange={handleCategoryChange}
          >
            <option value="Tech">Tech</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Business">Business</option>
            <option value="Health">Health</option>
          </select>
        </div>

       
        <div>
          <label>Technologies:</label>
          <select
            multiple
            name="preferences.technology"
            value={formData.preferences.technology}
            onChange={handleTechnologiesChange}
          >
            <option value="Telegram">Telegram</option>
            <option value="Email">Email</option>
          </select>
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;