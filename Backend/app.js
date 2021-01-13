const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyparser = require("body-parser");
const middlewars = require("./middlewares");
require("dotenv").config();

const Admin = require("./routes/Admin__routes");
const Notification = require("./routes/Notify__routes");
const Student = require("./routes/Student__routes");
const Group = require("./routes/group__routes");
const Filier = require("./routes/Filier__routes");

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
app.use("/api/group", Group);
app.use("/api/filier", Filier);
app.use("/api/admin", Admin);
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
