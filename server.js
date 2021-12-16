const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const { readdirSync } = require("fs"); //destructring
const { UserSchema } = require("./models/user");

require("dotenv").config();
//app
const app = express();
//import
// const authRoute = require("./routes/auth");
//database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => {
    console.log(`DB connection is successfully connected`);
  })
  .catch((err) => console.log(`DB connection err are ${err}`));
//middlewares
app.use(bodyParser.json({ limit: "2mb" })); // here the data sent by kind
// will converterd to json and limit stands not more than 2mb
app.use(morgan("dev"));
app.use(cors());
//routes middlewares
// app.use("/api", authRoute); //here api is prefix like /api/other routes
readdirSync("./routes").map(
  (r) => app.use("/api", require("./routes/" + r))
  //now prefix is also done and we have to use middleware to use it
);
//it will read all the files from routes folder and .map() will help to require every route so we
//dont need app.use every time

//PORT
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("server is successfully running on", port);
});
