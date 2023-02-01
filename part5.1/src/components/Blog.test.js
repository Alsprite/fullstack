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

  render(<Blog note={blog} />)

  const element = screen.getByText('Meika')
  expect(element).toBeDefined()
})