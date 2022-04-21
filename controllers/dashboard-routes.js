const router = require('express').Router()
const sequelize = require('../config/connection')
const { Post, User, Comment } = require('../models')
const withAuth = require('../utils/auth')

router.get('/', withAuth, async (req, res) => {
    try {
        console.log(req.session);
        console.log('======================');
        const dbPostData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: ['id', 'title', 'post_content', 'created_at'],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        const posts = dbPostData.map(post => post.get({ plain: true }))
        console.log('SECOND', req.session)
        res.render('dashboard', { posts, loggedIn: true })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.get('/edit/:id', async (req, res) => {
    try {
        const dbPostData = await Post.findByPk(req.params.id, {
            attributes: ['id', 'title', 'post_content']
        })
        const post = dbPostData.get({ plain: true })
        console.log('===EDIT===', post)
        res.status(200).render('edit-post', { post })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

module.exports = router