import { useQuery } from "@apollo/client";
import { ALL_BOOKS, GENRES } from "../queries";
import { useState, useEffect } from "react";

const Books = (props) => {
  const [genre, setGenre] = useState("");

  const { loading, data, refetch } = useQuery(ALL_BOOKS, {
    variables: { genre },
  });

  const genreResult = useQuery(GENRES);

  if (loading || genreResult.loading) {
    return <div>loading...</div>;
  }
  if (!props.show) {
    return null;
  }

  const genreList = genreResult.data.allBooks
    .map((b) => b.genres.flat())
    .flat()
    .filter((value, index, self) => self.indexOf(value) === index);

  const FilterGenre = (genre) => {
    setGenre(genre);
    refetch({ genre: genre });
  };

  const ResetGenre = () => {
    setGenre("");
    refetch();
  };

  return (
    <div>
      <h2>books</h2>
      {genreList.map((g) => (
        <>
          <button key={g} onClick={() => FilterGenre(g)}>
            {g}
          </button>
        </>
      ))}
      <button onClick={() => ResetGenre("")}>all genres</button>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
            <th>genre</th>
          </tr>
          {data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              <td>
                {a.genres.map((g, i, a) => (i == a.length - 1 ? g : g + ", "))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
