require("dotenv").config();
const express = require("express");
const workoutRoutes = require('./routes/workouts')

//express app
const app = express();

//routes

//express app middleware
app.use(express()) //it passes anyrequest and attach the body to the express mehtod

// global middleware
app.use((req, res, next) => {
  console.log(req.path, res.method);
  next();
});

app.use(('/api/workouts'),workoutRoutes)
//listening for requests

app.listen(process.env.PORT, () => {
   
  console.log("listening for requests on port", process.env.PORT);
});


