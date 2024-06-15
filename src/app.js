import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//import router
import userRouter from "./routes/user.routes.js"
import stationRouter from "./routes/station.routes.js"
import commodityRouter from "./routes/commodity.routes.js"
import trainRouter from "./routes/train.routes.js"
import bookingRouter from "./routes/booking.routes.js"


//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/stations", stationRouter)
app.use("/api/v1/commodities", commodityRouter)
app.use("/api/v1/trains", trainRouter)
app.use("/api/v1/bookings", bookingRouter)

export {app}