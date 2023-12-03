import { useSelector, useDispatch } from "react-redux";
import { giveVote } from "../reducers/anecdoteReducer";

const AnecdotesList = () => {
  const anecdotes = useSelector((state) => state.anecdote);
  console.log(anecdotes);
  const filter = useSelector((state) => state.filter);
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);
  const dispatch = useDispatch();

  var data = sortedAnecdotes.filter((item) =>
    item.content.toLowerCase().includes(filter.toLowerCase())
  );

  const vote = (id) => {
    dispatch(giveVote(id));
  };

  return (
    <>
      {data.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdotesList;
