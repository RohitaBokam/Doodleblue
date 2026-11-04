import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [favoriteCount, setFavoriteCount] = useState(() => {
    return JSON.parse(localStorage.getItem("campusFavorites") || "[]").length;
  });

  const handleEventsClick = (e) => {
    e.preventDefault();

    if (location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        document.getElementById("events-section")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } else {
      document.getElementById("events-section")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    const updateFavoriteCount = () => {
      const favorites = JSON.parse(
        localStorage.getItem("campusFavorites") || "[]",
      );

      setFavoriteCount(favorites.length);
    };

    window.addEventListener("favoritesUpdated", updateFavoriteCount);

    updateFavoriteCount();

    return () => {
      window.removeEventListener("favoritesUpdated", updateFavoriteCount);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          CampusConnect
        </Link>

        <div className="navbar-links">
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            Home
          </Link>

          <Link
            to="/#events-section"
            onClick={handleEventsClick}
            className={
              location.pathname === "/" && location.hash === "#events-section"
                ? "active"
                : ""
            }
          >
            Events
          </Link>

          <Link
            to="/register"
            className={location.pathname === "/register" ? "active" : ""}
          >
            Register
          </Link>

          <div className="navbar-favorite-button">
            Favorites
            <span className="favorite-count">{favoriteCount}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
