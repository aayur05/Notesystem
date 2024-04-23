import axios from "axios";
function ConformDelete(id) {
  const deleteUser = async () => {
    console.log(id.userId);
    try {
      const response = await axios.delete("/api/user/" + id.userId);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  const No = () => {
    window.location.reload();
  };
  return (
    <>
      <div>
        <p>Are You Sure?</p>
        <button onClick={deleteUser}>YES</button>
        <button onClick={No}>NO</button>
      </div>
    </>
  );
}

export default ConformDelete;
