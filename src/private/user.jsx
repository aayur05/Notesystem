import { Routes, Route } from "react-router-dom";
import Homepage from "../pages/homepage";
import Profile from "../pages/profilepage";
import NotePage from "../pages/NotePage";
import NewNote from "../pages/NewNote";
import CreateTag from "../pages/CreateTag";
import NoteDetail from "../pages/NoteDetail";
import EditTag from "../pages/EditTag";
import TagPage from "../pages/TagPage";
import EditUser from "../pages/EditUser";
import NotFoundPage from "../pages/NotFoundPage";
import ChangeTag from "../pages/ChangeTag";

function User() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/notes" element={<NotePage />} />
        <Route path="/notes/new" element={<NewNote />} />
        <Route path="/notes/tag/:id" element={<ChangeTag />} />
        <Route path="/note/:id" element={<NoteDetail />} />
        <Route path="/tag" element={<TagPage />} />
        <Route path="/tag/new" element={<CreateTag />} />
        <Route path="/tag/:id" element={<EditTag />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit" element={<EditUser />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default User;
