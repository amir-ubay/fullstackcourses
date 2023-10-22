const DisplayPerson = ({ persons }) => {
  return (
    <>
      <h2>Numbers</h2>
      {persons.map((person) => {
        return (
          <p key={person.id}>
            {person.name} {person.number}
          </p>
        );
      })}
    </>
  );
};

export default DisplayPerson;
