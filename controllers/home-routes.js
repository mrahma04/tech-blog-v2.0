const router = require('express').Router()
const { Post, User } = require('../models')
const sequelize = require('../config/connection')

router.get('/', async (req, res) => {
    console.log(req.session)
    try {
        const dbPostData = await Post.findAll({
            attributes: ['id', 'title', 'post_content', [sequelize.fn('DATE_FORMAT', sequelize.col('created_at'), '%d/%m/%Y'), 'created_at']],
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
        console.log(posts)
        res.render('homepage', { posts })
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
            attributes: ['title', 'post_content', [sequelize.fn('DATE_FORMAT', sequelize.col('created_at'), '%d/%m/%Y'), 'created_at']],
            include: [
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
        const post = dbPostData.get({ plain: true })
        console.log(post)
        res.render('single-post', { post })
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

module.exports = router