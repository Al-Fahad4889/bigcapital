// @ts-nocheck
import * as Yup from 'yup';

const schema = Yup.object().shape({
  documentNumber: Yup.string()
    .matches(/^[A-Z0-9]{5,20}$/, 'Passport number must be 5-20 alphanumeric characters')
    .required(),
  fullName: Yup.string().required().max(255),
  dateOfBirth: Yup.date()
    .required()
    .max(new Date(), 'Date of birth must be in the past'),
  expiresAt: Yup.date()
    .required()
    .min(Yup.ref('dateOfBirth'), 'Expiry date must be after date of birth'),
  visaStatus: Yup.string().oneOf(['none', 'pending', 'approved', 'denied', 'expired']),
  issuingCountry: Yup.string().nullable(),
  notes: Yup.string().nullable(),
});

export const CreatePassengerSchema = schema;
export const EditPassengerSchema = schema;
