const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/userroutes");
const taskRoutes = require("./routes/taskroutes");
// const priorityRoutes = require("./routes/priorityroutes");
// const categoryRouter = require("./routes/categoryroutes");

const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.once("open", () => {
  console.log("connected to MongoDB database");
});

app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/task", taskRoutes);
// app.use("/api/priority", priorityRoutes);
// app.use("/api/category", categoryRouter);


app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
