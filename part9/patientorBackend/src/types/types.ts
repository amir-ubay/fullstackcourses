import z from "zod";
import { NewPatientEntrySchema } from "../utils";

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, "id">;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: Gender;
  ssn: string;
  occupation: string;
  entries: Entry[];
}

export type PatientEntry = Omit<Patient, "ssn">;

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

// export type NewPatientData = Omit<Patient, "id">;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type NewPatientData = z.infer<typeof NewPatientEntrySchema>;

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose["code"]>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type OccupationalHealthcareEntry = BaseEntry & {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
};

export type HospitalEntry = BaseEntry & {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
};
