const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");
//?get all workoutS controller
const getWorkoutsController = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 }); //find all workouts and sort themn
  res.status(200).json(workouts);
};

//?create new workout controller
const createWorkoutController = async (req, res) => {
  const { title, load, reps } = req.body; //extracted from middleware
  //try.catch to get data or post data in case of error async

  try {
    const workout = await Workout.create({ title, load, reps }); //workout object
    //send response
    res.status(200).json(workout); //create dicument based on workout object
    // res.json(workout);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message }); //retuurning error if error
  }
};

//get single workout controller

const getWorkoutController = async (req, res) => {
  const { id } = req.params; //grabbing id params from the request

  //?handling error if no id is found
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findById(id); //finding by specific id from params

  if (!workout) {
    return res.status(404).json({ error: "NO WORKOUT FOUND" });
  }

  res.status(200).json(workout); //return  that specific id from workouts
};

//delete workout controller

//update workout controller
//module exported as obeject to import each individual workout controller
module.exports = {
  createWorkoutController,
  getWorkoutsController,
  getWorkoutController,
};
