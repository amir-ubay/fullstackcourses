const AddPerson = ({
  handleSubmit,
  handleNewName,
  handleNewNumber,
  newPerson,
}) => {
  return (
    <>
      <h2>Add New</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newPerson.name} onChange={handleNewName} />
        </div>
        <div>
          number: <input value={newPerson.number} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default AddPerson;
