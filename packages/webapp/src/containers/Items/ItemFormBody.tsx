import { FormGroup, Checkbox, ControlGroup } from '@blueprintjs/core';
import { useFormikContext, FastField, ErrorMessage } from 'formik';
import React from 'react';
import intl from 'react-intl-universal';
import { useItemFormContext } from './ItemFormProvider';
import {
  sellDescriptionFieldShouldUpdate,
  sellAccountFieldShouldUpdate,
  sellPriceFieldShouldUpdate,
  costPriceFieldShouldUpdate,
  costAccountFieldShouldUpdate,
  purchaseDescFieldShouldUpdate,
  taxRateFieldShouldUpdate,
} from './utils';
import type { ItemFormValues } from './types';
import {
  AccountsSelect,
  FMoneyInputGroup,
  Col,
  Row,
  Hint,
  InputPrependText,
  FFormGroup,
  FTextArea,
} from '@/components';
import { FormattedMessage as T } from '@/components';
import { TaxRatesSelect } from '@/components/TaxRates/TaxRatesSelect';
import { ACCOUNT_PARENT_TYPE } from '@/constants/accountTypes';
import { useCurrentOrganizationBaseCurrency } from '@/hooks/query';

type CheckboxField = {
  name: string;
  value: boolean;
  onChange: (e: unknown) => void;
  onBlur: (e: unknown) => void;
};

/**
 * Item form body (legacy layout — superseded by ItemFormFields).
 */
function ItemFormBodyInner() {
  const baseCurrency = useCurrentOrganizationBaseCurrency();

  const { accounts, taxRates } = useItemFormContext();
  const { values } = useFormikContext<ItemFormValues>();

  return (
    <div className="page-form__section page-form__section--selling-cost">
      <Row>
        <Col xs={6}>
          {/*------------- Sellable checbox ------------- */}
          <FastField name={'sellable'} type="checkbox">
            {({ field }: { field: CheckboxField }) => {
              const { value, ...fieldRest } = field;
              return (
                <FormGroup inline={true} className={'form-group--sellable'}>
                  <Checkbox
                    inline={true}
                    labelElement={
                      <h3>
                        <T id={'i_sell_this_item'} />
                      </h3>
                    }
                    checked={value}
                    {...fieldRest}
                  />
                </FormGroup>
              );
            }}
          </FastField>

          {/*------------- Selling price ------------- */}
          <FFormGroup
            name={'sell_price'}
            label={intl.get('selling_price')}
            inline={true}
            fastField
          >
            <ControlGroup>
              <InputPrependText text={baseCurrency} />
              <FMoneyInputGroup
                name={'sell_price'}
                shouldUpdate={sellPriceFieldShouldUpdate}
                inputGroupProps={{ fill: true }}
                disabled={!values.sellable}
                fastField
              />
            </ControlGroup>
          </FFormGroup>

          {/*------------- Selling account ------------- */}
          <FFormGroup
            label={intl.get('account')}
            name={'sell_account_id'}
            labelInfo={
              <Hint content={intl.get('item.field.sell_account.hint')} />
            }
            inline={true}
          >
            <AccountsSelect
              name={'sell_account_id'}
              items={accounts}
              placeholder={intl.get('select_account')}
              disabled={!values.sellable}
              filterByParentTypes={[ACCOUNT_PARENT_TYPE.INCOME]}
              fill={true}
              allowCreate={true}
              fastField={true}
              sellable={values.sellable}
              shouldUpdate={sellAccountFieldShouldUpdate}
            />
          </FFormGroup>

          {/*------------- Sell Tax Rate ------------- */}
          <FFormGroup
            name={'sell_tax_rate_id'}
            label={'Tax Rate'}
            inline={true}
          >
            <TaxRatesSelect
              name={'sell_tax_rate_id'}
              items={taxRates}
              allowCreate
            />
          </FFormGroup>

          <FFormGroup
            name={'sell_description'}
            label={intl.get('description')}
            inline={true}
            fastField
          >
            <FTextArea
              name={'sell_description'}
              growVertically={true}
              disabled={!values.sellable}
              fill
              fastField
              shouldUpdate={sellDescriptionFieldShouldUpdate}
            />
          </FFormGroup>
        </Col>

        <Col xs={6}>
          {/*------------- Purchasable checkbox ------------- */}
          <FastField name={'purchasable'} type={'checkbox'}>
            {({ field }: { field: CheckboxField }) => {
              const { value, ...fieldRest } = field;
              return (
                <FormGroup inline={true} className={'form-group--purchasable'}>
                  <Checkbox
                    inline={true}
                    labelElement={
                      <h3>
                        <T id={'i_purchase_this_item'} />
                      </h3>
                    }
                    checked={value}
                    {...fieldRest}
                  />
                </FormGroup>
              );
            }}
          </FastField>

          {/*------------- Cost price ------------- */}
          <FFormGroup
            name={'cost_price'}
            label={intl.get('cost_price')}
            inline={true}
            fastField
          >
            <ControlGroup>
              <InputPrependText text={baseCurrency} />

              <FMoneyInputGroup
                name={'cost_price'}
                shouldUpdate={costPriceFieldShouldUpdate}
                inputGroupProps={{ medium: true }}
                disabled={!values.purchasable}
                fastField
              />
            </ControlGroup>
          </FFormGroup>

          {/*------------- Cost account ------------- */}
          <FFormGroup
            name={'cost_account_id'}
            label={intl.get('account')}
            labelInfo={
              <Hint content={intl.get('item.field.cost_account.hint')} />
            }
            inline={true}
          >
            <AccountsSelect
              name={'cost_account_id'}
              items={accounts}
              placeholder={intl.get('select_account')}
              filterByParentTypes={[ACCOUNT_PARENT_TYPE.EXPENSE]}
              popoverFill={true}
              allowCreate={true}
              fastField={true}
              disabled={!values.purchasable}
              purchasable={values.purchasable}
              shouldUpdate={costAccountFieldShouldUpdate}
            />
          </FFormGroup>

          {/*------------- Purchase Tax Rate ------------- */}
          <FFormGroup
            name={'purchase_tax_rate_id'}
            label={'Tax Rate'}
            inline={true}
          >
            <TaxRatesSelect
              name={'purchase_tax_rate_id'}
              items={taxRates}
              allowCreate={true}
              fastField={true}
              shouldUpdateDeps={{ taxRates }}
              shouldUpdate={taxRateFieldShouldUpdate}
            />
          </FFormGroup>

          <FFormGroup
            name={'purchase_description'}
            label={intl.get('description')}
            className={'form-group--purchase-description'}
            helperText={<ErrorMessage name={'description'} />}
            inline={true}
          >
            <FTextArea
              name={'purchase_description'}
              growVertically={true}
              disabled={!values.purchasable}
              fill
              shouldUpdate={purchaseDescFieldShouldUpdate}
            />
          </FFormGroup>
        </Col>
      </Row>
    </div>
  );
}

export const ItemFormBody = ItemFormBodyInner;
