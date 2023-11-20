import { useState } from "react";

const NewBlogForm = ({addBlog}) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    const handleSubmitBlog = (event) => {
        event.preventDefault();
        addBlog({ title, author, url });
        setTitle("");
        setAuthor("");
        setUrl("");
    }

    return (
        <>
            <div id='new-blog-form'>
                <form onSubmit={handleSubmitBlog}>
                <div>
                    title
                    <input
                    id="title"
                    type="text"
                    value={title}
                    name="Title"
                    onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author
                    <input id="author" type="text" value={author} name="Author" onChange={({ target }) => setAuthor(target.value)} />
                </div>
                <div>
                    url
                    <input id="url" type="text" value={url} name="Url" onChange={({ target }) => setUrl(target.value)} />
                </div>
                <button type="submit">create</button>
                </form>
            </div>
        </>
    )
}

export default NewBlogForm