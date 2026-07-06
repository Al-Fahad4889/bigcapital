/**
 * Shared form values shape for the Item form.
 * Field names mirror the SDK `CreateItemBody` / `EditItemBody` (snake_case at the HTTP layer).
 */
export interface ItemFormValues {
  active: boolean;
  name: string;
  type: ItemFormType;
  code: string;
  cost_price: string | number;
  sell_price: string | number;
  cost_account_id: number | string;
  sell_account_id: number | string;
  sell_tax_rate_id: number | string;
  inventory_account_id: number | string;
  category_id: number | string;
  sellable: boolean;
  purchasable: boolean;
  sell_description: string;
  purchase_description: string;
  purchase_tax_rate_id: number | string;
}

export type ItemFormType = 'service' | 'non-inventory' | 'inventory';

export type ItemFormSubmitPayload = {
  redirect?: boolean;
};
