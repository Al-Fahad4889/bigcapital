import {
  FormGroup,
  RadioGroup,
  Radio,
  Position,
  Checkbox,
  Tooltip,
  Intent,
} from '@blueprintjs/core';
import classNames from 'classnames';
import { ErrorMessage, FastField } from 'formik';
import React, { useRef, useEffect } from 'react';
import intl from 'react-intl-universal';
import { useItemFormContext } from './ItemFormProvider';
import { ItemFormSectionTitle } from './ItemFormSectionTitle';
import {
  FieldRequiredHint,
  FormattedMessage as T,
  FFormGroup,
  FSelect,
  FInputGroup,
  Box,
} from '@/components';
import { handleStringChange } from '@/utils';

type RadioFieldRenderArg = {
  form: { setFieldValue: (field: string, value: unknown) => void };
  field: { value: string };
  meta: { touched: boolean; error?: string };
};

type CheckboxField = {
  name: string;
  value: boolean;
  onChange: (e: unknown) => void;
  onBlur: (e: unknown) => void;
};

export function ItemFormBasicSection() {
  const { isNewMode, item, itemsCategories } = useItemFormContext();
  const nameFieldRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (nameFieldRef.current) {
      nameFieldRef.current.focus();
    }
  }, []);

  const itemTypeHintContent = (
    <>
      <div className="mb1">
        <span dangerouslySetInnerHTML={{ __html: intl.formatHTMLMessage({ id: 'services_that_you_provide_to_customers' }) }} />
      </div>
      <div className="mb1">
        <span dangerouslySetInnerHTML={{ __html: intl.formatHTMLMessage({ id: 'products_you_buy_and_or_sell' }) }} />
      </div>
    </>
  );

  return (
    <Box data-section-id="primary">
      <ItemFormSectionTitle>Basic details</ItemFormSectionTitle>

      {/*----------- Item type ----------*/}
      <FastField name={'type'}>
        {({
          form,
          field: { value },
          meta: { touched, error },
        }: RadioFieldRenderArg) => (
          <FormGroup
            label={intl.get('item_type')}
            labelInfo={
              <span>
                <FieldRequiredHint />
                <Tooltip
                  content={itemTypeHintContent}
                  position={Position.BOTTOM_LEFT}
                />
              </span>
            }
            className={classNames('form-group--item-type')}
            intent={touched && error ? Intent.DANGER : undefined}
            helperText={<ErrorMessage name="item_type" />}
            inline={true}
          >
            <RadioGroup
              inline={true}
              onChange={handleStringChange((_value: string) => {
                form.setFieldValue('type', _value);
              })}
              selectedValue={value}
              disabled={!isNewMode && item?.type === 'inventory'}
            >
              <Radio label={intl.get('service')} value="service" />
              <Radio label={intl.get('inventory')} value="inventory" />
            </RadioGroup>
          </FormGroup>
        )}
      </FastField>

      {/*----------- Item name ----------*/}
      <FFormGroup
        name={'name'}
        label={<T id={'item_name'} />}
        labelInfo={<FieldRequiredHint />}
        inline={true}
        fastField
      >
        <FInputGroup
          name={'name'}
          inputRef={(ref: HTMLInputElement | null) => {
            nameFieldRef.current = ref;
          }}
          fastField
          fill
        />
      </FFormGroup>

      {/*----------- SKU ----------*/}
      <FFormGroup
        name={'code'}
        label={<T id={'item_code'} />}
        inline={true}
        fastField
      >
        <FInputGroup name={'code'} fastField fill />
      </FFormGroup>

      {/*----------- Item category ----------*/}
      <FFormGroup
        name={'category_id'}
        label={<T id={'category'} />}
        inline={true}
      >
        <FSelect
          name={'category_id'}
          items={itemsCategories}
          valueAccessor={'id'}
          textAccessor={'name'}
          placeholder={<T id={'select_category'} />}
          popoverProps={{ minimal: true, captureDismiss: true }}
          fill
        />
      </FFormGroup>

      {/*----------- Active ----------*/}
      <FastField name={'active'} type={'checkbox'}>
        {({ field }: { field: CheckboxField }) => {
          const { value, ...fieldRest } = field;
          return (
            <FormGroup inline={true} className={classNames('form-group--active')}>
              <Checkbox
                inline={true}
                labelElement={<T id={'active'} />}
                checked={value}
                {...fieldRest}
              />
            </FormGroup>
          );
        }}
      </FastField>
    </Box>
  );
}
