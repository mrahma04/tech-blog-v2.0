const router = require('express').Router()
const { User } = require('../../models')
const bcrypt = require('bcrypt')

// const { faker } = require('@faker-js/faker')

// console.log(faker.internet.userName())
// console.log(faker.internet.email())
// console.log(faker.internet.password())


router.get('/', async (req, res) => {
    try {
        const dbUserData = await User.findAll()
        res.status(200).json(dbUserData)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' })
            return
        }
        res.status(200).json(dbUserData)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
})

router.post('/', async (req, res) => {
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        res.status(200).json(dbUserData)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const user = await User.destroy({
            where: {
                id: req.params.id
            }
        })
        // User.destroy will return a  0 or 1 indicating the numbers of rows affected
        // if the number is 0, it's falsy
        // when the variable has a falsy value, the condition is true
        if (!user) {
            res.status(404).json({ message: 'No user found with this id' })
            return
        }
        res.status(200).json(user)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        })
        // console.log(user)
        if (!user) {
            req.status(400).json({ message: 'No user with that email address!' })
            return
        }
        // check password input in the req.body
        // against password stored in database...user.dataValues.password
        const validPassword = await user.checkPassword(req.body.password, user.dataValues.password)
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' })
            return
        }
        res.status(200).json({ user, message: 'You are now logged in!' })

    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
})

module.exports = router