exports.up = async (knex) => {
  // Clean up legacy data conflicts before adding constraints
  await knex('accounts')
    .where({ slug: 'owner-drawings', code: '20003' })
    .update({ slug: 'loan' });
  await knex('accounts')
    .where({ code: '30003', name: 'Drawings' })
    .update({ code: '30004' });

  // Pre-check for user-created duplicates before adding UNIQUE
  const dupSlugs = await knex('accounts')
    .groupBy('slug').havingRaw('COUNT(*) > 1').select('slug');
  if (dupSlugs.length > 0) throw new Error('...');

  const dupCodes = await knex('accounts')
    .groupBy('code').havingRaw('COUNT(*) > 1').select('code');
  if (dupCodes.length > 0) throw new Error('...');

  return knex.schema.table('accounts', (table) => {
    table.unique('slug');
    table.unique('code');
  });
};