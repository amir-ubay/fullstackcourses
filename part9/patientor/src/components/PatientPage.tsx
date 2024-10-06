import { useState, useEffect } from "react";
import { Patient, Diagnosis, EntryTypes } from "../types";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import axios from "axios";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import EntryDetails from "./EntryDetails";
import AddEntry from "./AddEntry";

export default function PatientPage() {
  const [thePatient, setThePatient] = useState<Patient>();
  const id = useParams().id;

  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  console.log("DEBUG DIAG: ", diagnoses);

  const alterPatientEntry = async (payload: EntryTypes) => {
    try {
      await axios.post(
        `http://localhost:3001/api/patients/${id}/entries`,
        payload
      );
      fetchPatientList();
      return true;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const fetchPatientList = async () => {
    axios.get<Patient>(`${apiBaseUrl}/patients/${id}`).then((respond) => {
      setThePatient(respond.data);
    });
  };

  useEffect(() => {
    fetchPatientList();
  }, []);

  useEffect(() => {
    axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`).then((respond) => {
      setDiagnoses(respond.data);
      console.log("DEBUG DIAG: ", respond.data);
    });
  }, []);

  return (
    <>
      {thePatient && (
        <div>
          <h2>
            {thePatient.name}
            {thePatient.gender === "male" ? <MaleIcon /> : <FemaleIcon />}
          </h2>
          <p>ssn: {thePatient.ssn}</p>
          <p>Occupation: {thePatient.occupation}</p>
          <AddEntry alterPatientEntry={alterPatientEntry} />
          <h3>Entries</h3>
          {thePatient.entries.map((entry) => {
            return (
              <div
                id="entry-container"
                key={entry.id}
                style={{ border: "solid", borderWidth: 1, padding: "15px" }}
              >
                <EntryDetails entry={entry as EntryTypes} />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
