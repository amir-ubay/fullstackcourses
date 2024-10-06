import patientEntries from "../../data/patient";
import diagnoseEntries from "../../data/diagnose";
import {
  Patient,
  Diagnose,
  PatientEntry,
  NewPatientData,
  EntryWithoutId,
} from "../types/types";
import { v1 as uuid } from "uuid";

const getThePatient = (id: string): Patient | undefined => {
  return patientEntries.find((patient) => patient.id === id);
};

const getPatients = (): Patient[] => {
  return patientEntries;
};

const getNonSensitivePatientsEntries = (): PatientEntry[] => {
  return patientEntries.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const getDiagnoses = (): Diagnose[] => {
  return diagnoseEntries;
};

const addNewPatient = (data: NewPatientData): Patient => {
  const newPatientEntry = {
    id: uuid(),
    entries: [],
    ...data,
  };

  patientEntries.push(newPatientEntry);
  return newPatientEntry;
};

const addNewEntry = (
  id: string,
  entry: EntryWithoutId
): Patient | undefined => {
  const updatedPatient = getThePatient(id);
  const newEntry = {
    id: uuid(),
    ...entry,
  };
  if (updatedPatient) {
    patientEntries.map((patient) => {
      if (patient.id === id) {
        patient.entries.push(newEntry);
        return patient;
      } else {
        return patient;
      }
    });
  } else {
    return undefined;
  }

  return updatedPatient;
};

export default {
  getPatients,
  getNonSensitivePatientsEntries,
  getDiagnoses,
  addNewPatient,
  getThePatient,
  addNewEntry,
};
