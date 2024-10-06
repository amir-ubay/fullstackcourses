import express from "express";
import bodyParser from "body-parser";
import bmi from "./calculateBmi";
import calculateExercises from "./exerciseCalculator";
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.json({
      error: "malformatted parameters",
    });
  } else {
    res.json({
      weight,
      height,
      bmi: bmi(height, weight),
    });
  }
});

app.post("/exercise", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body = req.body;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (body.daily_exercises && body.target) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(body.daily_exercises, body.target);
    res.json(result);
  } else {
    res.json({
      error: "parameters missing",
    });
  }
});

app.listen(port, () => {
  console.log(`Service run in port ${port}`);
});
