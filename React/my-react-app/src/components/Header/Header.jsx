import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();

  const handleExploreEvents = () => {
    const eventsSection = document.getElementById("events-section");

    if (eventsSection) {
      eventsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      navigate("/#events-section");
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        <span className="hero-subtitle">YOUR CAMPUS, YOUR COMMUNITY</span>

        <h1>
          Make Your Campus
          <br />
          <span>Experience Count.</span>
        </h1>

        <p>
          Discover exciting events, meet new people, and make the most of your
          <br />
          college life.
        </p>

        <div className="hero-buttons">
          <button
            className="hero-btn primary-btn"
            onClick={handleExploreEvents}
          >
            Explore Events
          </button>

          <button
            className="hero-btn secondary-btn"
            onClick={() => navigate("/register")}
          >
            Register for an Event
          </button>
        </div>
      </div>
    </section>
  );
}

export default Header;
