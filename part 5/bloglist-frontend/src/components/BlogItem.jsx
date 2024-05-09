import { useState, useRef, useEffect } from 'react'
import BlogService from '../services/blogs'

const BlogItem = ({ blog, updateBlogList, user }) => {
  const [showDetails, setShowDetails] = useState(false)
  const deleteBtnRef = useRef(null)
  const usernameRef = useRef(null)

  const handleView = () => {
    setShowDetails(!showDetails)
  }

  const handleLike = async (id) => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1 }
    try {
      await BlogService.update(id, blogToUpdate)
      updateBlogList()
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleDelete = async (blog) => {
    const confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (confirm) {
      await BlogService.remove(blog.id)
      updateBlogList()
    }
  }

  const blogItemStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  useEffect(() => {
    if (user.id === blog.user.id) {
      deleteBtnRef.current.style.display = 'block'
    }
  })

  useEffect(() => {
    if (user.id === blog.user.id) {
      usernameRef.current.style.display = 'block'
    }
  })

  const blogDetails = () => (
    <div>
      <p>{blog.url}</p>
      <div>
        <span id="blog-likes">{blog.likes}</span>
        <button onClick={() => handleLike(blog.id)}>like</button>
      </div>
      <p ref={usernameRef} style={{ display: 'none' }}>{user.name}</p>
      <button ref={deleteBtnRef} onClick={() => handleDelete(blog)} style={{ display: 'none' }}>delete</button>
    </div>
  )

  return (
    <div style={blogItemStyle}>
      <div>
        <span>
          {blog.title} {blog.author}
        </span>
        <button onClick={handleView}>{showDetails ? 'hide' : 'view'}</button>
      </div>
      <div style={showDetails ? {} : { display: 'none' }}>{blogDetails()}</div>
    </div>
  )
}

export default BlogItem
