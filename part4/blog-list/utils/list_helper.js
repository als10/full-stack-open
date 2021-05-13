const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {}

  let maxLikes = 0
  let favBlog = {}

  blogs.forEach(blog => {
    if (blog.likes > maxLikes) {
      maxLikes = blog.likes
      favBlog = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes
      }
    }
  })

  return favBlog
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {}

  const authorsWithCounts = _.countBy(_.map(blogs, 'author'))
  const maxCount = _.values(authorsWithCounts)
    .reduce((a, b) => a > b ? a : b)
  const author = _.findKey(authorsWithCounts, val => val === maxCount)

  return {
    author: author,
    blogs: maxCount
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}