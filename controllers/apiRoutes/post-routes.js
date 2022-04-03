const router = require('express').Router()
const { Post } = require('../../models')

router.get('/', async (req, res) => {
    try {
        const dbPostData = await Post.findAll()
        // if (!dbPostData.length) {
        //     res.status(400).json({ message: "Post DB empty" })
        // }
        res.status(200).json(dbPostData)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
})

router.post('/', async (req, res) => {
    try {
        const dbPostData = await Post.create({
            title: req.body.title,
            content: req.body.content
        })
        res.status(200).json(dbPostData)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
})

module.exports = router