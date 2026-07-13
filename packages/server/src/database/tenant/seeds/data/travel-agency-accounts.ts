export const AirlineConsolidatorPayablesAccount = {
  name: 'Airline/Consolidator Payables',
  slug: 'airline-consolidator-payables',
  account_type: 'other-current-liability',
  code: '20007',
  description: 'Amounts owed to airlines and consolidators for ticket purchases.',
  active: 1,
  index: 1,
  predefined: 1,
};

export const CommissionIncomeAccount = {
  name: 'Commission Income',
  slug: 'commission-income',
  account_type: 'income',
  code: '50006',
  description: 'Commissions earned from airlines, hotels, and other travel suppliers.',
  active: 1,
  index: 1,
  predefined: 1,
};

export const ServiceFeeIncomeAccount = {
  name: 'Service Fee Income',
  slug: 'service-fee-income',
  account_type: 'income',
  code: '50007',
  description: 'Fees charged to clients for booking services.',
  active: 1,
  index: 1,
  predefined: 1,
};

export const PenaltyIncomeAccount = {
  name: 'Penalty Income',
  slug: 'penalty-income',
  account_type: 'other-income',
  code: '50008',
  description: 'Fees from cancellations, changes, and other penalties.',
  active: 1,
  index: 1,
  predefined: 1,
};

export const ClientAdvancesAccount = {
  name: 'Client Advances',
  slug: 'client-advances',
  account_type: 'other-current-liability',
  code: '20008',
  description: 'Advance payments received from clients for future bookings.',
  active: 1,
  index: 1,
  predefined: 1,
};

export const VatPayableAccount = {
  name: 'VAT Payable',
  slug: 'vat-payable',
  account_type: 'tax-payable',
  code: '20009',
  description: 'Value-added tax collected and owed to tax authorities.',
  active: 1,
  index: 1,
  predefined: 1,
};

export const TravelAgencyAccountsData = [
  AirlineConsolidatorPayablesAccount,
  CommissionIncomeAccount,
  ServiceFeeIncomeAccount,
  PenaltyIncomeAccount,
  ClientAdvancesAccount,
  VatPayableAccount,
];