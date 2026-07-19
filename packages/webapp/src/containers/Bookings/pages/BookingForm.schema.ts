// @ts-nocheck
import * as Yup from 'yup';

export const CreateBookingSchema = Yup.object().shape({
  customerId: Yup.number().required().label('Customer'),
  status: Yup.string().optional(),
  travelDateFrom: Yup.string().nullable(),
  travelDateTo: Yup.string().nullable(),
  agentId: Yup.number().nullable(),
  passengerIds: Yup.array().of(Yup.number()).nullable(),
  notes: Yup.string().nullable(),
});

export const EditBookingSchema = CreateBookingSchema;
