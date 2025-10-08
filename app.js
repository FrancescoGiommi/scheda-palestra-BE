const express = require("express");
const app = express();
const cors = require("cors");
const authRouter = require("./routers/workout.Router");
const workoutRouter = require("./routers/workout.Router");
const { APP_HOST, APP_PORT, APP_FRONTEND_URL } = process.env;

/* Cors config */
var corsOptions = {
  origin: APP_FRONTEND_URL,
  optionsSuccessStatus: 200,
};

/* Body parser per decifrare il request body */
app.use(express.json());

/* Middlewares */
app.use(express.static("public"));
app.use(cors(corsOptions));

app.use("/api/auth", authRouter);
app.use(workoutRouter);
app.use("/api/workouts", workoutRouter);

app.listen(APP_PORT, () => {
  console.log(`Server listening at ${APP_HOST}:${APP_PORT}`);
});
