import { Routes, Route } from "react-router-dom";
import Homepage from "../pages/homepage";
import Profile from "../pages/profilepage";
import NotFoundPage from "../pages/NotFoundPage";
import CreateUser from "../pages/CreateUser";
import ListUser from "../pages/ListUser";
import EditUser from "../pages/EditUser";

function Admin() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/cuser" element={<CreateUser />} />
        <Route path="/luser" element={<ListUser />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit" element={<EditUser />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default Admin;
