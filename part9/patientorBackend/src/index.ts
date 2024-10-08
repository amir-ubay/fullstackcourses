import express from "express";
import cors from "cors";
import patientsRouter from "./routes/patients";
import diagnosesRouter from "./routes/diagnosises";

const app = express();
app.use(express.json());
const PORT = 3001;

app.use(cors());

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/patients", patientsRouter);

app.use("/api/diagnoses", diagnosesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
