const express = require("express");
const notes = require("./data/notes");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT || 5000;

const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDb database connection established successfully");
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const note = notes.find((n) => n._id === req.params.id);

  res.send(note);
});

app.listen(PORT, console.log(`server started on PORT ${PORT}`));
