import { useState, useEffect } from "react";
import axios from "axios";
import ListUserRowSuper from "../components/listUserRowSuper";

const ListUserSuper = () => {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/user");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  });
  useEffect(() => {
    const fetchInterval = setInterval(() => {
      fetchData();
    }, 1000);

    // Clean up the interval to prevent memory leaks
    return () => clearInterval(fetchInterval);
  }, []);

  return (
    <div>
      <h1>List Users</h1>
      <table>
        <thead>
          <tr>
            <th>S.N</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <ListUserRowSuper key={user.id} user={user} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListUserSuper;
