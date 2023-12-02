/* eslint-disable no-unused-vars */
import { filterAnecdote } from "../reducers/filterReducer";
import { useDispatch, useSelector } from "react-redux";

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    console.log(event.target.value);
    const keyword = event.target.value;
    dispatch(filterAnecdote(keyword));
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input name="filter" onChange={handleChange} />
    </div>
  );
};

export default Filter;
