import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const add = (event) => {
    event.preventDefault();
    console.log("name: ", event.target.anecdote);
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(addAnecdote(content));
    dispatch(setNotification(`${content} added successfuly`));
    setTimeout(() => {
      dispatch(setNotification(null));
    }, 5000);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
