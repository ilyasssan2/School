const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyparser = require("body-parser");
const middlewars = require("./middlewares");
require("dotenv").config();

const Notification = require("./routes/Notify__routes");
const Student = require("./routes/Student__routes");
const app = express();
app.use(bodyparser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.get("/", (req, res, next) => {
  res.send("<h1> hello world </h1>");
});

/*--------------routes------------------------*/
app.use("/api/notification", Notification);
app.use("/api/student", Student);

/*------------middlewares--------- */

app.use(middlewars.NoteFound);
app.use(middlewars.CatchErrors);

mongoose.connect(process.env.MONGO__URL);
mongoose.connection.once("open", () => {
  console.log("connected to the Mongo db : ", mongoose.connection.port);
});
app.listen(process.env.PORT, () => {
  console.log("server running");
});
