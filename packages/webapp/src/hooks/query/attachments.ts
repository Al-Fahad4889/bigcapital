// @ts-nocheck
import { useMutation } from 'react-query';
import useApiRequest from '../useRequest';

/**
 * Uploads the given attachments.
 */
export function useUploadAttachments(props) {
  const apiRequest = useApiRequest();

  return useMutation(
    async (values) => {
      const formData =
        values instanceof FormData
          ? values
          : (() => {
              const fd = new FormData();
              if (values?.file instanceof File) {
                fd.append('file', values.file);
              }
              return fd;
            })();

      const res = await apiRequest.post('attachments', formData);
      const data = res?.data?.data;
      if (!data) {
        throw new Error('Upload attachment: no data in response');
      }
      return data;
    },
    props,
  );
}

/**
 * Deletes the given attachment key.
 */
export function useDeleteAttachment(props) {
  const apiRequest = useApiRequest();

  return useMutation(
    (key: string) => apiRequest.delete(`attachments/${key}`),
    props,
  );
}

/**
 * Uploads the given attachments.
 */
export function useGetPresignedUrlAttachment(props) {
  const apiRequest = useApiRequest();

  return useMutation(
    (key: string) =>
      apiRequest
        .get(`attachments/${key}/presigned-url`)
        .then((res) => res.data),
    props,
  );
}
