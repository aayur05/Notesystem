import "../css/navbar.css";
import { Link } from "react-router-dom";
function Navbar2() {
  return (
    <>
      <div>
        <nav>
          <div className="navel">
            <ul className="navbar">
              <li className="logo">
                <img
                  src="./../src/assets/logo.png"
                  alt="logo"
                  className="logo"
                />
              </li>
              <span className="list">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/cuser">Create User</Link>
                </li>
                <li>
                  <Link to="/luser">List User</Link>
                </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
              </span>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar2;
