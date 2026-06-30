import { randomBytes } from "crypto";

// Crockford base32 alphabet (no I, L, O, U to avoid ambiguity).
const ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

/**
 * Encode bytes as Crockford base32 (no padding).
 */
function encodeBase32(bytes: Buffer): string {
  let bits = 0;
  let value = 0;
  let output = "";

  for (const byte of bytes) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      output += ALPHABET[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }

  if (bits > 0) {
    output += ALPHABET[(value << (5 - bits)) & 31];
  }

  return output;
}

/**
 * Generate an unguessable payment reference tag.
 *
 * Uses cryptographically secure randomness, independent of the database row id,
 * so the tag cannot be guessed or brute-forced. We take 25 base32 chars (125 bits
 * of entropy) for clean 5-char grouping: MERC-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX.
 */
export function generateReferenceTag(): string {
  const raw = encodeBase32(randomBytes(16)).slice(0, 25); // 125 bits, 5 even groups
  const groups = raw.match(/.{1,5}/g) ?? [raw];
  return `MERC-${groups.join("-")}`;
}

/**
 * Normalize user-entered tags for tolerant lookups: drop separators/whitespace,
 * uppercase. The stored tag is compared after the same normalization.
 */
export function normalizeTag(input: string): string {
  return input.replace(/[\s-]/g, "").toUpperCase();
}
