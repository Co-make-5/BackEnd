const db = require("../data/dbConfig.js");

module.exports = {
    add,
    getById
}

function getById(id) {
    return db('issues')
    .where({ "user_id": id })
}

function add(body) {
    return db('issues')
    .insert(body)
}