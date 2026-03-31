import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Fetch appointments
  const getAppointments = async () => {
    const res = await axios.get("http://localhost:5000/api/appointments");
    setAppointments(res.data);
  };

  useEffect(() => {
    getAppointments();
  }, []);

  // Booking
  const handleBooking = async () => {
    await axios.post("http://localhost:5000/api/appointments", {
      date,
      time,
    });

    alert("Booked");
    getAppointments();
  };

  // Cancel
  const handleCancel = async (id) => {
    await axios.delete(`http://localhost:5000/api/appointments/${id}`);
    alert("Cancelled");
    getAppointments();
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <h3>Book Appointment</h3>
      <input type="date" onChange={(e) => setDate(e.target.value)} />
      <input type="time" onChange={(e) => setTime(e.target.value)} />
      <button onClick={handleBooking}>Book</button>

      <h3>Appointments</h3>
      {appointments.map((item) => (
        <div key={item._id}>
          <p>{item.date} - {item.time}</p>
          <button onClick={() => handleCancel(item._id)}>Cancel</button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;