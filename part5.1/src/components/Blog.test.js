import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog.js'

test('renders title', () => {
  const blog = {
    title: 'Meika',
    author: 'Poika',
    url: 'youtube',
    likes: '2'
  }

  let container = render(<Blog blog={blog} />)

  const element = container.queryByText(blog.title)

  screen.debug(element)

  expect(element).toBeDefined()
})