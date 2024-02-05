const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");
//?get all workoutS controller
const getWorkoutsController = async (req, res) => {
  const user_id = req.user._id
  const workouts = await Workout.find({user_id}).sort({ createdAt: -1 }); //find all workouts and sort themn
  res.status(200).json(workouts);
};

//?create new workout controller
// create new workout
const createWorkoutController = async (req, res) => {
  const {title, load, reps} = req.body

  let emptyFields = []

  if(!title) {
    emptyFields.push('title')
  }
  if(!load) {
    emptyFields.push('load')
  }
  if(!reps) {
    emptyFields.push('reps')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add item to db
  try {
    const user_id = req.user._id
    const workout = await Workout.create({title, load, reps, user_id})
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}
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

const deleteWorkoutController = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

// update a workout
const updateWorkoutController = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!workout) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};
//module exported as obeject to import each individual workout controller
module.exports = {
  createWorkoutController,
  getWorkoutsController,
  getWorkoutController,
  deleteWorkoutController,
  updateWorkoutController,
};
