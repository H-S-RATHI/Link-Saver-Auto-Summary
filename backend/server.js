import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan"
import connectDB from "./config/db.js"
import { errorHandler, notFound } from "./middleware/errorMiddleware.js"

// Routes
import userRoutes from "./routes/userRoutes.js"
import bookmarkRoutes from "./routes/bookmarkRoutes.js"

// Load environment variables
dotenv.config()

// Connect to MongoDB
connectDB()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

// Routes
app.use("/api/auth", userRoutes)
app.use("/api/bookmarks", bookmarkRoutes)

// Error handling middleware
app.use(notFound)
app.use(errorHandler)

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
