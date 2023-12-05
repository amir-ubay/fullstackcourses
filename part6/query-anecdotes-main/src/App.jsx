import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
// Start Exercice 6d
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getAnecdotes, addAnecdote, updateAnecdote } from "./request";
import { NotificationDispatcher } from "./NotificationContext";

const App = () => {
  const notificationDispatch = NotificationDispatcher();

  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
  });

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updateData) => {
      // queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
      const data = queryClient.getQueryData(["anecdotes"]);
      // queryClient.setQueryData(["anecdotes"], data.map((anecdote) => (anecdote.id === updateData.id ? updateData : anecdote)));
      queryClient.setQueryData(
        ["anecdotes"],
        data.map((anecdote) =>
          anecdote.id !== updateData.id ? anecdote : updateData
        )
      );
      notificationDispatch({
        type: "SET",
        data: `you voted '${updateData.content}'`,
      });
      setTimeout(() => {
        notificationDispatch({
          type: "CLEAR",
        });
      }, 5000);
    },
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  const handleVote = (anecdote) => {
    const increaseVote = { ...anecdote, votes: anecdote.votes + 1 };
    console.log(increaseVote);
    updateAnecdoteMutation.mutate(increaseVote);
  };

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
