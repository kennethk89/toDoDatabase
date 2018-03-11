
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('list', (table)=>{
    table.increments('id').primary()
    table.string('todo').notNullable()
    table.boolean('status').notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('list')
};


