const express = require("express");
const router = express.Router();
const workoutController = require("../controllers/workoutController");
const { login, register } = require("../controllers/authController");

// Rotte per l'autenticazione
router.post("/auth/login", login);
router.post("/auth/register", register);

router.get("/", workoutController.index);
router.get("/users", workoutController.listUsers);
router.get("/exercises", workoutController.listExercises);
router.get("/:id", workoutController.show);
router.post("/workouts", workoutController.store);
router.post("/exercises", workoutController.storeExercise);

module.exports = router;
