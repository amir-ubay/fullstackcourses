import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAnecdote } from "../request";
import { useContext } from "react";
import { NotificationContext } from "../NotificationContext";

const AnecdoteForm = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext);

  const queryClient = useQueryClient();

  // const newAnecdoteMutation = useMutation({
  //   mutationFn: addAnecdote,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
  //   }
  // })

  const newAnecdoteMutation = useMutation({
    mutationFn: addAnecdote,
    onSuccess: (newData) => {
      console.log("new anecdote", newData);
      const data = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], data.concat(newData));
      notificationDispatch({
        type: "SET",
        data: `anecdote ${newData.content} added successfully`,
      });
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR" });
      }, 5000);
    },
    onError: (error) => {
      notificationDispatch({
        type: "SET",
        data: error.response.data.error,
      });
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR" });
      }, 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate(content);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
