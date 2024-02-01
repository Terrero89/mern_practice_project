const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
//mongoose
const Schema = mongoose.Schema;

//SCHEMA == structure of document
const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    //will create prop that let us know when it was created
    // timestamps: true,
  }
);

//static method signup mongoose/ needs to be regular function
userSchema.statics.signup = async function (email, password) {
  //validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  //check if the email entered is valid email (validator package)
  // returns bool
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
//checks if passwd is strong. returns Bool
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  const exist = await this.findOne({ email });

  if (exist) {
    throw Error("Email in use already");
  }

  const salt = await bcrypt.genSalt(10); // will wait and use 10 round of passwd
  const hash = await bcrypt.hash(password, salt); // will wait and will receive two values, user password entered and salt above

  const user = await this.create({ email, password: hash });
  //returning user information if all is ok
  return user;
};
//MODEL --> passes UserSchema... 'user' is the collection
module.exports = mongoose.model("User", userSchema);
