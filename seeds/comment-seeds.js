const { Comment } = require('../models')

const comments = [
    {
        comment_text: 'COMMENT1',
        user_id: 1,
        post_id: 1
    }
]

const seedComments = () => Comment.bulkCreate(comments, { individualHooks: true })

module.exports = seedComments