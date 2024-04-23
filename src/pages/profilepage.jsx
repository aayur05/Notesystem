import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Link, useNavigate } from "react-router-dom";

import "../css/profile.css";

function Profile() {
  const cookie = new Cookies();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null); // Initialize to null

  useEffect(() => {
    const tokenData = cookie.get("token");

    if (!tokenData) return;

    const verifyToken = async () => {
      try {
        const response = await axios.post("/api/user/verifyToken", {
          token: tokenData,
        });
        // console.log(response);
        setUserId(response.data.userId);
      } catch (error) {
        console.error("Error verifying token:", error);
      }
    };

    verifyToken();
  }, [cookie]);

  useEffect(() => {
    if (!userId) return;
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/user/detail/${userId}`); // Template literal for constructing URL
        console.log(response.data[0]);
        setUser(response.data[0]);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchData();
  }, [userId]);

  const logOut = (e) => {
    e.preventDefault();
    cookie.remove("token", { path: "/" });
    localStorage.removeItem("remindTriggered");
    navigate("/");
  };

  return (
    <div className="profile-container">
      <h2>Profile Page</h2>
      {user ? (
        <>
          <div className="centerme">
            {/* Assuming user is an object, not an array. If it's an array, adjust accordingly */}
            <strong>Username:</strong> {user.username}
          </div>
          <div className="centerme">
            <strong>Email:</strong> {user.email}
          </div>
          <br />

          <div className="centerme">
            <Link className="link" to="/edit">
              Edit/ChangePassword
            </Link>
          </div>
          <br />
          <br />
          <button onClick={logOut}>Sign Out</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;
