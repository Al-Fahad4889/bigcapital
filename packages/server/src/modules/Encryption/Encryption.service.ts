import { Inject, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { createSecretKey, KeyObject } from 'crypto';

export interface EncryptedPayload {
  c: string;  // ciphertext (base64)
  n: string;  // nonce (base64)
  t: string;  // auth tag (base64)
  kv: number; // key version — enables future key rotation
}

let encryptionKey: KeyObject | null = null;

export function setEncryptionKey(hexKey: string): void {
  const decoded = Buffer.from(hexKey, 'hex');
  if (decoded.length !== 32) {
    throw new Error('ENCRYPTION_KEY must be 64 hex characters (32 bytes)');
  }
  encryptionKey = createSecretKey(decoded);
}

function assertKeyInitialized(): void {
  if (!encryptionKey) {
    throw new Error('EncryptionService not initialized. Call setEncryptionKey() first.');
  }
}

export function encryptField(plaintext: string): string {
  assertKeyInitialized();
  const nonce = new Uint8Array(crypto.randomBytes(12));
  const cipher = crypto.createCipheriv('aes-256-gcm', encryptionKey, nonce);
  let ciphertext = cipher.update(plaintext, 'utf8', 'base64');
  ciphertext += cipher.final('base64');
  const authTag = cipher.getAuthTag().toString('base64');
  return JSON.stringify({ c: ciphertext, n: Buffer.from(nonce).toString('base64'), t: authTag, kv: 1 });
}

export function decryptField(encryptedJson: string): string {
  assertKeyInitialized();
  let parsed: EncryptedPayload;
  try {
    parsed = JSON.parse(encryptedJson);
  } catch {
    throw new Error('Invalid encrypted payload: not valid JSON');
  }
  const { c, n, t } = parsed;
  if (!c || !n || !t) {
    throw new Error('Invalid encrypted payload: missing required fields');
  }
  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    encryptionKey,
    new Uint8Array(Buffer.from(n, 'base64')),
  );
  decipher.setAuthTag(new Uint8Array(Buffer.from(t, 'base64')));
  let plaintext = decipher.update(c, 'base64', 'utf8');
  plaintext += decipher.final('utf8');
  return plaintext;
}

export function hashValue(value: string): string {
  return crypto.createHash('sha256').update(value).digest('hex');
}

export function maskValue(value: string): string {
  if (!value) return value;
  if (value.length <= 4) return '*'.repeat(value.length - 1) + value.slice(-1);
  return '*'.repeat(value.length - 4) + value.slice(-4);
}

@Injectable()
export class EncryptionService {
  constructor(@Inject('ENCRYPTION_KEY') key: string) {
    setEncryptionKey(key);
  }

  encryptField = encryptField;
  decryptField = decryptField;
  hashValue = hashValue;
  maskValue = maskValue;
}
