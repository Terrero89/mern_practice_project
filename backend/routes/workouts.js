const express = require("express");
const Workout = require("../models/workoutModel");
const {
  createWorkoutController,
  getWorkoutsController,
  getWorkoutController,
  updateWorkoutController,
  deleteWorkoutController
} = require("../controllers/workoutController");
const router = express.Router(); //instance of router

//ROUTE HANDLER FUNCTIONS

router.get("/", getWorkoutsController);

//GET SINGLE WORKOUT
router.get("/:id", getWorkoutController);

//post SINGLE WORKOUT
router.post("/", createWorkoutController);

//delete workout
router.delete("/:id", deleteWorkoutController);
//update workout
router.patch("/:id", updateWorkoutController);

module.exports = router;
