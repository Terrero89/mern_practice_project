//userScheme
const User = require("../models/userModel");

//login user controller
const loginUser = async (req, res) => {
  res.json({ message: "login user..." });
};

//signup user controller
const signupUser = async (req, res) => {
  const { email, password } = req.body; // inputs from user body
  try {
    const user = await User.signup(email, password); //momngoose method for signup
    res.status(200).json({email, user});

  } catch (error) {
    res.status(400).json({error:error.message})
  }

};

module.exports = {
  signupUser,
  loginUser,
};
