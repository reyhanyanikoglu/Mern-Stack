const express = require("express");
const {
  createWorkouts,
  getWorkout,
  getWorkouts,
  deleteWorkout,
  updateWorkout
} = require("../controllers/workoutController");

const router = express.Router();

// GET all workouts
router.get("/", getWorkouts);

// GET single workouts
router.get("/:id", getWorkout);

// POST a new workouts
router.post("/", createWorkouts);

// DELETE a new workouts
router.delete("/:id", deleteWorkout);

// UPDATE a new workouts
router.patch("/:id", updateWorkout);

module.exports = router;
