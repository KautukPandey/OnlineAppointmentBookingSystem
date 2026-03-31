import Appointment from "../models/Appointment.model.js";

const bookAppointment = async (req, res) => {
  try {
    const { date, time } = req.body;

    if (!date || !time) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingAppointment = await Appointment.findOne({
      date,
      time,
    });

    if (existingAppointment) {
      return res.status(400).json({ message: "Slot already booked" });
    }

    const appointment = await Appointment.create({
      user: req.user._id,
      date,
      time,
    });

    return res.status(201).json({
      message: "Appointment booked",
      appointment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      user: req.user._id,
    });
    return res.status(200).json({ message: "All appointments", appointments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    if (appointment.status === "cancelled") {
        return res.status(400).json({ message: "Already cancelled" });
    }
    if (appointment.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    appointment.status = "cancelled";
    await appointment.save();

    return res.status(200).json({ message: "Appointment cancelled" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
