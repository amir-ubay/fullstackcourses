import { useState } from "react";
import { ChangeEventHandler } from "react";

interface Payload {
  description: string;
  date: string;
  specialist: string;
  healthCheckRating: number;
  diagnosisCodes: string[];
  type: string;
  employerName?: string | undefined;
  sickLeave?: {
    startDate?: string | undefined;
    endDate?: string | undefined;
  };
  discharge?: {
    date?: string | undefined;
    criteria?: string | undefined;
  };
}

export default function AddEntry({
  alterPatientEntry,
}: {
  alterPatientEntry: Function;
}) {
  const initialState: Payload = {
    description: "",
    date: "",
    specialist: "",
    healthCheckRating: 0,
    diagnosisCodes: [],
    type: "Hospital",
  };

  const [payload, setPayload] = useState<Payload>(initialState);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const toggleForm = () => {
    setOpenForm(!openForm);
  };

  const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayload({ ...initialState, type: e.target.value });
    console.log("DEBUG TYPE:", e.target.value);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "diagnosisCodes") {
      setPayload({ ...payload, diagnosisCodes: value.split(",") });
    } else if (name === "description") {
      setPayload({ ...payload, description: value });
    } else if (name === "date") {
      setPayload({ ...payload, date: value });
    } else if (name === "specialist") {
      setPayload({ ...payload, specialist: value });
    } else if (name === "healthCheckRating") {
      setPayload({ ...payload, healthCheckRating: Number(value) });
    } else if (name === "dischargeDate") {
      setPayload({
        ...payload,
        discharge: { ...payload.discharge, date: value },
      });
    } else if (name === "dischargeCriteria") {
      setPayload({
        ...payload,
        discharge: { ...payload.discharge, criteria: value },
      });
    } else if (name === "sickLeaveStartDate") {
      setPayload({
        ...payload,
        sickLeave: { ...payload.sickLeave, startDate: value },
      });
    } else if (name === "sickLeaveEndDate") {
      setPayload({
        ...payload,
        sickLeave: { ...payload.sickLeave, endDate: value },
      });
    } else if (name === "employerName") {
      setPayload({ ...payload, employerName: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await alterPatientEntry(payload);
    if (result === true) {
      setPayload(initialState);
    } else {
      const path = result.response.data.error[0].path;
      setError(`Value of ${path} is incorrect, please try again.`);
    }
  };

  return (
    <>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button onClick={toggleForm}>Add New Entry</button>
      <br />
      {openForm === true && (
        <div style={{ border: "2px solid black", padding: "10px" }}>
          <h3>New HealtchCheck Entry</h3>
          <label>Type</label>
          <br />
          <input
            type="radio"
            name="type"
            value="Hospital"
            onChange={handleType}
            defaultChecked
          />
          <span>Hospital</span>
          <br />
          <input
            type="radio"
            name="type"
            value="HealthCheck"
            onChange={handleType}
          />
          <span>Health Check</span>
          <br />
          <input
            type="radio"
            name="type"
            value="OccupationalHealthcare"
            onChange={handleType}
          />
          <span>Occupational Healthcare</span>
          <form
            style={{ display: "flex", flexDirection: "column" }}
            onSubmit={handleSubmit}
          >
            <label>Description</label>
            <input
              type="text"
              name="description"
              onChange={handleInput}
              value={payload.description}
            />
            <label>Date</label>
            <input
              type="date"
              name="date"
              onChange={handleInput}
              value={payload.date}
            />
            <label>Specialist</label>
            <input
              type="text"
              name="specialist"
              onChange={handleInput}
              value={payload.specialist}
            />
            <label>Diagnosis Code</label>
            <input
              type="text"
              name="diagnosisCodes"
              onChange={handleInput}
              value={payload.diagnosisCodes.join(",")}
            />
            <br />
            {payload.type === "Hospital" && (
              <HospitalForm handleInput={handleInput} />
            )}
            {payload.type === "HealthCheck" && (
              <HealthCheckForm handleInput={handleInput} />
            )}
            {payload.type === "OccupationalHealthcare" && (
              <OccupationalHealthcareForm handleInput={handleInput} />
            )}
            <br />
            <button type="submit">Add</button>
            <button onClick={toggleForm}>Cancel</button>
          </form>
        </div>
      )}
    </>
  );
}

function HospitalForm({
  handleInput,
}: {
  handleInput: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <>
      <label>Discharge</label>
      <br />
      <label>Date</label>
      <input type="date" name="dischargeDate" onChange={handleInput} />
      <br />
      <label>Criteria</label>
      <input type="text" name="dischargeCriteria" onChange={handleInput} />
      <br />
    </>
  );
}

function OccupationalHealthcareForm({
  handleInput,
}: {
  handleInput: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <>
      <label>Employer Name</label>
      <input type="text" name="employerName" onChange={handleInput} />
      <br />
      <label>Sick Leave</label>
      <br />
      <label>Start Date</label>
      <input type="date" name="sickLeaveStartDate" onChange={handleInput} />
      <br />
      <label>End Date</label>
      <input type="date" name="sickLeaveEndDate" onChange={handleInput} />
      <br />
    </>
  );
}

function HealthCheckForm({
  handleInput,
}: {
  handleInput: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <>
      <label>Health Check Rating</label>
      <input type="number" name="healthCheckRating" onChange={handleInput} />
    </>
  );
}
