const db = require("../data/dbConfig.js");

module.exports = {
    addIssue,
    getIssuesById,
    edit
}

function getIssuesById(id) {
    return db('issues')
    .where({ "user_id": id })
}

function addIssue(body) {
    return db('issues')
    .insert(body)
}

function edit(body, id) {
    return db('users')
    .update(body)
    .where({ "id": id })
}