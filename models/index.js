const User = require('./User')
const Post = require('./Post')

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

module.exports = { User, Post }