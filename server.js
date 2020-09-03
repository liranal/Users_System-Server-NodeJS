require("./database/db");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 40040;

// Global Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json());

// Routes
app.use("/Users", require("./routes/UsersRouter"));

//Default Route
app.use("/", (req, res) => {
  res.json({ Message: "Default Route", Data: req.body });
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
