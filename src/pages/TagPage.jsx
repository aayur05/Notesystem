import axios from "axios";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import "../css/notepage.css";
import { Link } from "react-router-dom";
import TagCard from "../components/tagCard";

const NotePage = () => {
  const cookie = new Cookies();
  const [userId, setUserId] = useState(null);
  const [tags, setTags] = useState([]);

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
    const fetchNotes = async () => {
      if (!userId) return;
      try {
        const response = await axios.post("/api/tags/user", { id: userId });
        setTags(response.data);
        console.log(response);
      } catch (err) {
        console.log("Error fetching tags:", err);
      }
    };

    fetchNotes();
  }, [userId]);

  return (
    <>
      <div>
        <Link to={"new"}>
          <button className="new">NEW TAG</button>
        </Link>

        <div>
          {tags.length > 0 ? (
            tags.map((tag) => <TagCard key={tag.id} card={tag} />)
          ) : (
            <div className="back">
              <h3 className="No-data">NO NOTES FOUND</h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NotePage;
