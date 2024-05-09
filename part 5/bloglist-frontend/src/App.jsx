import { useState, useEffect, useRef } from 'react'
import BlogSection from './components/BlogSection'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'

const App = () => {
  const [user, setUser] = useState(null)
  const [info, setInfo] = useState({ message: null })

  const updateUser = (user) => setUser(user)

  const notifyWith = (message, type='info') => {
    setInfo({
      message, type
    })

    setTimeout(() => {
      setInfo({ message: null } )
    }, 3000)
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const blogDiv = () => (
    <div>
      <h2>Blogs</h2>
      <div>
        <p>Logged in as {user.name}</p>
        <button onClick={() => handleLogout()}>logout</button>
      </div>
      <BlogSection notifyWith={notifyWith} user={user}/>
    </div>
  )

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <>
      <Notification info={info} />
      {user === null ? <LoginForm updateUser={updateUser} notifyWith={notifyWith}/> : blogDiv()}

    </>
  )
}

export default App