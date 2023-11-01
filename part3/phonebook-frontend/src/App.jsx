import { useState, useEffect } from "react";
import axios from "axios";
import DisplayPerson from "./components/displayPerson";
import AddPerson from "./components/addPerson";
import Filter from "./components/filter";
import personService from "./services/persons";
import infoService from "./services/infos";
import Notifications from "./components/notifications";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");
  const [filteredPerson, setFilteredPerson] = useState(persons);
  const [notify, setNotify] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log("Start use effect");
    personService.getAll().then((initialData) => {
      console.log("Fulfilled request service to get all data");
      setPersons(initialData);
    });
  }, []);

  const setNotif = (message) => {
    setNotify(message);
    setTimeout(() => {
      setNotify(null);
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const duplicated = persons.filter(
      (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
    );
    const confirmText =
      " is already added to phonebook. Do you want to replace the old number with a new one?";

    if (newPerson.name === "") {
      alert("Name is required");
      return;
    }

    if (newPerson.number === "") {
      alert("Number is required");
      return;
    }

    if (duplicated.length > 0) {
      if (confirm(newPerson.name + confirmText)) {
        personService.update(duplicated[0].id, newPerson).then((response) => {
          setPersons(
            persons.map((person) =>
              person.id === response.id
                ? { ...person, number: newPerson.number }
                : person
            )
          );
          setNewPerson({ name: "", number: "" });
          setNotif(response.name + " was updated to phonebook");
        });
      }
    } else {
      personService.create(newPerson).then((response) => {
        const updatedPersons = [...persons, response];
        setPersons(updatedPersons);
        setNotif(newPerson.name + " was added to phonebook");
        setNewPerson({ name: "", number: "" });
      });
    }
  };

  const handleNewName = (e) => {
    setNewPerson({ ...newPerson, name: e.target.value });
  };

  const handleNewNumber = (e) => {
    setNewPerson({ ...newPerson, number: e.target.value });
  };

  const handleFilter = (e) => {
    const filterData = e.target.value;
    setFilter(filterData);
    const filterPerson = persons.filter((person) =>
      person.name.toLowerCase().includes(filterData.toLowerCase())
    );
    setFilteredPerson(filterPerson);
  };

  const handleInfo = () => {
    infoService.getMain().then((response) => {
      console.log(response);
    });
  };

  const handleDelete = (id) => {
    const toDelete = persons.find((person) => person.id === id);
    const confirmation = confirm(
      `Are you sure you want to delete ${toDelete.name}?`
    );
    if (confirmation) {
      personService
        .prune(id)
        .then((response) => {
          console.log("response delete: ", response);
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          const status = error.response.statusText;
          setError(true);
          if (status === "Not Found") {
            setNotify(`${toDelete.name} was already deleted`);
            setTimeout(() => {
              setError(false);
              setNotify(null);
            }, 5000);
          }
        });
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      {notify && !error && (
        <Notifications className="notification" message={notify} />
      )}
      {error && (
        <Notifications
          className="error"
          message={`Information of ${notify} has already been removed from server`}
        />
      )}
      <Filter filter={filter} handleFilter={handleFilter} />
      <AddPerson
        handleSubmit={handleSubmit}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
        newPerson={newPerson}
      />
      {filter.length > 0 ? (
        <DisplayPerson persons={filteredPerson} deletePerson={handleDelete} />
      ) : (
        <DisplayPerson persons={persons} deletePerson={handleDelete} />
      )}
    </div>
  );
};

export default App;
