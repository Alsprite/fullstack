import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
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
  let component
  beforeEach(() => {
    component = render(<Blog blog={blog} btn={mockHandler} />)
  })

  test('renders title', () => {
    screen.queryByText(blog.title)
  })
  test('renders url, likes and user', async () => {
    const user = userEvent.setup()
    const button = screen.queryByText('show')
    await user.click(button)

    const div = component.container.querySelector('#extra')
    expect(div).not.toHaveStyle('display: none')
  })
//   test('when like button is clicked twice it calls the function twice', async () => {
//     const user = userEvent.setup()
//     let view = screen.getByText('show')
//     await user.click(view)
//     let like = screen.getByText('Like')
//     await user.click(like)
//     await user.click(like)

//     expect(mockHandler.mock.calls).toHaveLength(2)
//   })
})