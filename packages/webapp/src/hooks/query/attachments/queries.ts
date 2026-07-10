import {
  deleteAttachment,
  fetchAttachmentPresignedUrl,
  uploadAttachment,
} from '@bigcapital/sdk-ts';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useApiFetcher } from '../../useRequest';
import { useAuthToken, useAuthOrganizationId } from '../../state/authentication';

type UploadAttachmentResponse = Awaited<ReturnType<typeof uploadAttachment>>;

function toFormData(values: FormData | Record<string, unknown>): FormData {
  if (values instanceof FormData) {
    return values;
  }
  const formData = new FormData();
  const record = values as Record<string, unknown>;
  if (record.file instanceof File) {
    formData.append('file', record.file);
  }
  return formData;
}

export function useUploadAttachments(
  props?: UseMutationOptions<
    UploadAttachmentResponse,
    Error,
    FormData | Record<string, unknown>
  >,
) {
  const fetcher = useApiFetcher();
  const token = useAuthToken();
  const organizationId = useAuthOrganizationId();

  return useMutation({
    ...props,
    mutationFn: (values) => {
      const headers: Record<string, string> = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      if (organizationId) {
        headers['organization-id'] = organizationId;
      }
      return uploadAttachment(fetcher, toFormData(values), { headers });
    },
  });
}

export function useDeleteAttachment(
  props?: UseMutationOptions<void, Error, string>,
) {
  const fetcher = useApiFetcher();
  return useMutation({
    ...props,
    mutationFn: (key: string) => deleteAttachment(fetcher, key),
  });
}

export function useGetPresignedUrlAttachment(
  props?: UseMutationOptions<unknown, Error, string>,
) {
  const fetcher = useApiFetcher();
  return useMutation({
    ...props,
    mutationFn: (key: string) => fetchAttachmentPresignedUrl(fetcher, key),
  });
}
