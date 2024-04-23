import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/loginpage.css";
import Cookies from "universal-cookie";

import axios from "axios";

function LoginPage() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      if (email === "" || password === "") {
        console.log("email or Password empty");
        setError("email or Password empty");
        return;
      }
      const getUser = await axios.post("/api/user/email", { email: email });
      // console.log(getUser);
      if (getUser.data.length === 0) {
        console.log("User Not Found");
        setError("Email or Password is incorrect");
        return;
      }
      const user = getUser.data[0];
      const checkPassResponse = await axios.post("/api/user/compare", {
        password: password,
        checkPassword: user.password,
      });
      const isPasswordCorrect = checkPassResponse.data;
      console.log(user);
      if (
        email === getUser.data[0].email &&
        isPasswordCorrect &&
        getUser.data[0].active
      ) {
        const tokenResponse = await axios.post("/api/user/genToken", {
          userId: user.id,
          role: user.role,
        });
        console.log(tokenResponse);
        cookies.set("token", tokenResponse.data, { path: "/" }); // Ensure you set the correct path

        // console.log("enter");
        setError("");
        navigate("/");
      } else {
        setError("Email or Password is incorrect or Account is InActive");
        throw new Error("Email or Password is incorrect");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="center">
      <div className="login-container">
        <h2>Login Page</h2>
        <div className="form-group">
          <label htmlFor="email">email:</label>
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
        <button className="shrijan" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
