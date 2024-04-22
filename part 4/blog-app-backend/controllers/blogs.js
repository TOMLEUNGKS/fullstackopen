const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
    try {
        const blogs = await Blog.find({})
        response.json(blogs)
        console.log("blogs", blogs)
    } catch (exception) {
        next(exception)
    }
})
  
blogsRouter.post('/', async (request, response) => {
    try {
        const blog = new Blog(request.body)
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
  
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
  
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(200).json(updatedBlog)
  })

blogsRouter.delete('/:id', async (request, response) => {
    try {
        const blog = await Blog.findByIdAndDelete(request.params.id)
        if (blog) {
            response.status(204).json(blog)
        } else {
            response.status(404).end()
        }
    } catch (exception) {
        next(exception)
    }
})

module.exports = blogsRouter;
