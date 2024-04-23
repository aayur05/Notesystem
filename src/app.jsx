import Role from "./private/role";
import axios from "axios";
import Cookies from "universal-cookie";
import { useState, useEffect } from "react";

import Navbar from "./components/navbar";
import Navbar1 from "./components/navbar-login";
import Navbar2 from "./components/navbar-admin";

import Public from "./private/Public";
import Admin from "./private/admin";
import SuperAdmin from "./private/SuperAdmin";
import User from "./private/user";
import NotFoundPage from "./pages/NotFoundPage";
function App() {
  const cookie = new Cookies();
  const [user, setUser] = useState("Public");

  useEffect(() => {
    let isMounted = true;
    const verifyUser = async () => {
      const token = cookie.get("token");
      if (token) {
        try {
          const response = await axios.post("/api/user/verifyToken", {
            token: token,
          });
          if (isMounted) {
            // console.log(response);
            // console.log();
            const string = response.data.role;
            const role = string.charAt(0).toUpperCase() + string.slice(1);
            // console.log(role);
            setUser(role || "Public");
          }
        } catch (error) {
          console.error("Error verifying token:", error);
          if (isMounted) setUser("Public");
        }
      } else {
        if (isMounted) setUser("Public");
      }
    };

    verifyUser();
    const intervalId = setInterval(verifyUser, 1000);
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);
  return user === Role.Public ? (
    <>
      <Navbar />
      <Public />
    </>
  ) : user === Role.User ? (
    <>
      <Navbar1 />
      <User />
    </>
  ) : user === Role.Admin ? (
    <>
      <Navbar2 />
      <Admin />
    </>
  ) : user === Role.Super ? (
    <>
      <Navbar2 />
      <SuperAdmin />
    </>
  ) : (
    <NotFoundPage />
  );
}

export default App;
