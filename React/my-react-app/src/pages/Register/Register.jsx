import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Register.css";

function Register() {
  const location = useLocation();

  const [events, setEvents] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    year: "",
    password: "",
    attendance: "In Person",
    eventId: location.state?.eventId || "",
    accessibility: false,
    message: "",
  });

  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    const savedEvents = JSON.parse(
      localStorage.getItem("campusEvents") || "[]",
    );

    setEvents(savedEvents);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingRegistrations = JSON.parse(
      localStorage.getItem("campusRegistrations") || "[]",
    );

    const newRegistration = {
      ...formData,
      id: Date.now().toString(),
      registeredAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "campusRegistrations",
      JSON.stringify([...existingRegistrations, newRegistration]),
    );

    // Save submitted details for the success message
    setSubmittedData(newRegistration);

    // Reset the form
    setFormData({
      name: "",
      email: "",
      department: "",
      year: "",
      password: "",
      attendance: "In Person",
      eventId: "",
      accessibility: false,
      message: "",
    });
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      department: "",
      year: "",
      password: "",
      attendance: "In Person",
      eventId: "",
      accessibility: false,
      message: "",
    });

    setSubmittedData(null);
  };

  const selectedEvent = events.find(
    (event) => event.id === submittedData?.eventId,
  );

  return (
    <div className="register-page">
      <div className="register-container">
        <form className="registration-form" onSubmit={handleSubmit}>
          <h2>Registration Form</h2>

          <div className="register-grid">
            <div className="register-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="register-group">
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="register-group">
              <label>Department *</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              >
                <option value="">Select Department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Cyber Security">Cyber Security</option>
                <option value="Information Technology">
                  Information Technology
                </option>
                <option value="Electronics">Electronics</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="register-group">
              <label>Year of Study *</label>
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
              >
                <option value="">Select Year</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>

            <div className="register-group">
              <label>Password (Optional)</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter a demo password"
              />
            </div>

            <div className="register-group">
              <label>Select Event *</label>
              <select
                name="eventId"
                value={formData.eventId}
                onChange={handleChange}
                required
              >
                <option value="">Choose an Event</option>

                {events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="register-group full-width">
              <label>Attendance Mode *</label>

              <div className="attendance-options">
                <label>
                  <input
                    type="radio"
                    name="attendance"
                    value="In Person"
                    checked={formData.attendance === "In Person"}
                    onChange={handleChange}
                  />
                  In Person
                </label>

                <label>
                  <input
                    type="radio"
                    name="attendance"
                    value="Online"
                    checked={formData.attendance === "Online"}
                    onChange={handleChange}
                  />
                  Online
                </label>
              </div>
            </div>

            <div className="register-group full-width">
              <label className="accessibility-option">
                <input
                  type="checkbox"
                  name="accessibility"
                  checked={formData.accessibility}
                  onChange={handleChange}
                />
                I require accessibility assistance.
              </label>
            </div>

            <div className="register-group full-width">
              <label>Additional Message (Optional)</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter any additional information"
                rows="4"
              />
            </div>
          </div>

          <div className="register-buttons">
            <button type="submit" className="submit-register-btn">
              Submit Registration
            </button>

            <button
              type="button"
              className="reset-register-btn"
              onClick={handleReset}
            >
              Reset Form
            </button>
          </div>
        </form>

        {/* Success Message Below the Form */}

        {submittedData && (
          <div className="registration-success">
            <h3>Registration complete!</h3>

            <p>
              This is a local demonstration. Your details have not been sent to
              a server.
            </p>

            <ul>
              <li>
                <strong>Student:</strong> {submittedData.name}
              </li>

              <li>
                <strong>Email:</strong> {submittedData.email}
              </li>

              <li>
                <strong>Department:</strong> {submittedData.department}
              </li>

              <li>
                <strong>Event:</strong>{" "}
                {selectedEvent?.title || "Event not found"}
              </li>

              <li>
                <strong>Attendance:</strong> {submittedData.attendance}
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Register;
