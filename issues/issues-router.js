const router = require("express").Router();
const issues = require("./issues-model.js");

router.put('/:id', (req, res) => {
    const id = req.params.id;
    issues.update(req.body, id)
    .then(updated => {
        res.status(201).json(updated)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Unable to fulfill request" });
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
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

module.exports = router;