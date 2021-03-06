
exports.up = function(knex) {
  return knex.schema
  .createTable('users', tbl => {
      tbl.increments();
      tbl.string('username').unique();
      tbl.string('password');
      tbl.string('name');
      tbl.string('location');
      tbl.integer('zip').unsigned();
  })
  .createTable('issues', tbl => {
    tbl.increments();
    tbl.integer('user_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('users')
    .onUpdate('CASCADE')
    .onDelete('CASCADE')
    tbl.string('issue_name')
    .notNullable()
    tbl.string('location')
    tbl.integer('zip').unsigned()
    tbl.string('description')
    tbl.boolean('solved')
    tbl.integer('upvotes').unsigned()
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('users')
  .dropTableIfExists('issues')
};
