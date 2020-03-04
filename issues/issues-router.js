const router = require("express").Router();
const issues = require("./issues-model.js");
const db = require("../data/dbConfig.js");

router.put('/:id', verifyIssue, verifyPost, (req, res) => {
    const { id } = req.params;
    issues.update(req.body, id)
    .then(updated => {
        res.status(201).json(updated)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Unable to fulfill request" });
    })
})

router.delete('/:id', verifyIssue, (req, res) => {
    const { id } = req.params;
    issues.remove(id)
    .then(deleted => {
        res.status(201).json(deleted)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Unable to fulfill request" });
    })
})

router.get('/', (req, res) => {
    issues.get()
    .then(issues => {
        res.status(200).json(issues)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Unable to fulfill request" });
    })
})

function verifyPost(req, res, next) {
    if(!req.body.issue_name || !req.body.zip) {
        res.status(400).json({ message: "Issue name and zip code are required" });
    } else {
        next();
    }
}

function verifyIssue(req, res, next) {
    const { id } = req.params;
    db('issues').pluck('user_id').where({ id: id })
    .then(id => {
        if(id[0] === req.userId) {
            next();
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }
    });
}

module.exports = router;