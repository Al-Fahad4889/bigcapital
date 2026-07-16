// @ts-nocheck
import * as Yup from 'yup';

const schema = Yup.object().shape({
  name: Yup.string().required().max(255).label('Name'),
  description: Yup.string().nullable().max(255).label('Description'),
  taxRateId: Yup.number().nullable().label('VAT Rate'),
  active: Yup.boolean().optional().label('Active'),
});

export const CreateTravelServiceTypeSchema = schema;
export const EditTravelServiceTypeSchema = schema;
