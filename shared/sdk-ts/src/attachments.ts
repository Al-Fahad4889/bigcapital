import type { ApiFetcher } from './fetch-utils';
import { paths } from './schema';

export const ATTACHMENTS_ROUTES = {
  LIST: '/api/attachments',
  BY_ID: '/api/attachments/{id}',
  PRESIGNED_URL: '/api/attachments/{id}/presigned-url',
} as const satisfies Record<string, keyof paths>;

/** Response shape from POST /api/attachments (upload). Schema may not define it; server returns { data }. */
export interface UploadAttachmentResponse {
  id: number;
  key: string;
  mimeType: string;
  originName: string;
  size: number;
  createdAt: string;
}

/**
 * Upload an attachment via multipart/form-data.
 * Accepts an optional `init` object with headers (auth tokens) to avoid
 * relying on the openapi-typescript-fetch fetcher's inaccessible closure.
 */
export async function uploadAttachment(
  fetcher: ApiFetcher,
  formData: FormData,
  init?: RequestInit,
): Promise<UploadAttachmentResponse> {
  const url = `${ATTACHMENTS_ROUTES.LIST}`;

  const response = await fetch(url, {
    method: 'POST',
    ...(init ?? {}),
    body: formData,
  });
  if (!response.ok) {
    throw new Error(`Upload attachment failed: ${response.status}`);
  }
  const json = await response.json();
  const data = json?.data as UploadAttachmentResponse | undefined;
  if (!data) {
    throw new Error('Upload attachment: no data in response');
  }
  return data;
}

export async function deleteAttachment(fetcher: ApiFetcher, id: string): Promise<void> {
  const del = fetcher.path(ATTACHMENTS_ROUTES.BY_ID).method('delete').create();
  await del({ id });
}

export async function fetchAttachmentPresignedUrl(
  fetcher: ApiFetcher,
  id: string
): Promise<unknown> {
  const get = fetcher.path(ATTACHMENTS_ROUTES.PRESIGNED_URL).method('get').create();
  const { data } = await get({ id });
  return data;
}
