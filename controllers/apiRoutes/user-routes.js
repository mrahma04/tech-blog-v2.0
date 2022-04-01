const router = require('express').Router()
const { User } = require('../../models')

router.get('/', async (req, res) => {
    try {
        const dbUserData = await User.findAll()
        res.status(200).json(dbUserData)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
})

router.post('/', async (req, res) => {
    try {
        const dbPostData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        res.status(200).json(dbPostData)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
})

module.exports = router