import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EventDetails.css";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);

  const [favorites, setFavorites] = useState(() =>
    JSON.parse(localStorage.getItem("campusFavorites") || "[]"),
  );

  useEffect(() => {
    const savedEvents = JSON.parse(
      localStorage.getItem("campusEvents") || "[]",
    );

    const selectedEvent = savedEvents.find((item) => item.id === id);

    setEvent(selectedEvent || null);
  }, [id]);

  const handleFavorite = () => {
    const updatedFavorites = favorites.includes(id)
      ? favorites.filter((favoriteId) => favoriteId !== id)
      : [...favorites, id];

    setFavorites(updatedFavorites);

    localStorage.setItem("campusFavorites", JSON.stringify(updatedFavorites));

    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  if (!event) {
    return (
      <div className="event-not-found">
        <h2>Event Not Found</h2>
        <p>The event you are looking for does not exist.</p>

        <button onClick={() => navigate("/")}>Back to Events</button>
      </div>
    );
  }

  const isFavorite = favorites.includes(id);

  return (
    <div className="event-details-page">
      <div className="details-container">
        {/* Back Button Above Card */}
        <button
          className="details-back-top-btn"
          onClick={() => navigate("/#events-section")}
        >
          ← Back to Events
        </button>

        {/* Event Details Card */}
        <div className="details-card">
          <span className="details-category">{event.category}</span>

          <h2>{event.title}</h2>

          <p className="details-description">{event.description}</p>

          <div className="details-information">
            <div className="detail-item">
              <h3>Date</h3>
              <p>{event.date}</p>
            </div>

            <div className="detail-item">
              <h3>Venue</h3>
              <p>{event.venue}</p>
            </div>

            <div className="detail-item">
              <h3>Category</h3>
              <p>{event.category}</p>
            </div>
          </div>

          <div className="details-actions">
            <button
              className="details-register-btn"
              onClick={() =>
                navigate("/register", {
                  state: { eventId: event.id },
                })
              }
            >
              Register for Event
            </button>

            <button className="details-favorite-btn" onClick={handleFavorite}>
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
