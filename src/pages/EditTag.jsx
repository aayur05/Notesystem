import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/notepage.css";
import axios from "axios";

function EditTag() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [tag, setTag] = useState("");
  const [color, setColor] = useState("#fff");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/tags/" + id);
        if (response.data.length === 0) {
          navigate("/tag");
          return;
        }
        setTag(response.data.tag_name);
        setColor(response.data.color);
      } catch (error) {
        console.error("Error fetching tag:", error);
      }
    };

    fetchData();
  }, [id, navigate]);

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
    try {
      const editTag = await axios.put("/api/tags/" + id, {
        tag_name: tag,
        color: color, // Include color in the request body
      });
      console.log(editTag);
      navigate("/tag");
    } catch (error) {
      console.error("Error editing tag:", error);
    }
  };

  return (
    <>
      <form className="form2" onSubmit={handleSubmit}>
        <span className="error">
          {error && <p className="error">{error}</p>}
        </span>
        <label htmlFor="color">Color</label>
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

export default EditTag;
