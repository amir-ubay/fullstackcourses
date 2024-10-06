import express, { Response } from "express";
import services from "../services/services";
import { Diagnose } from "../types/types";

const router = express.Router();

router.get("/", (_req, res: Response<Diagnose[]>) => {
  res.send(services.getDiagnoses());
});

export default router;
