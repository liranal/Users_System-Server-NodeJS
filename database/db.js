const mongoose = require("mongoose");
//Set up default mongoose connection
const mongoDB = "mongodb://localhost:27017/UsersDB";
mongoose.connect(mongoDB, { useNewUrlParser: true });
//Get the default connection
const db = mongoose.connection;
db.once("open", () => console.log("Database opened..."));
db.on("error", () => console.log("Error occured.."));
