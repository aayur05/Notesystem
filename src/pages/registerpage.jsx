import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../css/resister.css";

function Register() {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (username === "" || email === "" || password === "") {
        console.log("username or email or Password empty");
        setError("username or email or Password empty");
        return;
      }

      const checkEmail = await axios.post("/api/user/email", { email: email });
      console.log(checkEmail);

      if (checkEmail.data.length !== 0) {
        console.log("User already exists");
        setError("User already exists");
        return;
      }

      const hashResponse = await axios.post("/api/user/hash", {
        password: password,
      });

      const hash = hashResponse.data;
      console.log(hash);

      const response = await axios.post("/api/user", {
        username: username,
        email: email,
        password: hash,
      });

      console.log("Response:", response.data);

      navigate("/login");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button className="shrijan">Register</button>
      </form>
    </div>
  );
}

export default Register;
