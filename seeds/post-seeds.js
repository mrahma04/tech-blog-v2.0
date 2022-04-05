const { Post } = require('../models')

const posts = [
    {
        title: 'HELLO1',
        post_content: 'HELLO1 CONTENT1',
        user_id: 1
    }
]

const seedPosts = () => Post.bulkCreate(posts, { individualHooks: true })

module.exports = seedPosts