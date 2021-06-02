import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'This is a title',
  author: 'Mr Author',
  url: 'www.blog.com',
  likes: 10,
  user: {
    name: 'Super User',
    username: 'root'
  }
}

const user = {
  name: 'Super User',
  username: 'root'
}

describe('blog rendered in default mode', () => {
  let component

  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user} />
    )
  })

  test('Blog renders title and author by default', () => {
    expect(component.container).toHaveTextContent(
      'This is a title'
    )

    expect(component.container).toHaveTextContent(
      'Mr Author'
    )
  })

  test('Blog does not render likes or url by default', () => {
    expect(component.container).not.toHaveTextContent(
      'www.blog.com'
    )

    expect(component.container).not.toHaveTextContent(
      '10'
    )
  })
})

test('after clicking view button, likes and url are displayed', () => {
  const component = render(
    <Blog blog={blog} user={user} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'www.blog.com'
  )

  expect(component.container).toHaveTextContent(
    '10'
  )
})

test('the event handler received as props is called twice when the like button is clicked twice', () => {
  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} updateBlog={mockHandler} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})