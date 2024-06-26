const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const jwt = require('jsonwebtoken')
const User = require('../models/user')

blogsRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
        response.json(blogs)
        console.log("blogs", blogs)
    } catch (exception) {
        next(exception)
    }
})
  
blogsRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body
        
        const decodedToken = jwt.verify(request.token, process.env.SECRET)  
        
        if (!decodedToken.id) {    
          return response.status(401).json({ error: 'token invalid' })  
        }

        const user = await User.findById(decodedToken.id)
        
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0,
            user: user._id
        })

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(blog._id)
        await user.save()
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
