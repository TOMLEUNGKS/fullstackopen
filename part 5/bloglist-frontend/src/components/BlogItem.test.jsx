import { render, screen } from '@testing-library/react'
import BlogItem from './BlogItem'
import userEvent from '@testing-library/user-event'
import blogService from '../services/blogs'

const blog = {
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'testing.url',
  likes: 7,
  user: {
    username: 'XXXXXXX',
    name: 'Testing',
    id: 'XXXXXXX'
  }
}

const user = {
  username: 'XXXXXXX',
  name: 'Testing',
  id: 'XXXXXXX'
}

test('renders blog title and author but not URL and likes', () => {

  render(<BlogItem blog={blog} user={user}/>)

  const title = screen.findByText('React patterns')
  const author = screen.findByText('Michael Chan')
  const parentOfUrl = screen.queryByText('testing.url').parentElement.parentElement
  const parentOfLikes = screen.getByText('7').parentElement.parentElement.parentElement

  expect(title).toBeDefined()
  expect(author).toBeDefined()
  expect(parentOfUrl).toHaveStyle('display: none')
  expect(parentOfLikes).toHaveStyle('display: none')
})

test('URL and likes are shown after button is clicked', async () => {
  render(<BlogItem blog={blog} user={user}/>)

  const button = screen.getByText('view')
  await button.click()

  const parentOfUrl = screen.getByText('testing.url').parentElement.parentElement
  const parentOfLikes = screen.getByText('7').parentElement.parentElement.parentElement

  expect(parentOfUrl).toHaveStyle('display: block')
  expect(parentOfLikes).toHaveStyle('display: block')
})

test('event handler is called twice after like button is clicked twice', async () => {
  const mockHandler = vi.fn()
  render(
    <BlogItem blog={blog} user={user} updateBlogList={mockHandler} />
  )

  const user = userEvent.setup()

  const viewButton = screen.getByText('view')
  await viewButton.click()

  const likeButton = screen.getByText('like')
  screen.debug(likeButton)

  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler).toHaveBeenCalledTimes(2)
})
