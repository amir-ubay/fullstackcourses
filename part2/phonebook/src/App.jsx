import { useState } from "react";
import DisplayPerson from "./components/displayPerson";
import AddPerson from "./components/addPerson";
import Filter from "./components/filter";
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");
  const [filteredPerson, setFilteredPerson] = useState(persons);

  const handleSubmit = (e) => {
    e.preventDefault();
    persons.map((person) => {
      const newPersonName = newPerson.name;
      const personData = person.name.toLowerCase();
      const newPersonData = newPersonName.toLocaleLowerCase();
      if (personData === newPersonData) {
        alert(newPersonName + " is already added to phonebook");
        return false;
      } else {
        setPersons(persons.concat(newPerson));
        setNewPerson({ name: "", number: "" });
      }
    });
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

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} handleFilter={handleFilter} />
      <AddPerson
        handleSubmit={handleSubmit}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
        newPerson={newPerson}
      />
      {filter.length > 0 ? (
        <DisplayPerson persons={filteredPerson} />
      ) : (
        <DisplayPerson persons={persons} />
      )}
    </div>
  );
};

export default App;
