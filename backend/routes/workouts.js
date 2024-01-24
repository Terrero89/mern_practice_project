const express = require("express");
const Workout = require("../models/workoutModel");
const {
  createWorkoutController,
  getWorkoutsController,
  getWorkoutController,
} = require("../controllers/workoutController");
const router = express.Router(); //instance of router

//ROUTE HANDLER FUNCTIONS

router.get("/", getWorkoutsController);

//GET SINGLE WORKOUT
router.get("/:id", getWorkoutController);

//post SINGLE WORKOUT
router.post("/", createWorkoutController);

//delete workout
router.delete("/:id", (req, res) => {
  res.json({ message: "DELETE SINGLE WORKOUT" });
});
//update workout
router.patch("/:id", (req, res) => {
  res.json({ message: "UPDATE A WORKOUT" });
});

module.exports = router;
