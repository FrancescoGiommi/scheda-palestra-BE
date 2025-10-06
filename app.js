const express = require("express");
const app = express();
const cors = require("cors");

const { APP_HOST, APP_PORT } = process.env;

app.use(
  cors({
    origin: "localhost: http://localhost:5173",
  })
);

/* Body parser per decifrare il request body */
app.use(express.json());

const workoutRouter = require("./routers/workout.Router");

app.use(workoutRouter);
app.use("/api/workouts", workoutRouter);

app.listen(APP_PORT, () => {
  console.log(`Server listening at ${APP_HOST}:${APP_PORT}`);
});
