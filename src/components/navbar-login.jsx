import "../css/navbar.css";
import { Link } from "react-router-dom";
function Navbar({names}) {
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
                  <Link to="/notes">MyNotes</Link>
                </li>
                <li>
                  <Link to="/tag">MyTags</Link>
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

export default Navbar;
