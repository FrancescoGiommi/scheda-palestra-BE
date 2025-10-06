const express = require("express");
const router = express.Router();
const workoutController = require("../controllers/workoutController");

router.get("/", workoutController.index);
router.get("/:id", workoutController.show);
router.post("/workouts", workoutController.store);
router.get("/users", workoutController.listUsers);
module.exports = router;
