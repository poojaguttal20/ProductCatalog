import { Link, useLocation } from "react-router-dom";
// import logo from '../assets/Logo1.png';
import "./Navbar.css";

export default function Navbar({ logo, links, user, onLogout }) {
  const location = useLocation();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          {/* <img src={logo} alt="werty logo" style={{width: '100px', height: '50px', marginRight:'20px'}} /> */}
          <h1 className="title">{logo}</h1>
        </Link>
        <ul
          className="navbar-nav ml-auto"
          style={{ display: "flex", alignItems: "center" }}
        >
          {user &&
            (location.pathname === "/admin" ||
              location.pathname === "/user") && (
              <li className="nav-item">
                <span className="nav-link">{user.email}</span>
                <button
                  className="btn btn-block button-style"
                  onClick={onLogout}
                >
                  Logout
                </button>
              </li>
            )}

          {(location.pathname === "/" ||
            location.pathname === "/signup" ||
            location.pathname === "/login") &&
            links.map((link) => (
              <li className="nav-item" key={link.label}>
                <Link
                  className="nav-link"
                  activeclassname="active"
                  to={link.to}
                >
                  {link.label}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </nav>
  );
}
