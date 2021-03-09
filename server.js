const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded()); //Parse URL-encoded bodies
// Define Routes
app.use("/api", require("./routes/api/home"));
app.use("/api/products", require("./routes/api/product"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/admin",require("./routes/api/admin"));

app.listen(PORT, () => {
  console.log("App listening on port " + PORT);
});
