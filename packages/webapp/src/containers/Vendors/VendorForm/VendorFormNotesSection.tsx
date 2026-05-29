// @ts-nocheck
import { Box, FFormGroup, FormattedMessage as T, FTextArea } from '@/components';
import { VendorFormSectionTitle } from './VendorFormSectionTitle';
import intl from 'react-intl-universal';

export function VendorFormNotesSection() {
  return (
    <Box data-section-id="notes">
      <VendorFormSectionTitle>
        <T id={'notes'} />
      </VendorFormSectionTitle>

      <FFormGroup name={'note'} label={intl.get('note')} inline fill fastField>
        <FTextArea name={'note'} fill fastField />
      </FFormGroup>
    </Box>
  );
}
