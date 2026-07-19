// @ts-nocheck
import React from 'react';
import { Classes, Intent, Button } from '@blueprintjs/core';
import { Form, Formik } from 'formik';
import { AppToaster, FFormGroup, FInputGroup, FormattedMessage as T } from '@/components';
import { withDialogActions } from '@/containers/Dialog/withDialogActions';
import {
  useCreatePassenger,
  useEditPassenger,
} from '@/hooks/query/passengers/queries';
import { usePassengerFormDialogBoot } from './PassengerDialogBoot';
import {
  CreatePassengerSchema,
  EditPassengerSchema,
} from './Passenger.schema';
import { compose } from '@/utils';

const defaultInitialValues = {
  documentNumber: '',
  fullName: '',
  dateOfBirth: '',
  expiresAt: '',
  visaStatus: 'none',
  issuingCountry: '',
  notes: '',
};

function transformToForm(passenger) {
  if (!passenger) return defaultInitialValues;
  const doc = passenger.identityDocument || {};
  return {
    documentNumber: doc.documentNumber || '',
    fullName: doc.fullName || '',
    dateOfBirth: doc.dateOfBirth || '',
    expiresAt: doc.expiresAt || '',
    visaStatus: passenger.visaStatus || 'none',
    issuingCountry: doc.issuingCountry || '',
    notes: passenger.notes || '',
  };
}

function transformToDto(values, customerId, bookingId) {
  return {
    customerId,
    visaStatus: values.visaStatus,
    notes: values.notes || null,
    documentNumber: values.documentNumber,
    fullName: values.fullName,
    issuingCountry: values.issuingCountry || null,
    dateOfBirth: values.dateOfBirth,
    expiresAt: values.expiresAt,
    ...(bookingId ? { bookingId } : {}),
  };
}

function PassengerDialogForm({ closeDialog }) {
  const {
    dialogName,
    passengerId,
    customerId,
    bookingId,
    passenger,
    isNewMode,
  } = usePassengerFormDialogBoot();

  const validationSchema = isNewMode
    ? CreatePassengerSchema
    : EditPassengerSchema;

  const { mutateAsync: createMutate } = useCreatePassenger();
  const { mutateAsync: editMutate } = useEditPassenger();

  const initialValues = transformToForm(passenger);

  const handleSubmit = (values, { setSubmitting }) => {
    const form = transformToDto(values, customerId, bookingId);

    // Client-side expired passport warning
    const warnings: string[] = [];
    if (values.expiresAt) {
      const expiryDate = new Date(values.expiresAt);
      if (expiryDate <= new Date()) {
        warnings.push('Passport is already expired.');
      }
    }

    const onSuccess = (res) => {
      closeDialog(dialogName);
      AppToaster.show({
        message: isNewMode
          ? 'The passenger has been created successfully.'
          : 'The passenger has been updated successfully.',
        intent: Intent.SUCCESS,
      });
      const serverWarnings = res?.data?.warnings;
      const allWarnings = [...warnings, ...(serverWarnings || [])];
      if (allWarnings.length > 0) {
        allWarnings.forEach((w) => {
          AppToaster.show({ message: w.message || w, intent: Intent.WARNING });
        });
      }
    };

    const onError = () => {
      AppToaster.show({
        message: 'Something went wrong.',
        intent: Intent.DANGER,
      });
      setSubmitting(false);
    };

    if (isNewMode) {
      createMutate(form).then(onSuccess).catch(onError);
    } else {
      editMutate([passengerId, form]).then(onSuccess).catch(onError);
    }
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Form>
          <div className={Classes.DIALOG_BODY}>
            <FFormGroup
              name={'fullName'}
              label={<T id={'passenger.label.full_name'} />}
              labelInfo={<span className={Classes.TEXT_MUTED}>(required)</span>}
              fastField
            >
              <FInputGroup name={'fullName'} fastField />
            </FFormGroup>

            <FFormGroup
              name={'documentNumber'}
              label={<T id={'passenger.label.passport_number'} />}
              labelInfo={<span className={Classes.TEXT_MUTED}>(required)</span>}
              fastField
            >
              <FInputGroup name={'documentNumber'} fastField />
            </FFormGroup>

            <FFormGroup
              name={'issuingCountry'}
              label={<T id={'passenger.label.issuing_country'} />}
              fastField
            >
              <FInputGroup name={'issuingCountry'} fastField />
            </FFormGroup>

            <FFormGroup
              name={'dateOfBirth'}
              label={<T id={'passenger.label.date_of_birth'} />}
              labelInfo={<span className={Classes.TEXT_MUTED}>(required)</span>}
              fastField
            >
              <FInputGroup name={'dateOfBirth'} type="date" fastField />
            </FFormGroup>

            <FFormGroup
              name={'expiresAt'}
              label={<T id={'passenger.label.expiry_date'} />}
              labelInfo={<span className={Classes.TEXT_MUTED}>(required)</span>}
              fastField
            >
              <FInputGroup name={'expiresAt'} type="date" fastField />
            </FFormGroup>

            <FFormGroup
              name={'visaStatus'}
              label={<T id={'passenger.label.visa_status'} />}
              fastField
            >
              <FInputGroup name={'visaStatus'} fastField />
            </FFormGroup>

            <FFormGroup
              name={'notes'}
              label={<T id={'bookings.label.notes'} />}
              fastField
            >
              <FInputGroup name={'notes'} fastField />
            </FFormGroup>
          </div>

          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <Button
                disabled={isSubmitting}
                onClick={() => closeDialog(dialogName)}
                style={{ minWidth: '75px' }}
              >
                <T id={'close'} />
              </Button>
              <Button
                intent={Intent.PRIMARY}
                loading={isSubmitting}
                style={{ minWidth: '95px' }}
                type="submit"
              >
                <T id={'submit'} />
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default compose(withDialogActions)(PassengerDialogForm);
