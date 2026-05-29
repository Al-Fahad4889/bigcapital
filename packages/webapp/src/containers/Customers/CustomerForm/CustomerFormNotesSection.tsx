import { Box, FFormGroup, FormattedMessage as T, FTextArea } from '@/components';
import { CustomerFormSectionTitle } from './CustomerFormSectionTitle';
import intl from 'react-intl-universal';

export function CustomerFormNotesSection() {
  return (
    <Box data-section-id="notes">
      <CustomerFormSectionTitle>
        <T id={'notes'} />
      </CustomerFormSectionTitle>

      <FFormGroup name={'note'} label={intl.get('note')} inline>
        <FTextArea name={'note'} fill />
      </FFormGroup>
    </Box>
  );
}
