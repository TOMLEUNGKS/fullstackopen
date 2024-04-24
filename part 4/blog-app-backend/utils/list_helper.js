const lodash = require('lodash')
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: "test title 1",
        author: "test author 1",
        url: "test url 1",
        likes: 4
    },
    {
        title: "test title 2",
        author: "test author 2",
        url: "test url 2",
        likes: 6
    }
]

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const result = blogs.reduce((acc, cur) => acc + cur.likes, 0)
    return result
}

const favouriteBlog = (blogs) => {
    let maxLikes = -1
    let favBlog

    blogs.forEach(blog => {
        if (blog.likes > maxLikes) {
            maxLikes = blog.likes
            favBlog = blog
        }
    });
    return favBlog
}

const mostBlogs = (blogs) => {
    const authorCounts = lodash.groupBy(blogs, 'author')
    const maxAuthor = lodash.maxBy(Object.keys(authorCounts), (author) => authorCounts[author].length)
    return {author: maxAuthor, blogs: authorCounts[maxAuthor].length}
}

const mostLikesAuthor = (blogs) => {
    const authorLikes = {}

    blogs.forEach(blog => {
        if(authorLikes[blog.author]) {
            authorLikes[blog.author] += blog.likes
        } else {
            authorLikes[blog.author] = blog.likes
        }
    })

    const favAuthor = lodash.maxBy(Object.keys(authorLikes), author => authorLikes[author])

    return {author: favAuthor, likes: authorLikes[favAuthor]}
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    console.log("blogs in blogsInDb", blogs)
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikesAuthor,
    blogsInDb,
    initialBlogs,
    usersInDb,
  }