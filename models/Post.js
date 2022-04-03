const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Post extends Model { }

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // foreign key is user_id
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        // by default, sequelize will create created_at and updated_at fields
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
)

module.exports = Post