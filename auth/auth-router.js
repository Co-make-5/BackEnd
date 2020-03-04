const router = require("express").Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = require("./auth-model.js");

const { jwtSecret } = require("../config/secrets.js");

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    users.add(user)
    .then(created => {
        res.status(201).json(created);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Unable to fulfill request" });
    })
})

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    users.findBy({ username })
    .first()
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);
            res.status(200).json({
                message: `Welcome ${user.username}!`,
                token
            });
        } else {
            res.status(401).json({ message: 'Invalid Credentials' });
        }
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

function generateToken(user) {
    const payload = {
        username: user.username,
        id: user.id
    }
    const options = {
        expiresIn: '24h'
    }
    return jwt.sign(payload, jwtSecret, options)
}

module.exports = router;