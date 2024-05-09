exports.up = async function (knex) {
  // DO YOUR MAGIC
  await knex.schema.createTable( 'car_info', table => {
    table.increments('car_id')
    table.string('vin', 10).unique().notNullable()
    table.string('make').notNullable()
    table.string('model').notNullable()
    table.integer('mileage').notNullable()
    table.string('title')
    table.string('transmission')
  })
};

exports.down = async function (knex) {
  // DO YOUR MAGIC
  await knex.schema.dropTableIfExists('car_info')
};
