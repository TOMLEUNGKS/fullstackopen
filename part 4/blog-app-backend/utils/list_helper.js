const lodash = require('lodash')

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

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikesAuthor,
  }