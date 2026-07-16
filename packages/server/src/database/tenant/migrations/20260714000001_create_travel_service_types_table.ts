import { Knex } from 'knex';

export const up = (knex: Knex) => {
  return knex.schema
    .createTable('travel_service_types', (table) => {
      table.increments('id');
      table.string('name', 255).notNullable();
      table.string('description', 255).nullable();
      table
        .integer('tax_rate_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('tax_rates');
      table.boolean('active').defaultTo(true);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.timestamp('deleted_at').nullable();
    })
    .table('items', (table) => {
      table
        .integer('travel_service_type_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('travel_service_types');
    });
};

export const down = (knex: Knex) => {
  return knex.schema
    .table('items', (table) => {
      table.dropColumn('travel_service_type_id');
    })
    .dropTableIfExists('travel_service_types');
};