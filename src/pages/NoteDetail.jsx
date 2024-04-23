import { useState, useEffect } from "react";
import "../css/notepage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const NoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState();
  const [remind, setRemind] = useState(false); // Default to false
  const [tagName, setTagName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const getNote = async () => {
      try {
        const response = await axios.get("/api/notes/" + id);
        if (response.data.length === 0) {
          navigate("/*");
        }
        setTitle(response.data.title);
        setContent(response.data.content);
        if (response.data.tag === 1) {
          setTagName("");
        } else {
          setTagName(response.data.tag_name);
          setColor(response.data.color);
        }
        // Set the remind checkbox based on the fetched data
        setRemind(response.data.remind);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getNote();
  }, [id, navigate]);

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
    const editNote = await axios.put("/api/notes/" + id, {
      title: title,
      content: content,
      remind: remind,
    });
    console.log(editNote);
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
        <br />
        <label htmlFor="tag">Tag:</label>
        <div style={{ display: "flex" }}>
          <div
            className="colorBox"
            style={{
              backgroundColor: color,
              width: "50px",
              height: "20px",
              marginRight: "10px",
            }}
          ></div>
          {tagName}
        </div>
        <div>
          Remind Me
          <br />
          <input
            type="checkbox"
            checked={remind}
            name="remind"
            id="remind"
            onChange={(e) => {
              setRemind(e.target.checked);
            }}
          />
        </div>
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
};

export default NoteDetail;
