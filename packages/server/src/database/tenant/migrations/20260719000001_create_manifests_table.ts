import { Knex } from 'knex';

export const up = async (knex: Knex) => {
  await knex.schema.createTable('manifests', (table) => {
    table.bigIncrements('id');
    table.bigInteger('bookingId').unsigned().notNullable()
      .references('id').inTable('bookings').onDelete('CASCADE');
    table.string('manifestReference', 20).notNullable().unique();
    table.string('status', 20).notNullable().defaultTo('draft');
    table.timestamp('generatedAt').nullable();
    table.timestamps(true, true);

    table.index('bookingId');
    table.index('status');
  });

  await knex.schema.createTable('travel_documents', (table) => {
    table.bigIncrements('id');
    table.bigInteger('manifestId').unsigned().notNullable()
      .references('id').inTable('manifests').onDelete('CASCADE');
    table.bigInteger('passengerId').unsigned().notNullable()
      .references('id').inTable('passengers').onDelete('CASCADE');
    table.string('documentReference', 20).notNullable().unique();
    table.string('status', 20).notNullable().defaultTo('pending');
    table.timestamps(true, true);

    table.index('manifestId');
    table.index('passengerId');
  });
};

export const down = async (knex: Knex) => {
  await knex.schema.dropTableIfExists('travel_documents');
  await knex.schema.dropTableIfExists('manifests');
};
