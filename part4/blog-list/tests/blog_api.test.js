const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  jest.setTimeout(10000)

  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('unique property of blog is "id" and not "_id"', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body[0].id).toBeDefined()
    expect(response.body[0]._id).not.toBeDefined()
  })
})

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'Food Blog',
      author: 'Gordon Ramsay',
      url: 'https://foodblog.com/',
      likes: 19
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain(
      'Food Blog'
    )
  })

  test('succeeds and makes likes=0 if likes is missing', async () => {
    const newBlog = {
      title: 'Food Blog',
      author: 'Gordon Ramsay',
      url: 'https://foodblog.com/'
    }

    await api.post('/api/blogs').send(newBlog)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.find(blog => blog.title === newBlog.title).likes)
      .toBe(0)
  })

  test('fails with status code 400 if author or url is missing', async () => {
    const blogWithoutTitle = {
      author: 'Gordon Ramsay',
      url: 'https://foodblog.com/',
      likes: 17
    }

    await api
      .post('/api/blogs')
      .send(blogWithoutTitle)
      .expect(400)


    const blogWithoutURL = {
      title: 'Food Blog',
      author: 'Gordon Ramsay',
      likes: 17
    }

    await api
      .post('/api/blogs')
      .send(blogWithoutURL)
      .expect(400)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('updation of a blog', () => {
  test('succeeds and returns updated blog if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const updatedBlog = {...blogToUpdate, title: 'some other title'}
    
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).not.toContain(blogToUpdate.title)
    expect(titles).toContain(updatedBlog.title)
  })
})

afterAll(() => {
  mongoose.connection.close()
}) 