const express = require("express");
const app = express();
const cors = require("cors");
const workoutRouter = require("./routers/workout.Router");

const { APP_HOST, APP_PORT } = process.env;

app.use(
  cors({
    origin: "localhost: http://localhost:5173",
  })
);

app.use(workoutRouter);

app.use("/woprkouts", workoutRouter);

app.listen(APP_PORT, () => {
  console.log(`Server listening at ${APP_HOST}:${APP_PORT}`);
});
