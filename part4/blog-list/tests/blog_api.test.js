const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

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
  let token = null

  beforeEach(async () => {
    jest.setTimeout(10000)
  
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('password', 10)
    const user = new User({ username: 'root', name:'SuperUser', passwordHash })
    await user.save()

    const result = await api
      .post('/api/login')
      .send({ username: 'root', password: 'password' })
    token = result.body.token
  })

  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'Food Blog',
      author: 'Gordon Ramsay',
      url: 'https://foodblog.com/',
      likes: 19
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
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

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
    
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
      .set('Authorization', `bearer ${token}`)
      .send(blogWithoutTitle)
      .expect(400)


    const blogWithoutURL = {
      title: 'Food Blog',
      author: 'Gordon Ramsay',
      likes: 17
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(blogWithoutURL)
      .expect(400)
  })

  test('fails with status code 401 if token is invalid/not specified', async () => {
    const newBlog = {
      title: 'Food Blog',
      author: 'Gordon Ramsay',
      url: 'https://foodblog.com/',
      likes: 100
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })
})

describe('deletion of a blog', () => {
  let token = null

  beforeEach(async () => {
    jest.setTimeout(10000)
  
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('password', 10)
    const user = new User({ username: 'root', name:'SuperUser', passwordHash })
    await user.save()

    const result = await api
      .post('/api/login')
      .send({ username: 'root', password: 'password' })
    token = result.body.token

    const userId = (await helper.usersInDb())[0].id

    await Blog.deleteMany({})
    const newBlog = new Blog ({
      title: 'Food Blog',
      author: 'Gordon Ramsay',
      url: 'https://foodblog.com/',
      likes: 100,
      user: userId
    })
    await newBlog.save()
  })

  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    console.log(blogToDelete)
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
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