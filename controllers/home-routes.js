const router = require('express').Router()
const { Post, User, Comment } = require('../models')
const sequelize = require('../config/connection')

router.get('/', async (req, res) => {
    console.log(req.session)
    try {
        const dbPostData = await Post.findAll({
            // attributes: ['id', 'title', 'post_content', [sequelize.fn('DATE_FORMAT', sequelize.col('created_at'), '%d/%m/%Y'), 'created_at']],
            attributes: ['id', 'title', 'post_content', 'created_at'],
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        // get method serializes the object
        // turns the JavaScript object into a JSON string that's fed into the handlebars templates
        const posts = dbPostData.map(post => post.get({ plain: true }))
        // console.log(posts)
        res.render('homepage', { loggedIn: req.session.loggedIn, posts })
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
})

router.get('/post/:id', async (req, res) => {
    try {
        const dbPostData = await Post.findOne({
            where: {
                id: req.params.id
            },
            // attributes: ['title', 'post_content', [sequelize.fn('DATE_FORMAT', sequelize.col('post.created_at'), '%d/%m/%Y'), 'post_created_at']],
            attributes: ['id', 'title', 'post_content', 'created_at'],
            include: [
                {
                    model: Comment,
                    // attributes: ['comment_text', 'user_id', [sequelize.fn('DATE_FORMAT', sequelize.col('comments.created_at'), '%d/%m/%Y'), 'comment_created_at']],
                    attributes: ['comment_text', 'user_id', 'created_at'],
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
        // res.status(200).json(dbPostData)
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' })
            return
        }
        // console.log(dbPostData.dataValues.comments[0].dataValues.user.dataValues.username)
        // console.log(dbPostData.dataValues.comments[1].dataValues.user.dataValues.username)
        const post = dbPostData.get({ plain: true })
        // console.log(post.comments[0].user.username)
        // console.log(post.comments[1].user)
        res.render('single-post', { post, loggedIn: req.session.loggedIn })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.get('/login', async (req, res) => {
    try {
        if (req.session.loggedIn) {
            res.redirect('/')
            return
        }
        res.render('login')
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
})

router.get('/signup', async (req, res) => {
    try {
        res.render('signup')
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
})

// router.get('/new-post', async (req, res) => {
//     try {
//         res.render('new-post')
//     } catch (err) {
//         console.error(err)
//         res.status(500).json(err)
//     }
// })

module.exports = router