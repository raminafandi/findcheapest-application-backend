const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

const app = express();

const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define Routes
app.use("/api", require("./routes/api/home"));
app.use("/api/auth", require("./routes/api/auth"));

app.listen(PORT, () => {
  console.log("App listening on port " + PORT);
});
