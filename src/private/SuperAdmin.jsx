import { Routes, Route } from "react-router-dom";
import Homepage from "../pages/homepage";
import Profile from "../pages/profilepage";
import NotFoundPage from "../pages/NotFoundPage";
import CreateUserSuper from "../pages/CreateUserSuper";
import ListUserSuper from "../pages/ListUserSuper";
import EditUser from "../pages/EditUser";

function SuperAdmin() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/cuser" element={<CreateUserSuper />} />
        <Route path="/luser" element={<ListUserSuper />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit" element={<EditUser />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default SuperAdmin;
