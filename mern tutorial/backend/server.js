require("dotenv").config();
const cors = require('cors')

const express = require("express");

const mongoose = require("mongoose");
const workoutRoutes = require("../backend/routes/workouts");

//express app
const app = express();
app.use(cors())

// middleware
app.use(express.json());

app.use((req, res, next) => {  // istek , cevap , sonraki ara yazılım
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutRoutes); // /api/workouts url gelindiğinde workoutRoutes rotası gelecek

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for request
    app.listen(process.env.PORT, () => {
      console.log(`connect to db & listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
