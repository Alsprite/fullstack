import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog.js'

describe('<Blog />', () => {
  const blog = {
    title: 'Meika',
    author: 'Poika',
    url: 'youtube',
    likes: '2',
    user: {
      username: 'kayttajanimi',
      name: 'nimi'
    }
  }
  const mockHandler = jest.fn()
  beforeEach(() => {
    render(
      <Blog blog={blog} />
    )
  })
  test('renders title', () => {
    let container = render(<Blog blog={blog} />)
    container.queryByText(blog.title)
  })
  test('renders url, likes and user', () => {
    let container = render(<Blog blog={blog} />)
    container.queryByText(blog.url)
    container.queryByText(blog.likes)
    container.queryByText(blog.user.username)
    container.queryByText(blog.user.name)
  })
  test('when like button is clicked twice it calls the function twice', async () => {
    const user = userEvent.setup()
    let container = render(<Blog blog={blog} btn={mockHandler} />)
    let viewbutton = container.queryByText('#view-btn')
    await user.click(viewbutton)
    let likeButton = container.queryByText('#like-btn')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})