import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('<BlogForm /> calls event handler with correct details when form is submitted', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const inputTitle = component.container.querySelector('#title')
  const inputAuthor = component.container.querySelector('#author')
  const inputUrl = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(inputTitle, {
    target: { value: 'this is a title' }
  })
  fireEvent.change(inputAuthor, {
    target: { value: 'mrs author' }
  })
  fireEvent.change(inputUrl, {
    target: { value: 'www.blog.com' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('this is a title')
  expect(createBlog.mock.calls[0][0].author).toBe('mrs author')
  expect(createBlog.mock.calls[0][0].url).toBe('www.blog.com')
})