import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog /> renders correctly', () => {
  const blog = {
    title: 'This is a title',
    author: 'Mr Author',
    url: 'www.blog.com',
    likes: 10
  }

  let component

  beforeEach(() => {
    component = render(
      <Blog blog={blog} />
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