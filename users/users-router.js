const router = require("express").Router();
const issues = require("./users-model.js");

router.post('/:id/issues', (req, res) => {
    const { id } = req.params;
    req.body.user_id = id;
    req.body.upvotes = 0;
    issues.add(req.body)
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
    issues.getById(id)
    .then(issues => {
        res.status(200).json(issues)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Unable to fulfill request" });
    })
})

module.exports = router;