import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/notepage.css";
import axios from "axios";
import Cookies from "universal-cookie";

function NewNote() {
  const cookie = new Cookies();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      const token = cookie.get("token");
      if (token) {
        try {
          const response = await axios.post("/api/user/verifyToken", {
            token: token,
          });
          setUserId(response.data.userId);
        } catch (error) {
          console.error("Error verifying token:", error);
        }
      }
    };

    verifyUser();
  }, [cookie]);
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (!title || !content) {
      setError("Fill Up everything");
      return;
    }
    const createNote = await axios.post("/api/notes", {
      title: title,
      content: content,
      users: userId,
    });
    // console.log(createNote);
    navigate("/notes");
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <span className="error">
          {error && <p className="error">{error}</p>}
        </span>

        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
        />
        <label htmlFor="content">Content</label>
        <textarea
          className="content"
          id="content"
          value={content}
          onChange={handleContentChange}
        />
        <button className="save" type="submit">
          SAVE
        </button>
      </form>
    </>
  );
}

export default NewNote;
