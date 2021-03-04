const express = require("express");
const app = express();
const port = 3000;

// Init Middleware
app.use(express.json());

// Define Routes
app.use("/api", require("./routes/api/home"));
app.use("/api/auth", require("./routes/api/auth"));
// app.use("/api/users", require("./routes/api/users"));
// app.use("/api/profile", require("./routes/api/profile"));
// app.use("/api/posts", require("./routes/api/posts"));

// app.get("/", (req, res) => {
//   res.send("it works");
// });

app.listen(port, () => {
  console.log("App listening on port " + port);
});
