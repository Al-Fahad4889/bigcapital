// @ts-nocheck
import React from 'react';
import { Classes, Intent, Button } from '@blueprintjs/core';
import { Form, Formik } from 'formik';
import { AppToaster, FFormGroup, FInputGroup, FCheckbox } from '@/components';
import { TaxRatesSelect } from '@/components/TaxRates/TaxRatesSelect';
import { withDialogActions } from '@/containers/Dialog/withDialogActions';
import {
  useCreateTravelServiceType,
  useEditTravelServiceType,
} from '@/hooks/query/travel-service-types/queries';
import { useTravelServiceTypeFormDialogBoot } from './TravelServiceTypeDialogBoot';
import {
  CreateTravelServiceTypeSchema,
  EditTravelServiceTypeSchema,
} from './TravelServiceType.schema';
import { compose } from '@/utils';

const defaultInitialValues = {
  name: '',
  description: '',
  taxRateId: '',
  active: true,
};

function transformToForm(travelServiceType) {
  if (!travelServiceType) return defaultInitialValues;
  return {
    name: travelServiceType.name || '',
    description: travelServiceType.description || '',
    taxRateId: travelServiceType.taxRateId || '',
    active: travelServiceType.active ?? true,
  };
}

function TravelServiceTypeDialogForm({
  closeDialog,
}) {
  const {
    dialogName,
    travelServiceTypeId,
    travelServiceType,
    taxRates,
    isNewMode,
  } = useTravelServiceTypeFormDialogBoot();

  const validationSchema = isNewMode
    ? CreateTravelServiceTypeSchema
    : EditTravelServiceTypeSchema;

  const { mutateAsync: createMutate } = useCreateTravelServiceType();
  const { mutateAsync: editMutate } = useEditTravelServiceType();

  const initialValues = transformToForm(travelServiceType);

  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    const form = {
      ...values,
      taxRateId: values.taxRateId || null,
    };

    const onSuccess = () => {
      closeDialog(dialogName);
      AppToaster.show({
        message: isNewMode
          ? 'The travel service type has been created successfully.'
          : 'The travel service type has been updated successfully.',
        intent: Intent.SUCCESS,
      });
    };

    const onError = (error) => {
      const { response: { data: { errors } } } = error;
      const fields = {};
      if (errors?.find((e) => e.type === 'NAME_NOT_UNIQUE')) {
        fields.name = 'The name is not unique.';
      }
      setErrors({ ...fields });
      setSubmitting(false);
    };

    if (isNewMode) {
      createMutate(form).then(onSuccess).catch(onError);
    } else {
      editMutate([travelServiceTypeId, form]).then(onSuccess).catch(onError);
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
              name={'name'}
              label={'Name'}
              labelInfo={<span className={Classes.TEXT_MUTED}>(required)</span>}
              fastField
            >
              <FInputGroup name={'name'} fastField />
            </FFormGroup>

            <FFormGroup
              name={'description'}
              label={'Description'}
              fastField
            >
              <FInputGroup name={'description'} fastField />
            </FFormGroup>

            <FFormGroup
              name={'taxRateId'}
              label={'VAT Rate'}
              fastField
            >
              <TaxRatesSelect
                name={'taxRateId'}
                items={taxRates || []}
              />
            </FFormGroup>

            <FFormGroup name={'active'} fastField>
              <FCheckbox
                name={'active'}
                label={'Active'}
                fastField
              />
            </FFormGroup>
          </div>

          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <Button
                disabled={isSubmitting}
                onClick={() => closeDialog(dialogName)}
                style={{ minWidth: '75px' }}
              >
                Close
              </Button>
              <Button
                intent={Intent.PRIMARY}
                loading={isSubmitting}
                style={{ minWidth: '95px' }}
                type="submit"
              >
                Submit
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default compose(withDialogActions)(TravelServiceTypeDialogForm);
