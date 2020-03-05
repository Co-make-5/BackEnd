const db = require("../data/dbConfig.js");

module.exports = {
    addIssue,
    getIssuesById,
    edit,
    getById,
    get
}

function getIssuesById(id) {
    return db('issues')
    .where({ "user_id": id })
}

function addIssue(body) {
    return db('issues')
    .insert(body)
}

function edit(body) {
    return db('users')
    .update(body)
    .where({ "id": body.id })
}

function getById(id) {
    return db('users').select('id', 'username', 'name', 'location', 'zip')
    .where({ id: id })
}

function get() {
    return db('users').select('id', 'username', 'name', 'location', 'zip')
}