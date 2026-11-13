// SHA-256 hex digest via Web Crypto (no extra dependency).
//
// Used for the local admin gate only: the admin password is stored as a
// SHA-256 hash in localStorage, never as plaintext. The login compares the
// hash of the entered password against the stored hash.

export async function sha256Hex(input: string): Promise<string> {
  if (!globalThis.crypto?.subtle) {
    throw new Error('SHA-256 is unavailable in this browser (a secure context is required).')
  }
  const data = new TextEncoder().encode(input)
  const digest = await globalThis.crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export function isSha256Hex(value: string): boolean {
  return /^[0-9a-f]{64}$/i.test(value)
}
