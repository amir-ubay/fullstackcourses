import { useState } from "react";

const Blog = ({ blog, handleLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return(
    <div style={blogStyle}>
    {blog.title} {blog.author}
    {visible ? 
      <button onClick={toggleVisibility}>Hide</button> : 
      <button onClick={toggleVisibility}>View</button>
    }
    {visible && (
      <div>
        <p>
          {blog.url}
        </p>
        <p>
          likes {blog.likes} <button onClick={() => handleLike(blog)}>like</button>
        </p>
        <p>
          {blog.user.name}
        </p>
      </div>
    )}    
  </div>  
  )
}
 

const BlogQuery = ({ blogs, handleLike }) => {
  const queryStyle = {
    paddingTop : '8px',
  }

  const sortedBlog = blogs.sort((b, a) => a.likes - b.likes)


  return (
    <div style={queryStyle}>
      {sortedBlog.map((blog) => (
        <Blog key={blog.id} blog={blog} handleLike={handleLike}/>
      ))}
    </div>
  );
};

export{ Blog, BlogQuery }