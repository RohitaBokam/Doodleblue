import React, { useState, useEffect } from "react";
import EventCard from "../../components/EventCard/EventCard";
import "./Events.css";

const initialEvents = [
  {
    id: "1",
    title: "Technical Symposium",
    category: "Technical",
    description:
      "Participate in technical competitions, coding challenges and workshops.",
    date: "2026-11-15",
    venue: "Main Auditorium",
  },
  {
    id: "2",
    title: "Cultural Fest",
    category: "Cultural",
    description:
      "Enjoy music, dance, performances and exciting cultural activities.",
    date: "2026-11-20",
    venue: "College Ground",
  },
  {
    id: "3",
    title: "Sports Meet",
    category: "Sports",
    description:
      "Show your sports skills and participate in various competitions.",
    date: "2026-11-25",
    venue: "Sports Complex",
  },
];

const emptyForm = {
  title: "",
  category: "Technical",
  description: "",
  date: "",
  venue: "",
};

function Events() {
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem("campusEvents");
    return savedEvents ? JSON.parse(savedEvents) : initialEvents;
  });

  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("campusFavorites") || "[]");
  });

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  // Save events to localStorage
  useEffect(() => {
    localStorage.setItem("campusEvents", JSON.stringify(events));
  }, [events]);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("campusFavorites", JSON.stringify(favorites));
  }, [favorites]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // Add or update an event
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      setEvents((previousEvents) =>
        previousEvents.map((event) =>
          event.id === editingId ? { ...formData, id: editingId } : event,
        ),
      );
    } else {
      const newEvent = {
        ...formData,
        id: Date.now().toString(),
      };

      setEvents((previousEvents) => [...previousEvents, newEvent]);
    }

    setFormData(emptyForm);
    setEditingId(null);
  };

  // Edit an existing event
  const handleEdit = (event) => {
    setFormData({
      title: event.title,
      category: event.category,
      description: event.description,
      date: event.date,
      venue: event.venue,
    });

    setEditingId(event.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Delete an event
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?",
    );

    if (confirmDelete) {
      setEvents((previousEvents) =>
        previousEvents.filter((event) => event.id !== id),
      );

      setFavorites((previousFavorites) => {
        const updatedFavorites = previousFavorites.filter(
          (favoriteId) => favoriteId !== id,
        );

        localStorage.setItem(
          "campusFavorites",
          JSON.stringify(updatedFavorites),
        );

        window.dispatchEvent(new Event("favoritesUpdated"));

        return updatedFavorites;
      });

      if (editingId === id) {
        setEditingId(null);
        setFormData(emptyForm);
      }
    }
  };

  // Add or remove favorites
  const handleFavorite = (id) => {
    setFavorites((previousFavorites) => {
      const updatedFavorites = previousFavorites.includes(id)
        ? previousFavorites.filter((favoriteId) => favoriteId !== id)
        : [...previousFavorites, id];

      localStorage.setItem("campusFavorites", JSON.stringify(updatedFavorites));

      window.dispatchEvent(new Event("favoritesUpdated"));

      return updatedFavorites;
    });
  };

  // Search and category filtering
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = category === "All" || event.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="events-page">
      <div className="events-container">
        {/* Events Heading */}
        <div className="events-top-bar">
          <span className="events-subtitle">DISCOVER YOUR CAMPUS</span>

          <h2>Upcoming Events</h2>

          <p>Find opportunities to learn, connect, and participate.</p>
        </div>

        {/* Add New Event Form */}
        <form className="event-form" onSubmit={handleSubmit}>
          <h2>{editingId ? "Edit Event" : "Add a New Event"}</h2>

          <p>Fill in the event details below.</p>

          <div className="form-grid">
            <div className="form-group">
              <label>Event Title *</label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g. React Workshop"
                required
              />
            </div>

            <div className="form-group">
              <label>Category *</label>

              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="Technical">Technical</option>
                <option value="Cultural">Cultural</option>
                <option value="Sports">Sports</option>
                <option value="Workshop">Workshop</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Date *</label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Venue *</label>

              <input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleInputChange}
                placeholder="e.g. Seminar Hall"
                required
              />
            </div>

            <div className="form-group full-width">
              <label>Description *</label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the event"
                rows="3"
                required
              />
            </div>
          </div>

          <div className="form-buttons">
            <button type="submit" className="save-event-btn">
              {editingId ? "Update Event" : "Add Event"}
            </button>

            {editingId && (
              <button
                type="button"
                className="cancel-event-btn"
                onClick={() => {
                  setEditingId(null);
                  setFormData(emptyForm);
                }}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        {/* Search and Category Filter */}
        <div className="event-filters">
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Technical">Technical</option>
            <option value="Cultural">Cultural</option>
            <option value="Sports">Sports</option>
            <option value="Workshop">Workshop</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Event Cards */}
        <div className="events-grid">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                isFavorite={favorites.includes(event.id)}
                onFavorite={handleFavorite}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))
          ) : (
            <p className="no-events">No events found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Events;
