const User = require("../models/userModel"); //userScheme

const jwt = require("jsonwebtoken"); //jws token

//custom function for token
//screte key from env.
//jwt sign --> 3 args, id arg, secrete key used, and how long it should last
const createToken = (_id) => {
    return jwt.sign({_id: _id}, process.env.SECRET_KEY, {});
};

//login user controller
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password); //momngoose method for login
        //? CREATE A TOKEN HERE.
        const token = createToken(user._id);

//instead of user, we pass to jws a token with hte token created id topass it to the browser
        res.status(200).json({email, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

//signup user controller
const signupUser = async (req, res) => {
    const {email, password} = req.body; // inputs from user body

    try {
        const user = await User.signup(email, password); //momngoose method for signup
        //? CREATE A TOKEN HERE.
        const token = createToken(user._id);

//instead of user, we pass to jws a token with hte token created id topass it to the browser
        res.status(200).json({email, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

module.exports = {
    signupUser,
    loginUser,
};
