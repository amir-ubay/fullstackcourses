import {
  HospitalEntry,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  EntryTypes,
} from "../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WorkIcon from "@mui/icons-material/Work";

export default function EntryDetails({ entry }: { entry: EntryTypes }) {
  switch (entry.type) {
    case "Hospital":
      return <HospitalComponent entry={entry} />;
    case "HealthCheck":
      return <HealthCheckComponent entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareComponent entry={entry} />;
    default:
      if (entry === undefined || entry === null) {
        throw new Error("Entry is null or undefined");
      }
      throw new Error(`Unhandled entry type`);
  }
}

function HospitalComponent({ entry }: { entry: HospitalEntry }) {
  return (
    <div>
      <p>
        {entry.date} <LocalHospitalIcon />
      </p>
      <p>{entry.description}</p>
      <p>
        <FavoriteIcon color="primary" />
      </p>
      <p>{entry.specialist}</p>
    </div>
  );
}

function HealthCheckComponent({ entry }: { entry: HealthCheckEntry }) {
  return (
    <div>
      <p>
        {entry.date} <LocalHospitalIcon />
      </p>
      <p>{entry.description}</p>
      <p>
        {entry.healthCheckRating === 0 ? (
          <FavoriteIcon color="success" />
        ) : entry.healthCheckRating === 1 ? (
          <FavoriteIcon color="warning" />
        ) : (
          <FavoriteIcon color="error" />
        )}
      </p>
      <p>{entry.specialist}</p>
    </div>
  );
}

function OccupationalHealthcareComponent({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) {
  return (
    <div>
      <p>
        {entry.date} <WorkIcon />
      </p>
      <p>{entry.description}</p>
      <p>{entry.employerName}</p>
    </div>
  );
}
