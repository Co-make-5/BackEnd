const router = require("express").Router();
const users = require("./users-model.js");

router.post('/:id/issues', verify, verifyPost, (req, res) => {
    const { id } = req.params;
    req.body.user_id = id;
    req.body.upvotes = 0;
    req.body.solved = false;
    users.addIssue(req.body)
    .then(created => {
        res.status(201).json(created)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

router.get('/:id/issues', (req, res) => {
    const { id } = req.params;
    users.getIssuesById(id)
    .then(issues => {
        res.status(200).json(issues)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

router.put('/:id', verify, (req, res) => {
    const { id } = req.params;
    users.edit(req.body, id)
    .then(updated => {
        res.status(200).json(updated)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    users.getById(id)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

router.get('/', (req, res) => {
    users.get()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

function verifyPost(req, res, next) {
    if(!req.body.issue_name || !req.body.zip) {
        res.status(400).json({ message: "Issue name and zip code are required" });
    } else {
        next();
    }
}

function verify(req, res, next) {
    const { id } = req.params;
    if(parseInt(id, 10) === parseInt(req.userId, 10)) {
        next();
    } else {
        res.status(401).json({ message: "User id does not match the id of the user this resource belongs to" });
    }
}

module.exports = router;