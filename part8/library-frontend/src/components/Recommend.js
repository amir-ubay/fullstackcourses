import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ME } from "../queries";

const Recommend = ({ show }) => {
  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(ME);

  const {
    loading: bookLoading,
    error: bookError,
    data: bookData,
  } = useQuery(ALL_BOOKS, {
    variables: { genre: userData?.me?.favoriteGenre[0] },
    skip: !userData?.me?.favoriteGenre,
  });

  if (userLoading || bookLoading) {
    return <div>loading...</div>;
  }

  if (userError || bookError) {
    return <div>{userError || bookError}</div>;
  }

  if (!show) {
    return null;
  }
  console.log("userData >>", userData);
  console.log("bookData >>", bookData);

  const data = bookData.allBooks;

  return (
    <div>
      <h2>recommend books</h2>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
            <th>genre</th>
          </tr>
          {data.map((a) => (
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

export default Recommend;
