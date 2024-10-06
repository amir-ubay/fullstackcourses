import express, { Response, Request, NextFunction } from "express";
import services from "../services/services";
import { PatientEntry, NewPatientData } from "../types/types";
import { NewPatientEntrySchema, NewEntrySchema } from "../utils";
import z from "zod";

const router = express.Router();

router.get("/", (_req, res: Response<PatientEntry[]>) => {
  res.send(services.getNonSensitivePatientsEntries());
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientEntrySchema.parse(req.body);
    console.log(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post(
  "/",
  newPatientParser,
  (
    req: Request<unknown, unknown, NewPatientData>,
    res: Response<PatientEntry>
  ) => {
    const addEntry = services.addNewPatient(req.body);
    res.json(addEntry);
  }
);

router.get("/:id", (req, res) => {
  // create service to get patient by id
  const patient = services.getThePatient(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.sendStatus(404).send("Patient not found");
  }
});

router.post("/:id/entries", newEntryParser, (req, res) => {
  const id = req.params.id;
  const newEntry = req.body;
  const updatedPatient = services.addNewEntry(id, newEntry);
  if (updatedPatient) {
    res.json(updatedPatient);
  } else {
    res.sendStatus(404).send("Patient not found");
  }
});

router.use(errorMiddleware);

export default router;
