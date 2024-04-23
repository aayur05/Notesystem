import "../css/homepage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

const Homepage = () => {
  const cookie = new Cookies();
  const [user, setUser] = useState();
  const [name, setName] = useState();
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
        setName(response.data[0].username);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchData();
  }, [userId]);

  console.log(name);

  return (
    <div className="home-container">
      <h2>Welcome {name} to Create-Note</h2>
      <p>A web server where you can digitally record your important datas</p>
      <p>Feel free to explore and enjoy your stay!</p>
    </div>
  );
};

export default Homepage;
