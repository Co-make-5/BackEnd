const router = require("express").Router();
const issues = require("./issues-model.js");
const db = require("../data/dbConfig.js");

router.put('/:id', verifyIssue, (req, res) => {
    const { id } = req.params;
    req.body.id = id;
    issues.update(req.body)
    .then(updated => {
        res.status(200).json(updated)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

router.delete('/:id', verifyIssue, (req, res) => {
    const { id } = req.params;
    issues.remove(id)
    .then(deleted => {
        res.status(200).json(deleted)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

router.get('/', (req, res) => {
    issues.get()
    .then(issues => {
        res.status(200).json(issues)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

function verifyIssue(req, res, next) {
    const { id } = req.params;
    db('issues').pluck('user_id').where({ id: id })
    .then(id => {
        if(id[0] === req.userId) {
            next();
        } else if(req.body.id || req.body.user_id || req.body.issue_name || req.body.location || req.body.zip || req.body.description || req.body.solved){
            res.status(401).json({ message: "You may only upvote issues that don't belong to you" });
        } else {
            next();
        }
    });
}

module.exports = router;