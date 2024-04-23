import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/notepage.css";
import axios from "axios";
import Cookies from "universal-cookie";

function CreateTag() {
  const cookie = new Cookies();
  const navigate = useNavigate();

  const [tag, setTag] = useState("");
  const [error, setError] = useState("");
  const [color, setColor] = useState("");
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
  const handleTagNameChange = (event) => {
    setTag(event.target.value);
  };
  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (!tag) {
      setError("Fill Up everything");
      return;
    }
    console.log(color);
    const createTag = await axios.post("/api/tags", {
      tag_name: tag,
      users: userId,
      color: color,
    });
    console.log(createTag);
    navigate("/tag");
  };

  return (
    <>
      <form className="form2" onSubmit={handleSubmit}>
        <span className="error">
          {error && <p className="error">{error}</p>}
        </span>
        <label htmlFor="color"></label>
        <input
          className="color"
          type="color"
          id="color"
          value={color}
          onChange={handleColorChange}
        />
        <label htmlFor="tag">Tag Name</label>
        <input
          type="text"
          id="tag"
          value={tag}
          onChange={handleTagNameChange}
        />
        <br />
        <br />
        <button className="save" type="submit">
          SAVE
        </button>
      </form>
    </>
  );
}

export default CreateTag;
