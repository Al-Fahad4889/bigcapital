// @ts-nocheck
import React, { useMemo } from 'react';
import intl from 'react-intl-universal';
import { Intent, Position } from '@blueprintjs/core';
import { FastField } from 'formik';
import { DateInput } from '@blueprintjs/datetime';
import { Formik, Form } from 'formik';
import { useHistory } from 'react-router-dom';
import { css } from '@emotion/css';

import {
  CustomersSelect,
  FSelect,
  FInputGroup,
  FTextArea,
  FFormGroup,
  Stack,
  FormattedMessage as T,
  AppToaster,
  PageForm,
  DetailsBarSkeletonBase,
} from '@/components';

import {
  momentFormatter,
  tansformDateValue,
  handleDateChange,
} from '@/utils';

import {
  BookingFormPageProvider,
  useBookingFormPageContext,
} from './BookingFormPageProvider';
import { CreateBookingSchema, EditBookingSchema } from './BookingForm.schema';
import { BookingFormTopBar } from './BookingFormTopBar';
import { BookingFormFooter } from './BookingFormFooter';

const defaultInitialValues = {
  customerId: '',
  status: 'draft',
  travelDateFrom: '',
  travelDateTo: '',
  agentId: '',
  passengerIds: [],
  notes: '',
};

function transformToForm(booking) {
  if (!booking) return defaultInitialValues;
  return {
    customerId: booking.customerId || '',
    status: booking.status || 'draft',
    travelDateFrom: booking.travelDateFrom || '',
    travelDateTo: booking.travelDateTo || '',
    agentId: booking.agentId || '',
    passengerIds: (booking.passengers || []).map((p) => p.id),
    notes: booking.notes || '',
  };
}

function BookingFormBody() {
  const { customers, users } = useBookingFormPageContext();

  return (
    <Stack spacing={18} flex={1}>
      <FastField name={'customerId'}>
        {({ form, field: { value }, meta: { error, touched } }) => (
          <FFormGroup
            name={'customerId'}
            label={<T id={'bookings.label.customer'} />}
            labelInfo={<span className={'bp3-text-muted'}>(required)</span>}
            inline={true}
            fastField
          >
            <CustomersSelect
              name={'customerId'}
              customers={customers}
              placeholder={'Select a customer'}
            />
          </FFormGroup>
        )}
      </FastField>

      <FastField name={'status'}>
        {() => (
          <FFormGroup
            name={'status'}
            label={<T id={'bookings.label.status'} />}
            inline={true}
            fastField
          >
            <FSelect
              name={'status'}
              items={[
                { value: 'draft', label: 'Draft' },
                { value: 'confirmed', label: 'Confirmed' },
                { value: 'cancelled', label: 'Cancelled' },
              ]}
              placeholder={'Select status'}
            />
          </FFormGroup>
        )}
      </FastField>

      <FastField name={'travelDateFrom'}>
        {({ form, field: { value }, meta: { error, touched } }) => (
          <FFormGroup
            name={'travelDateFrom'}
            label={<T id={'bookings.label.travel_dates'} />}
            inline={true}
            fastField
          >
            <DateInput
              {...momentFormatter('YYYY/MM/DD')}
              value={tansformDateValue(value)}
              onChange={handleDateChange((formattedDate) => {
                form.setFieldValue('travelDateFrom', formattedDate);
              })}
              popoverProps={{ position: Position.BOTTOM, minimal: true }}
            />
            <span style={{ margin: '0 8px' }}>–</span>
            <FastField name={'travelDateTo'}>
              {({ form, field: { value: toValue } }) => (
                <DateInput
                  {...momentFormatter('YYYY/MM/DD')}
                  value={tansformDateValue(toValue)}
                  onChange={handleDateChange((formattedDate) => {
                    form.setFieldValue('travelDateTo', formattedDate);
                  })}
                  popoverProps={{ position: Position.BOTTOM, minimal: true }}
                />
              )}
            </FastField>
          </FFormGroup>
        )}
      </FastField>

      <FastField name={'agentId'}>
        {() => (
          <FFormGroup
            name={'agentId'}
            label={<T id={'bookings.label.agent'} />}
            inline={true}
            fastField
          >
            <FSelect
              name={'agentId'}
              items={(users || []).map((u) => ({
                value: u.id,
                label: u.full_name || u.email || u.display_name || `User #${u.id}`,
              }))}
              placeholder={'Select an agent'}
              allowClear={true}
            />
          </FFormGroup>
        )}
      </FastField>

      <FastField name={'notes'}>
        {() => (
          <FFormGroup
            name={'notes'}
            label={<T id={'bookings.label.notes'} />}
            inline={true}
            fastField
          >
            <FTextArea name={'notes'} fill={true} />
          </FFormGroup>
        )}
      </FastField>
    </Stack>
  );
}

function BookingForm() {
  const { isNewMode, booking, createBookingMutate } =
    useBookingFormPageContext();

  const history = useHistory();

  const initialValues = useMemo(
    () => (isNewMode ? defaultInitialValues : transformToForm(booking)),
    [isNewMode, booking],
  );

  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    const form = {
      customerId: parseInt(values.customerId, 10),
      status: values.status || 'draft',
      travelDateFrom: values.travelDateFrom || undefined,
      travelDateTo: values.travelDateTo || undefined,
      agentId: values.agentId ? parseInt(values.agentId, 10) : undefined,
      passengerIds: (values.passengerIds || []).map((id) => parseInt(id, 10)),
      notes: values.notes || undefined,
    };

    const onSuccess = () => {
      AppToaster.show({
        message: intl.get('bookings.message.created'),
        intent: Intent.SUCCESS,
      });
      setSubmitting(false);
      history.push('/bookings');
    };

    const onError = ({
      response: {
        data: { errors },
      },
    }) => {
      if (errors) {
        setErrors(errors);
      }
      AppToaster.show({
        message: intl.get('bookings.message.create_failed'),
        intent: Intent.DANGER,
      });
      setSubmitting(false);
    };

    createBookingMutate(form).then(onSuccess).catch(onError);
  };

  return (
    <Formik
      validationSchema={isNewMode ? CreateBookingSchema : EditBookingSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      <Form
        className={css({
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        })}
      >
        <PageForm flex={1}>
          <PageForm.Body>
            <BookingFormTopBar />
            <div style={{ padding: '18px 32px 0' }}>
              <BookingFormBody />
            </div>
          </PageForm.Body>
          <PageForm.Footer>
            <BookingFormFooter />
          </PageForm.Footer>
        </PageForm>
      </Form>
    </Formik>
  );
}

export default function BookingFormPageConnected() {
  return (
    <BookingFormPageProvider>
      <BookingForm />
    </BookingFormPageProvider>
  );
}
