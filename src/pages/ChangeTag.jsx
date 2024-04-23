import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/notepage.css";
import axios from "axios";
import Cookies from "universal-cookie";

function ChangeTag() {
  const cookie = new Cookies();
  const navigate = useNavigate();

  const { id } = useParams();
  const [tag, setTag] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
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

  useEffect(() => {
    const getInfo = async () => {
      try {
        const response = await axios.get("/api/notes/" + id);
        if (response.data.length === 0) {
          navigate("*");
        }

        setTitle(response.data.title);
        setTag(response.data.tag); // Set the tag value from the note
      } catch (error) {
        console.error("Error getting note:", error);
      }
    };

    getInfo();
  }, [id, navigate]);

  useEffect(() => {
    if (!userId) return;

    const getTags = async () => {
      try {
        const response = await axios.post("/api/tags/user", {
          id: userId,
        });
        setTags(response.data);
      } catch (error) {
        console.error("Error getting tags:", error);
      }
    };

    getTags();
  }, [userId]);

  const handleTagChange = (event) => {
    setTag(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!tag) {
      setError("Please select a tag");
      return;
    }

    try {
      const updateTag = await axios.put(`/api/notes/tag/${id}`, {
        tag: tag,
      });
      console.log(updateTag);
      navigate("/notes");
    } catch (error) {
      console.error("Error updating tag:", error);
    }
  };

  return (
    <>
      <form className="form2" onSubmit={handleSubmit}>
        <span className="error">
          {error && <p className="error">{error}</p>}
        </span>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={() => {}}
          disabled
        />
        <label htmlFor="tag">Select Tag</label>
        <select id="tag" value={tag} onChange={handleTagChange}>
          <option value="">Select a tag</option>
          <option value={1}>no tag</option>
          {tags.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.tag_name}
            </option>
          ))}
        </select>
        <br />
        <br />
        <button className="save" type="submit">
          SAVE
        </button>
      </form>
    </>
  );
}

export default ChangeTag;
