import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

import "../css/resister.css";

const EditUser = () => {
  const cookie = new Cookies();
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const tokenData = cookie.get("token");
    if (!tokenData) return;

    const verifyToken = async () => {
      try {
        const response = await axios.post("/api/user/verifyToken", {
          token: tokenData,
        });
        setUserId(response.data.userId);
      } catch (error) {
        console.error("Error verifying token:", error);
      }
    };

    verifyToken();
  }, [cookie]);

  useEffect(() => {
    if (!userId) return; // Ensure userId is not null

    const getData = async () => {
      try {
        const response = await axios.get(`/api/user/detail/${userId}`);
        const { username, email } = response.data[0];
        console.log(response);
        setUserName(username);
        setEmail(email);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    getData();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === "" || email === "") {
      setError("Username, email cannot be empty");
      return;
    }

    try {
      const responce = await axios.put("/api/user/" + userId, {
        username: username,
        email: email,
      });
      //   console.log(responce);
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to update user details.");
    }
  };

  const handlePassword = async (e) => {
    e.preventDefault();
    if (password === "") {
      setError("Password cannot be empty");
      return;
    }

    try {
      const hashResponse = await axios.post("/api/user/hash", {
        password: password,
      });

      const hash = hashResponse.data;

      const responce = await axios.put("/api/user/pass/" + userId, {
        password: hash,
      });
      //   console.log(responce);
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to update user details.");
    }
  };

  return (
    <>
      <div>
        <div>EDIT USER</div>
        <form>
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
            <label htmlFor="password">New Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button className="submit-btn" onClick={handleSubmit}>
            Update Information
          </button>
          <button className="submit-btn" onClick={handlePassword}>
            Update Password
          </button>
        </form>
      </div>
    </>
  );
};

export default EditUser;
