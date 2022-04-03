const router = require('express').Router()
const { Post, User } = require('../../models')

router.get('/', async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            attributes: ['id', 'title', 'post_content', 'created_at'],
            // JOIN statement
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
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
            post_content: req.body.post_content,
            user_id: req.body.user_id
        })
        res.status(200).json(dbPostData)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
})

module.exports = router