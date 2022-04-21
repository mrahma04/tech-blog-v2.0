const router = require('express').Router()
const { User, Post, Comment } = require('../../models')
const withAuth = require('../../utils/auth')

router.get('/', async (req, res) => {
    try {
        const dbCommentData = await Comment.findAll({
            attributes: ['id', 'comment_text', 'post_id', 'user_id'],
            include: [
                {
                    model: Post,
                    attributes: ['title', 'post_content']
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        res.status(200).json(dbCommentData)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
})

router.post('/', withAuth, async (req, res) => {
    try {
        if (req.session) {
            const dbCommentData = await Comment.create({
                comment_text: req.body.comment_text,
                user_id: req.session.user_id,
                post_id: req.body.post_id
            })
            res.status(200).json(dbCommentData)
        }
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
})

module.exports = router