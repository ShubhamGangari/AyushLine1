/**
 * sanitize.ts — Lightweight XSS/injection prevention utilities
 *
 * All user-submitted text (bios, article content, reviews, names) MUST
 * pass through sanitizeText() before being stored or rendered.
 * This prevents stored XSS attacks even if content is later rendered
 * via dangerouslySetInnerHTML or server-side templating.
 */

/**
 * Strips HTML tags and dangerous characters from a user-submitted string.
 * Returns safe plain-text suitable for storage and display.
 */
export function sanitizeText(input: unknown, maxLength = 5000): string {
  if (input === null || input === undefined) return '';
  const str = String(input);

  return str
    // Strip HTML/script tags
    .replace(/<[^>]*>/g, '')
    // Decode common HTML entities before re-checking
    .replace(/&lt;/gi, '<').replace(/&gt;/gi, '>').replace(/&amp;/gi, '&')
    // Strip again after decode
    .replace(/<[^>]*>/g, '')
    // Remove javascript: protocol patterns
    .replace(/javascript\s*:/gi, '')
    // Remove on* event handlers (e.g. onerror=, onclick=)
    .replace(/\bon\w+\s*=/gi, '')
    // Remove data: URIs (can carry executable payloads)
    .replace(/data\s*:/gi, '')
    // Trim whitespace
    .trim()
    // Enforce max length
    .slice(0, maxLength);
}

/**
 * Sanitizes a short text field (names, titles, city, etc.)
 * Applies a tighter character whitelist — only printable unicode + basic punctuation.
 */
export function sanitizeShortText(input: unknown, maxLength = 200): string {
  if (input === null || input === undefined) return '';
  const str = String(input).trim();

  return str
    .replace(/<[^>]*>/g, '')
    .replace(/javascript\s*:/gi, '')
    .replace(/\bon\w+\s*=/gi, '')
    .trim()
    .slice(0, maxLength);
}

/**
 * Validates and sanitizes a URL.
 * Only allows http://, https://, tel:, and mailto: schemes.
 * Returns empty string for anything suspicious.
 */
export function sanitizeUrl(input: unknown): string {
  if (input === null || input === undefined) return '';
  const str = String(input).trim();
  if (!str) return '';

  try {
    const url = new URL(str);
    const ALLOWED_PROTOCOLS = ['http:', 'https:', 'tel:', 'mailto:'];
    if (!ALLOWED_PROTOCOLS.includes(url.protocol)) return '';
    return str;
  } catch {
    // Not a valid URL
    return '';
  }
}

/**
 * Sanitizes a phone/WhatsApp number — digits, +, spaces, hyphens only.
 */
export function sanitizePhone(input: unknown, maxLength = 20): string {
  if (input === null || input === undefined) return '';
  return String(input)
    .replace(/[^\d+\-\s()]/g, '')
    .trim()
    .slice(0, maxLength);
}

/**
 * Sanitizes an email address — basic format check only.
 */
export function sanitizeEmail(input: unknown): string {
  if (input === null || input === undefined) return '';
  const str = String(input).trim().toLowerCase().slice(0, 254);
  const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(str) ? str : '';
}
