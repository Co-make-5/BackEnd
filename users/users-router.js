const router = require("express").Router();
const users = require("./users-model.js");

router.post('/:id/issues', (req, res) => {
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
        res.status(500).json({ error: "Unable to fulfill request" });
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
        res.status(500).json({ error: "Unable to fulfill request" });
    })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    users.edit(req.body, id)
    .then(updated => {
        res.status(200).json(updated)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Unable to fulfill request" });
    })
})

module.exports = router;