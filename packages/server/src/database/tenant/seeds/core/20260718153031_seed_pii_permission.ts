import { TenantSeeder } from '@/libs/migration-seed/TenantSeeder';

export default class SeedPiiPermission extends TenantSeeder {
  async up(knex) {
    return knex('role_permissions').insert([
      { roleId: 2, subject: 'PII', ability: 'View', value: true },
      { roleId: 2, subject: 'PII', ability: 'Create', value: true },
      { roleId: 2, subject: 'PII', ability: 'Edit', value: true },
      { roleId: 2, subject: 'PII', ability: 'Delete', value: true },
      { roleId: 2, subject: 'PII', ability: 'readUnmasked', value: false },
    ]);
  }
}