const router = require('express').Router()
const { Post, User, Comment } = require('../../models')
const sequelize = require('../../config/connection')
const withAuth = require('../../utils/auth')

router.get('/', async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            attributes: ['id', 'title', 'post_content', [sequelize.fn('DATE_FORMAT', sequelize.col('post.created_at'), '%d/%m/%Y'), 'post_created_at']],
            include: [
                {
                    model: Comment,
                    attributes: ['comment_text', 'user_id', [sequelize.fn('DATE_FORMAT', sequelize.col('comments.created_at'), '%d/%m/%Y'), 'comment_created_at']],
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
        // if (!dbPostData.length) {
        //     res.status(400).json({ message: "Post DB empty" })
        // }
        res.status(200).json(dbPostData)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const dbPostData = await Post.findOne(
            {
                where: {
                    id: req.params.id
                }
            },
            {
                attributes: ['title', 'post_content', [sequelize.fn('DATE_FORMAT', sequelize.col('post.created_at'), '%d/%m/%Y'), 'post_created_at']],
                include: [
                    {
                        model: Comment,
                        attributes: ['comment_text', 'user_id', [sequelize.fn('DATE_FORMAT', sequelize.col('comments.created_at'), '%d/%m/%Y'), 'comment_created_at']],
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
        // if (!dbPostData.length) {
        //     res.status(400).json({ message: "Post DB empty" })
        // }
        res.status(200).json(dbPostData)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
})

router.post('/', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.create({
            title: req.body.title,
            post_content: req.body.post_content,
            user_id: req.session.user_id
        })
        res.status(200).json(dbPostData)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
})

router.put('/:id', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.update(
            {
                title: req.body.title,
                post_content: req.body.post_content,
            },
            {
                where: {
                    id: req.params.id
                }
            }
        )
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' })
            return
        }
        console.log('===UPDATE POST===', dbPostData)
        res.status(200).json(dbPostData)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
})

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.destroy(
            {
                where: {
                    id: req.params.id
                }
            }
        )
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' })
            return
        }
        res.status(200).json(dbPostData)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
})

module.exports = router