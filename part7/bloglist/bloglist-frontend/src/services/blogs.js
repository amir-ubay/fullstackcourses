import axios from "axios";
const baseUrl = "/api/blogs";
let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  try {
    const config = {
      headers: { authorization: token },
    };
  
    const request = await axios.get(baseUrl, config);
    return request.data;
  } catch (error) {
    // Handle the exception here
    console.error('An error occurred:', error);
    // You can also throw the error to propagate it to the caller
    throw error;
  }
};

const addLike = async (blog) => {
  const config = {
    headers: { authorization: token },
  };

  const request = await axios.put(`${baseUrl}/${blog.id}`, blog, config);
  return request.data;
};

const remove = async (blog) => {
  const config = {
    headers: { authorization: token },
  };

  try {
    const request = await axios.delete(`${baseUrl}/${blog.id}`, config);
    return request.data;
  } catch (error) {
    // Handle the exception here
    console.error("An error occurred during deletion:", error);
  }
};

const create = async (blog) => {
  const config = {
    headers: { authorization: token },
  };

  const request = await axios.post(baseUrl, blog, config);
  return request.data;
};

const comment = async (blog, comment) => {
  const config = {
    headers: { authorization: token },
  };

  const newComment = {
    comment: comment
  }

  const request = await axios.put(`${baseUrl}/${blog.id}/comments`, newComment, config);
  return request.data
}

export default { getAll, setToken, create, addLike, remove, comment };
