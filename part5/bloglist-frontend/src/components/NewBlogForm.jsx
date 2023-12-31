import { useState } from "react";
import PropTypes from "prop-types";

const NewBlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmitBlog = (event) => {
    event.preventDefault();
    addBlog({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <>
      <div id="new-blog-form">
        <form onSubmit={handleSubmitBlog}>
          <div>
            title
            <input
              id="title"
              type="text"
              value={title}
              name="Title"
              placeholder="input blog title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author
            <input
              id="author"
              type="text"
              value={author}
              name="Author"
              placeholder="input blog author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url
            <input
              id="url"
              type="text"
              value={url}
              name="Url"
              placeholder="input blog url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    </>
  );
};

NewBlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
};

export default NewBlogForm;
