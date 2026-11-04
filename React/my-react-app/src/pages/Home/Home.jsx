import React from "react";
import Header from "../../components/Header/Header";
import Events from "../Events/Events";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      <section id="home">
        <Header />
      </section>

      <section id="events-section">
        <Events />
      </section>
    </div>
  );
}

export default Home;
