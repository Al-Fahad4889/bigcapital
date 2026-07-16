import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  const taxRate = await knex('tax_rates')
    .where({ code: 'tax_on_sales' })
    .first();

  const defaultTaxRateId = taxRate?.id ?? null;

  const types = [
    { name: 'Flight Booking', tax_rate_id: defaultTaxRateId },
    { name: 'Hotel Accommodation', tax_rate_id: defaultTaxRateId },
    { name: 'Car Rental', tax_rate_id: defaultTaxRateId },
    { name: 'Travel Insurance', tax_rate_id: defaultTaxRateId },
    { name: 'Tour Package', tax_rate_id: defaultTaxRateId },
    { name: 'Visa Processing', tax_rate_id: defaultTaxRateId },
    { name: 'Transfer / Shuttle', tax_rate_id: defaultTaxRateId },
  ];

  for (const t of types) {
    await knex('travel_service_types').insert(t);
  }
}