import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
dotenv.config()

connectDB()

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);


app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
    
})
