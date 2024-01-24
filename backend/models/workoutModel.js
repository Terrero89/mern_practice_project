const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//SCHEMA == structure of document
const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    reps: { type: Number, required: true },
    load: { type: Number, required: true },
  },
  {
    //will create prop that let us know when it was created
    timestamps: true,
  }
);

//MODEL --> passes workoutSchema... 'Workout' is the collection
module.exports = mongoose.model('Workout', workoutSchema);
