import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const logout = () => {
    localStorage.removeItem("signUp");
    window.location.reload();
  };

  const deleteAccount = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">Your App</div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
        </li>
        <li className="nav-item">
          <button onClick={logout} className="nav-link logout">
            Log Out
          </button>
        </li>
        <li className="nav-item">
          <button onClick={deleteAccount} className="nav-link delete">
            Delete Account
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
