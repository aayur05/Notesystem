import "../css/navbar.css";
import { Link } from "react-router-dom";
function Navbar1() {
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
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </span>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar1;
