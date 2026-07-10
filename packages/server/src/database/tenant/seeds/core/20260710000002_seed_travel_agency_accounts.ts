import { TenantSeeder } from '@/libs/migration-seed/TenantSeeder';
import { TravelAgencyAccountsData } from '../data/travel-agency-accounts';

export default class SeedTravelAgencyAccounts extends TenantSeeder {
  up(knex) {
    // Only seed if the organization's industry is 'travel-agency'.
    const industry = this.tenant?.metadata?.industry;
    if (industry !== 'travel-agency') {
      return;
    }
    const data = TravelAgencyAccountsData.map((account) => ({
      ...account,
      name: this.i18n.t(account.name),
      description: account.description ? this.i18n.t(account.description) : '',
      currencyCode: this.tenant.metadata.baseCurrency,
      seededAt: new Date(),
    }));
    return knex('accounts').insert(data).onConflict('slug').ignore();
  }

  down(knex) {
    return knex('accounts')
      .whereIn(
        'slug',
        TravelAgencyAccountsData.map((a) => a.slug),
      )
      .delete();
  }
}