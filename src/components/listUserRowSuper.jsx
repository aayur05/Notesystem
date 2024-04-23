import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { Modal } from "@mui/material";
import ConformDelete from "./ConformDelete";

function ListUserRowSuper({ user, index }) {
  const cookie = new Cookies();
  const [userId, setUserId] = useState(null); // Initialize to null
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };
  const clickBtn = () => {
    setIsOpen(true);
  };
  useEffect(() => {
    const tokenData = cookie.get("token");

    if (!tokenData) return;
    const verifyToken = async () => {
      try {
        const response = await axios.post("/api/user/verifyToken", {
          token: tokenData,
        });
        // console.log(response);
        setUserId(response.data.userId);
      } catch (error) {
        console.error("Error verifying token:", error);
      }
    };

    verifyToken();
  }, [cookie]);

  const [active, setActive] = useState(user.active);
  const { email, id, role, username } = user;

  const saveUserAction = async () => {
    console.log(id + "+" + active);
    const response = await axios.put("/api/user/active/" + id, {
      active: active,
    });
    console.log(response);
  };

  return userId !== id ? (
    <>
      <tr key={id}>
        <td>{index + 1}</td>
        <td>{username}</td>
        <td>{email}</td>
        <td>{role}</td>
        <td>
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => {
              setActive(e.target.checked); // Use e.target.checked for checkbox state
              console.log(e.target.checked); // This will give you the correct checked state
            }}
          />
        </td>
        <td>
          {role === "admin" && <button onClick={clickBtn}>DELETE</button>}
          <button onClick={saveUserAction}>SAVE</button>{" "}
        </td>
      </tr>

      <Modal open={isOpen} onClose={handleClose}>
        <ConformDelete userId={id} />
      </Modal>
    </>
  ) : (
    ""
  );
}

export default ListUserRowSuper;
