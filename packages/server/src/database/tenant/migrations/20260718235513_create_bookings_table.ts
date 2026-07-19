import { Knex } from 'knex';

export const up = async (knex: Knex) => {
  await knex.schema.createTable('bookings', (table) => {
    table.bigIncrements('id');
    table.integer('customerId').unsigned().notNullable()
      .references('id').inTable('contacts').onDelete('CASCADE');
    table.string('bookingReference', 20).notNullable().unique();
    table.string('status', 20).notNullable().defaultTo('draft');
    table.date('travelDateFrom');
    table.date('travelDateTo');
    table.integer('agentId').unsigned()
      .references('id').inTable('users').onDelete('SET NULL');
    table.decimal('totalAmount', 20, 2);
    table.string('currencyCode', 3).defaultTo('USD');
    table.text('notes');
    table.timestamps(true, true);

    table.index('customerId');
    table.index('status');
    table.index('bookingReference');
  });

  await knex.schema.createTable('booking_passengers', (table) => {
    table.bigIncrements('id');
    table.bigInteger('bookingId').unsigned().notNullable()
      .references('id').inTable('bookings').onDelete('CASCADE');
    table.bigInteger('passengerId').unsigned().notNullable()
      .references('id').inTable('passengers').onDelete('CASCADE');
    table.unique(['bookingId', 'passengerId']);
    table.timestamps(true, true);
  });
};

export const down = async (knex: Knex) => {
  await knex.schema.dropTableIfExists('booking_passengers');
  await knex.schema.dropTableIfExists('bookings');
};