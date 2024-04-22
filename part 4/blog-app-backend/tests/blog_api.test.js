const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const api = supertest(app)
const helper = require('../utils/list_helper')

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    console.log('cleared DB')

    for(let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
  })

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('unique identifier is named id', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const id = response.body.map(r => r.id)
    assert.notStrictEqual(id, undefined)
  })

test('A new blog is added', async () => {

const newBlog = {
    title: "new blog title 1",
    author: "new blog author 1",
    url: "new blog url 1",
    likes: 1
}

const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

const blogsAtEnd = await helper.blogsInDb()
assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
const blogs = blogsAtEnd.map(n => n.title)
assert(blogs.includes('new blog title 1'))
})

describe('deletion of a note', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

      const titles = blogsAtEnd.map(r => r.title)
      assert(!titles.includes(blogToDelete.title))
    })
  })

  describe('update of a note', () => {
    test('blog is updated sucessfully', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
    
      const updatedBlog = {
        likes: 100
    }

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200)

      const blogsAtEnd = await helper.blogsInDb()

      const result = blogsAtEnd.filter(r => r.id === blogToUpdate.id)
      assert.strictEqual(result[0].likes, updatedBlog.likes)
    })
  })

after(async () => {
  await mongoose.connection.close()
})
