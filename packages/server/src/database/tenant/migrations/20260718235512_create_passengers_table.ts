import { Knex } from 'knex';

export const up = (knex: Knex) => {
  return knex.schema.createTable('passengers', (table) => {
    table.bigIncrements('id');
    table.integer('customerId').unsigned().notNullable()
      .references('id').inTable('contacts').onDelete('CASCADE');
    table.string('visaStatus', 20).notNullable().defaultTo('none');
    table.text('notes');
    table.boolean('active').notNullable().defaultTo(true);
    table.timestamps(true, true);

    table.index('customerId');
  });
};

export const down = (knex: Knex) => knex.schema.dropTableIfExists('passengers');