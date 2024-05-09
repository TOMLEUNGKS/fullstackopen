import { render, screen } from '@testing-library/react'
import BlogSection from './BlogSection'
import userEvent from '@testing-library/user-event'
import blogService from '../services/blogs'

const testUser = {
  username: 'XXXXXXX',
  name: 'Testing',
  id: 'XXXXXXX'
}

test('event handler with right details when a new blog is created', async () => {
  const notifyWithMock = vi.fn()
  const user = userEvent.setup()

  render(<BlogSection notifyWith={notifyWithMock} user={testUser} />)

  const titleInput = screen.getByText('title')
  const authorInput = screen.getByText('author')
  const urlInput = screen.getByText('url')

  await user.type(titleInput, 'New Blog Title')
  await user.type(authorInput, 'Author Name')
  await user.type(urlInput, 'https://example.com')

  const createButton = screen.getByRole('button', { name: 'create' })
  await user.click(createButton)

  expect(blogService.create).toHaveBeenCalledWith({
    title: 'New Blog Title',
    author: 'Author Name',
    url: 'https://example.com'
  })
  expect(notifyWithMock).toHaveBeenCalledWith('a new blog New Blog Title by Author Name added')
})
