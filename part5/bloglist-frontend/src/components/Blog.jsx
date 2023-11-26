import React, { useState } from "react";
import PropTypes from "prop-types";

const BlogQuery = ({ blogs, handleLike, handleRemove }) => {
  const queryStyle = {
    paddingTop: "8px",
  };

  const [visibleBlogId, setVisibleBlogId] = useState(null);

  const toggleVisibility = (blogId) => {
    if (visibleBlogId === blogId) {
      setVisibleBlogId(null);
    } else {
      setVisibleBlogId(blogId);
    }
  };

  const sortedBlogs = blogs.sort((b, a) => a.likes - b.likes);

  return (
    <div style={queryStyle}>
      {sortedBlogs.map((blog) => (
        <div
          key={blog.id}
          style={{
            paddingTop: 10,
            paddingLeft: 2,
            border: "solid",
            borderWidth: 1,
            marginBottom: 5,
          }}
        >
          <span test-data="blog-title" id="title">
            {blog.title}{" "}
          </span>
          <span test-data="blog-author" id="author">
            {blog.author}
          </span>
          {visibleBlogId === blog.id ? (
            <>
              <button onClick={() => toggleVisibility(blog.id)}>Hide</button>
              <div>
                <p test-data="blog-url" id="url">
                  {blog.url}
                </p>
                <p>
                  likes{" "}
                  <span test-data="blog-likes" id="likes">
                    {blog.likes}
                  </span>{" "}
                  <button onClick={() => handleLike(blog)}>like</button>
                </p>
                <p test-data="blog-username">{blog.user.name}</p>
                <div>
                  <button
                    onClick={() => {
                      handleRemove(blog);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </>
          ) : (
            <button onClick={() => toggleVisibility(blog.id)}>View</button>
          )}
        </div>
      ))}
    </div>
  );
};

// BlogQuery.propTypes = {
//   blogs: PropTypes.array.isRequired,
//   handleLike: PropTypes.func.isRequired,
//   handleRemove: PropTypes.func.isRequired,
// };

export default BlogQuery;
