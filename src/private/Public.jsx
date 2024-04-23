import { Routes, Route } from "react-router-dom";
import Homepage from "../pages/homepage";
import LoginPage from "../pages/loginpage";
import Register from "../pages/registerpage";
import Profile from "../pages/profilepage";
import NotFoundPage from "../pages/NotFoundPage";

function Public() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default Public;
