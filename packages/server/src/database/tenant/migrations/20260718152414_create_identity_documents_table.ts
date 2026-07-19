import { Knex } from 'knex';

export const up = (knex: Knex) => {
  return knex.schema.createTable('identity_documents', (table) => {
    table.bigIncrements('id');
    table.bigInteger('owner_id').unsigned().notNullable();
    table.string('owner_type', 50).notNullable();
    table.string('type', 50).notNullable();
    table.text('document_number');
    table.string('document_number_hash', 64);
    table.text('full_name');
    table.string('full_name_hash', 64);
    table.string('issuing_country', 100).nullable();
    table.string('issuing_authority', 255).nullable();
    table.date('issued_at').nullable();
    table.date('expires_at').nullable();
    table.date('date_of_birth').nullable();
    table.timestamps();

    table.index(['owner_id', 'owner_type']);
    table.index(['document_number_hash']);
    table.index(['type']);
  });
};

export const down = (knex: Knex) => {
  return knex.schema.dropTableIfExists('identity_documents');
};