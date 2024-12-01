import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './Dashboard.css';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;

  if (!user) {
    return (
      <div className="dashboard-container">
        <h1>Error: User data not available</h1>
        <button onClick={() => navigate("/")}>Go to Login</button>
      </div>
    );
  }

  const [users, setUsers] = useState([]);
  const [response, setResponse] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [news, setNews] = useState({ results: [] });
  const [preferences, setPreferences] = useState({
    newsCategories: user.preferences?.newsCategories || [],
    technology: user.preferences?.technology || [],
  });


  useEffect(() => {
    fetchUsers();
    fetchNews();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setUsers(data.filter((u) => u.username !== user.username));
    } catch (error) {
      setResponse({ error: "Failed to fetch users" });
    }
  };

  const fetchNews = async () => {
    try {
      const res = await fetch(`http://localhost:3002/api/news/${user.id}`, {
        method: "GET", 
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setNews(data); 
    } catch (error) {
      setResponse({ error: "Failed to fetch news" });
    }
  };

  const sendNewsToEmail = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/notifications/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id }), 
      });
      const data = await res.json();
  
      if (res.ok) {
        setResponse({ success: "News sent to your email successfully!" });
        alert("News sent to your email successfully!");
      } else {
        setResponse({ error: data.error || "Failed to send news to email" });
      }
    } catch (error) {
      setResponse({ error: "Error occurred while sending news to email" });
    }
  };

  const deleteUser = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/users/${user.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        alert("Your account has been deleted successfully!");
        navigate("/");
      } else {
        setResponse({ error: "Failed to delete your account" });
      }
    } catch (error) {
      setResponse({ error: "Error occurred while deleting your account." });
    }
  };

  const handlePreferencesChange = (e) => {
    const { name, value, checked } = e.target;
    setPreferences((prev) => ({
      ...prev,
      [name]: checked
        ? [...prev[name], value]
        : prev[name].filter((item) => item !== value),
    }));
  };

  const updatePreferences = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/users/${user.id}/preferences`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ preferences }),
        }
      );
      const data = await res.json();
      if (data.success) {
        alert("Preferences updated successfully!");
      } else {
        setResponse({ error: "Failed to update preferences" });
      }
    } catch (error) {
      setResponse({ error: "Error occurred while updating preferences." });
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">Welcome, {user.username}!</h1>
      <h2 className="dashboard-subheader">All Users:</h2>
      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, index) => (
              <tr key={u.id || index}>
                <td>{u.username}</td>
                <td>{u.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={() => setShowSettings(!showSettings)}
      >
        Settings
      </button>

      {showSettings && (
        <div className="settings-container">
          <h3>Account Settings</h3>
          <button onClick={deleteUser} className="delete-account-button">
            Delete My Account
          </button>
        </div>
      )}

      <h2>Update Preferences</h2>
      <div className="preferences-container">
        <div className="preferences-section">
          <h3>News Categories</h3>
          <div>
            {["Tech", "Design", "Marketing", "Business", "Health"].map((category) => (
              <label key={category}>
                <input
                  type="checkbox"
                  name="newsCategories"
                  value={category}
                  checked={preferences.newsCategories.includes(category)}
                  onChange={handlePreferencesChange}
                />
                {category}
              </label>
            ))}
          </div>
        </div>

        <div className="preferences-section">
          <h3>Technology</h3>
          <div>
            {["Email", "Telegram"].map((tech) => (
              <label key={tech}>
                <input
                  type="checkbox"
                  name="technology"
                  value={tech}
                  checked={preferences.technology.includes(tech)}
                  onChange={handlePreferencesChange}
                />
                {tech}
              </label>
            ))}
          </div>
        </div>

        <button onClick={updatePreferences}>
          Save Preferences
        </button>
      </div>

      <h2>Latest News</h2>
      {news.results.length > 0 ? (
        <div className="news-container">
          <ul>
            {news.results.map((newsItem, index) => (
              <li key={index}>{newsItem.title}</li>
            ))}
          </ul>
          <button
            onClick={sendNewsToEmail}
          >
            Send News to My Email
          </button>
        </div>
      ) : (
        <p>No news available</p>
      )}

      <div className="response-container">
        {response?.success && <h2>{response.success}</h2>}
        {response?.error && <p>{response.error}</p>}
      </div>
    </div>
  );
};

export default Dashboard;