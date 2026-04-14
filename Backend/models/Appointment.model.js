import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["booked", "cancelled"],
      default: "booked",
    },
},{timestamps:true})

appointmentSchema.index({ date: 1, time: 1 }, { unique: true });
const Appointment = mongoose.model("Appointment",appointmentSchema)

export default Appointment