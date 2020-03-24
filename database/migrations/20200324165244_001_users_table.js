
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments();

    tbl.string('username')
      .index()
      .unique()
      .notNullable()

    tbl.string('password')
      .notNullable()

    tbl.string('department')
      .notNullable()


  });// end users
};

exports.down = function(knex) {
  
};
