import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-about">
          <h2>CampusConnect</h2>
          <p>Discover events.Meet people.Make memories</p>
          <p>© 2026 CampusConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
