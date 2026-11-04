import React from "react";
import { useNavigate } from "react-router-dom";
import "./EventCard.css";

function EventCard({ event, isFavorite, onFavorite, onDelete, onEdit }) {
  const navigate = useNavigate();

  const registrations = JSON.parse(
    localStorage.getItem("campusRegistrations") || "[]",
  );

  const registrationCount = registrations.filter(
    (registration) => registration.eventId === event.id,
  ).length;

  return (
    <div className="event-card">
      <div className="event-card-category">{event.category}</div>

      <div className="event-card-content">
        <span className="event-category-label">{event.category}</span>

        <h3>{event.title}</h3>

        <p className="event-description">{event.description}</p>

        <div className="event-info">
          <p>
            <strong>Date:</strong> {event.date}
          </p>
          <p>
            <strong>Venue:</strong> {event.venue}
          </p>
          <p>
            <strong>Registrations:</strong> {registrationCount}
          </p>
          <p>
            <strong>Event ID:</strong> {event.id}
          </p>
        </div>

        <div className="event-primary-actions">
          <button
            className="register-btn"
            onClick={() =>
              navigate("/register", {
                state: { eventId: event.id },
              })
            }
          >
            Register
          </button>

          <button
            className={isFavorite ? "favorite-delete-btn" : "favorite-btn"}
            onClick={() => onFavorite(event.id)}
          >
            {isFavorite ? "Remove Favorite" : "Add Favorite"}
          </button>
        </div>

        <div className="event-secondary-actions">
          <button
            className="view-btn"
            onClick={() => navigate(`/events/${event.id}`)}
          >
            View Details
          </button>

          <button className="edit-btn" onClick={() => onEdit(event)}>
            Edit Event
          </button>

          <button className="delete-btn" onClick={() => onDelete(event.id)}>
            Delete Event
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
