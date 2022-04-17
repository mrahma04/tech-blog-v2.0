const router = require('express').Router()
const { Post } = require('../models')

router.get('/', async (req, res) => {
    console.log(req.session)
    try {
        const dbPostData = await Post.findAll({
            attributes: ['title', 'post_content']
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