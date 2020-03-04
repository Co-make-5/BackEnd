const db = require("../data/dbConfig.js");

module.exports = {
    get,
    update,
    remove
}

function remove(id) {
    return db('issues')
    .delete()
    .where({ "id": id })
}

function get() {
    return db('issues')
}

function update(body) {
    return db('issues')
    .update(body)
    .where({ "id": body.id })
}