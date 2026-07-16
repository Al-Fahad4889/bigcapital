exports.up = async (knex) => {
    // 3. Clean up known legacy duplicates (no-ops on current clean data).
  await knex('accounts')
    .where({ slug: 'owner-drawings', code: '20003' })
    .update({ slug: 'loan' });

  await knex('accounts')
    .where({ code: '30003', name: 'Drawings' })
    .update({ code: '30004' });
  // 1. Pre-check: detect any user-created duplicate slugs before adding constraint.
  const dupSlugs = await knex('accounts')
    .groupBy('slug')
    .havingRaw('COUNT(*) > 1')
    .select('slug');
  if (dupSlugs.length > 0) {
    const slugs = dupSlugs.map((r) => r.slug).join(', ');
    throw new Error(
      `Cannot add UNIQUE(slug) — ${dupSlugs.length} slug(s) have duplicates: ${slugs}. ` +
      'Manually resolve duplicates in the accounts table and re-run this migration.',
    );
  }

  // 2. Pre-check: detect any user-created duplicate codes.
  const dupCodes = await knex('accounts')
    .groupBy('code')
    .havingRaw('COUNT(*) > 1')
    .select('code');
  if (dupCodes.length > 0) {
    const codes = dupCodes.map((r) => r.code).join(', ');
    throw new Error(
      `Cannot add UNIQUE(code) — ${dupCodes.length} code(s) have duplicates: ${codes}. ` +
      'Manually resolve duplicates in the accounts table and re-run this migration.',
    );
  }



  // 4. Add unique constraints.
  return knex.schema.table('accounts', (table) => {
    table.unique('slug');
    table.unique('code');
  });
};

exports.down = (knex) => {
  return knex.schema.table('accounts', (table) => {
    table.dropUnique(['slug']);
    table.dropUnique(['code']);
  });
};