import express from "express"
import colors from "colors"
import dotenv from "dotenv"
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./Routes/authRoute.js";
import cors from 'cors'

// config dotenv
dotenv.config();

// DB config
connectDB();

//rest object
const app = express();

// middleware
app.use(express.json())
app.use(morgan('dev'))

// cors 
app.use(cors())

// routes
app.use('/api/v1/auth', authRoute)


// rest APi
app.get('/', (req, res) => {
    res.send(`Connected to server succesfully on ${process.env.Dev_mode} mode`);
})


// PORT
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on ${process.env.Dev_mode} on port = ${PORT}`.bgCyan.white);
})