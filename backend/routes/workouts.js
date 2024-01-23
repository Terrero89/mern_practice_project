const express = require("express");

const router = express.Router(); //instance of router

//ALL WORKOUTS HERE
router.get("/", (req, res) => {
  res.json({ message: "GET ALL REQUEST HERE!!!" });
});

//GET SINGLE WORKOUT
router.get("/:id", (req, res) => {
    res.json({ message: "GET :ID SINGLE WORKOUT" });
  });

router.post("/",(req,res)=>{
    res.json({ message: "POST NEW WORKOUT" });
})

//delete workout
router.delete("/:id",(req,res)=>{
    res.json({ message: "DELETE SINGLE WORKOUT" });
})
//update workout
router.patch("/:id",(req,res)=>{
    res.json({ message: "UPDATE A WORKOUT" });
})

module.exports = router;
