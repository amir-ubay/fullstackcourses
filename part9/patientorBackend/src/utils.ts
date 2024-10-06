import { NewPatientData, Gender } from "./types/types";
import z from "zod";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect or missing name");
  }

  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDob = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }

  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString().toLowerCase())
    .includes(param.toLowerCase());
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }

  return occupation;
};

const parseSSN = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }

  return ssn;
};

export const NewPatientEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

export const NewEntrySchema = z.object({
  description: z.string(),
  date: z.string().date(), // only allow date selection today or all days before today
  specialist: z.string(),
  healthCheckRating: z.union([
    z.literal(0),
    z.literal(1),
    z.literal(2),
    z.literal(3),
  ]), // health rating only allow union 0, 1, 2, 3
  diagnosisCodes: z.array(z.string()),
  type: z.string(),
  employerName: z.string().optional(),
  sickLeave: z
    .object({
      startDate: z.string().date().optional(),
      endDate: z.string().date().optional(), // endDate must be same or after start date
    })
    .optional(),
  discharge: z
    .object({
      date: z.string().date().optional(),
      criteria: z.string().optional(),
    })
    .optional(),
});

const parsePatientEntry = (object: unknown): NewPatientData => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newEntry: NewPatientData = {
      name: parseName(object.name),
      dateOfBirth: parseDob(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
    };

    return newEntry;
  }

  throw new Error("Incorrect data: some properties are missing");
};

export default parsePatientEntry;
