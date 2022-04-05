const User = require('./User')
const Post = require('./Post')
const Comment = require('./Comment')

// create one-to-many association
// a single user can create multiple posts
// foreign key only exists in the child table
// the parent table has no awareness of the foreign key
User.hasMany(Post, {
    foreignKey: 'user_id'
})

Post.belongsTo(User, {
    foreignKey: 'user_id'
})

User.hasMany(Comment, {
    foreignKey: 'user_id'
})

Post.hasMany(Comment, {
    foreignKey: 'post_id'
})

Comment.belongsTo(User, {
    foreignKey: 'user_id'
})

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
})

module.exports = { User, Post, Comment }