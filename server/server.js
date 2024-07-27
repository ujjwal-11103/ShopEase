import express from "express"
import colors from "colors"

import dotenv from "dotenv"
import morgan from "morgan";

import connectDB from "./config/db.js";
import authRoute from "./Routes/authRoute.js";
import categoryRoute from "./Routes/categoryRoute.js";
import productRoute from "./Routes/productRoute.js"

import cors from 'cors'

// Production
import path from "path"
import { fileURLToPath } from "url"


// config dotenv
dotenv.config();

// DB config
connectDB();

//rest object
const app = express();

// middleware
app.use(express.json())
app.use(morgan('dev'))

//production
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname, '../client/build',)))
app.use("*", function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html',))
})



// cors 
app.use(cors())

// routes
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/category', categoryRoute)
app.use('/api/v1/product', productRoute)


// rest APi
app.get('/', (req, res) => {
    res.send(`Connected to server succesfully on ${process.env.Dev_mode} mode`);
})


// PORT
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on ${process.env.Dev_mode} on port = ${PORT}`.bgCyan.white);
})