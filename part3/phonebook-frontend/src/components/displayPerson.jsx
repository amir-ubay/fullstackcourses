const DisplayPerson = ({ persons, deletePerson }) => {
  return (
    <>
      <h2>Numbers</h2>
      {persons.map((person) => {
        return (
          <p key={person.id}>
            {person.name} {person.number}
            <span> </span>
            <button onClick={() => deletePerson(person.id)}>delete</button>
          </p>
        );
      })}
    </>
  );
};

export default DisplayPerson;
