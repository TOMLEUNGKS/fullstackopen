import { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import BlogItem from './BlogItem'
import Togglable from './Togglable'

const BlogSection = ({ notifyWith, user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [blogs, setBlogs] = useState([])

  const updateBlogList = () => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    try {
      const createdBlog = await blogService.create(newBlog)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
      setTitle('')
      setAuthor('')
      setUrl('')
      notifyWith(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
    } catch (exception) {
      console.log(exception)
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  return (
    <>
      <Togglable buttonLabel='new blog'>
        <h2>create new</h2>
        <form onSubmit={handleSubmit}>
          <div>
            title
            <input
              type="text"
              value={title}
              name="Title"
              data-test-id="title-input"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author
            <input
              type="text"
              value={author}
              name="Author"
              data-test-id="author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url
            <input
              type="text"
              value={url}
              name="Url"
              data-test-id="url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </Togglable>
      <div>
        {blogs
          .slice()
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <BlogItem key={blog.id} blog={blog} updateBlogList={updateBlogList} user={user}/>
          ))}
      </div>
    </>
  )
}

export default BlogSection
