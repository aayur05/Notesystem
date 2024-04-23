import { useState } from "react";
import axios from "axios";
import "../css/resister.css";

function CreateUser() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // Corrected spelling

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setSuccess(""); // Clear previous success message

    if (username === "" || email === "" || password === "" || role === "") {
      setError("Username, email, password, or role is empty");
      return;
    }

    try {
      const checkEmail = await axios.post("/api/user/email", { email: email });
      if (checkEmail.data.length !== 0) {
        setError("User already exists");
        return;
      }

      const hashResponse = await axios.post("/api/user/hash", {
        password: password,
      });
      const hash = hashResponse.data;

      await axios.post("/api/user/create", {
        username: username,
        email: email,
        password: hash,
        role: role,
      });

      setSuccess("User Created Successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to create user. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        {/* Input fields */}
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">SELECT</option>
            <option value="normal">Normal</option>
            {/* <option value="admin">Admin</option> */}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <button type="submit" className="shrijan">
          Create User
        </button>
      </form>
    </div>
  );
}

export default CreateUser;
