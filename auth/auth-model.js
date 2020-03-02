const db = require("../data/dbConfig.js");

module.exports = {
    findBy,
    add,
    update
}

function findBy(filter) {
    return db('users')
    .where(filter)
}

function add(body) {
    return db('users')
    .insert(body)
}

function update(id) {
    return db('users')
    .update()
    .where({ id: id })
}