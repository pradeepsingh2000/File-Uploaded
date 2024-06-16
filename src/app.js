const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const router = require("./routes/index");
const  logger  = require("./services/winston.service");
const { seedData } = require("./db/seed");
require('./db/connection');
const path = require('path');

const app = express();
// Middleware
app.use(express.json());
app.use(express.raw({ type: "application/json" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use('/api/public/uploads', express.static(path.join(__dirname, '..', 'public', 'uploads')));

router(app);


// Get the unhandled rejection and throw it to another fallback handler we already have.
process.on("unhandledRejection", (reason, promise) => {
    logger.error(typeof error === "Array" ? JSON.stringify(error) : "UnCaught Exception");
});

process.on("uncaughtException", (error) => {
    logger.error(typeof error === "Array" ? JSON.stringify(error) : "UnCaught Exception");
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
  seedData();
});
