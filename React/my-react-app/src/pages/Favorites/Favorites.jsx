import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "../../components/EventCard/EventCard";
import "./Favorites.css";

function Favorites() {
  const navigate = useNavigate();

  const [favoriteEvents, setFavoriteEvents] = useState([]);

  const loadFavorites = () => {
    const savedEvents = JSON.parse(
      localStorage.getItem("campusEvents") || "[]",
    );

    const savedFavorites = JSON.parse(
      localStorage.getItem("campusFavorites") || "[]",
    );

    const filteredEvents = savedEvents.filter((event) =>
      savedFavorites.includes(event.id),
    );

    setFavoriteEvents(filteredEvents);
  };

  useEffect(() => {
    const updateFavoriteCount = () => {
      const favorites = JSON.parse(
        localStorage.getItem("campusFavorites") || "[]",
      );

      setFavoriteCount(favorites.length);
    };

    updateFavoriteCount();

    // Listen for favorite changes
    window.addEventListener("favoritesUpdated", updateFavoriteCount);

    return () => {
      // Remove listener when component is unmounted
      window.removeEventListener("favoritesUpdated", updateFavoriteCount);
    };
  }, [location.pathname]);

  const handleFavorite = (id) => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("campusFavorites") || "[]",
    );

    const updatedFavorites = savedFavorites.filter(
      (favoriteId) => favoriteId !== id,
    );

    localStorage.setItem("campusFavorites", JSON.stringify(updatedFavorites));

    window.dispatchEvent(new Event("favoritesUpdated"));

    loadFavorites();
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?",
    );

    if (confirmDelete) {
      const savedEvents = JSON.parse(
        localStorage.getItem("campusEvents") || "[]",
      );

      const updatedEvents = savedEvents.filter((event) => event.id !== id);

      const savedFavorites = JSON.parse(
        localStorage.getItem("campusFavorites") || "[]",
      );

      const updatedFavorites = savedFavorites.filter(
        (favoriteId) => favoriteId !== id,
      );

      localStorage.setItem("campusEvents", JSON.stringify(updatedEvents));

      localStorage.setItem("campusFavorites", JSON.stringify(updatedFavorites));

      loadFavorites();
    }
  };

  const handleEdit = (event) => {
    navigate("/events", {
      state: { editEventId: event.id },
    });
  };

  return (
    <div className="favorites-page">
      <div className="favorites-container">
        <h2>Saved Events</h2>

        {favoriteEvents.length > 0 ? (
          <div className="favorites-grid">
            {favoriteEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                isFavorite={true}
                onFavorite={handleFavorite}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        ) : (
          <div className="empty-favorites">
            <h3>No Favorite Events Yet!</h3>
            <p>
              You haven't added any events to your favorites. Explore events and
              save the ones you like.
            </p>

            <button onClick={() => navigate("/events")}>Explore Events</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
