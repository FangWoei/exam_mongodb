const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(express.json());

// instruction: setup cors
const corsHandler = cors({
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
  preflightContinue: true,
});

app.use(corsHandler);

// instruction: setup MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/book")
  .then(() => console.log("MongoDBConnected... "))
  .catch((err) => console.log(err));

// instruction: setup routes

const bookRouter = require("./routes/books");
const authorRouter = require("./routes/authors");

app.use("/books", bookRouter);
app.use("/authors", authorRouter);

app.get("/", (req, res) => {
  res.send("Good luck with the exam!");
});

// Server listening
app.listen(port, () => console.log(`Server started on port ${port}`));
