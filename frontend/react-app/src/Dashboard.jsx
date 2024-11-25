import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;

  if (!user) {
    return (
      <div>
        <h1>Error: User data not available</h1>
        <button onClick={() => navigate("/")}>Go to Login</button>
      </div>
    );
  }

  const [users, setUsers] = useState([]);
  const [response, setResponse] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    fetchUsers();
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

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <h2>All Users:</h2>
      <div
        style={{
          border: "1px solid #ccc",
          height: "300px",
          overflowY: "scroll",
          padding: "10px",
        }}
      >
        <table border="1" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.username}</td>
                <td>{u.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={() => setShowSettings(!showSettings)} style={{ marginTop: "20px" }}>
        Settings
      </button>

      {showSettings && (
        <div style={{ marginTop: "20px" }}>
          <h3>Account Settings</h3>
          <button onClick={deleteUser} style={{ color: "red" }}>
            Delete My Account
          </button>
        </div>
      )}

      {response && (
        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <h2>Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Dashboard;