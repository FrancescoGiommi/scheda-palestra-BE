const express = require("express");
const router = express.Router();
const workoutController = require("../controllers/workoutController");

router.get("/", (req, res) => {
  res.json({ message: "ok" });
});

// router.get("/", workoutController.index);
// router.get("/:id", workoutController.show);
// router.post("/:id/workouts", workoutController.storeWorkout);
// router.get("/:id/workouts", workoutController.getWorkout);

module.exports = router;
