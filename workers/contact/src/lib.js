/**
 * Pure helpers for the contact Worker — no Cloudflare runtime imports, so
 * they run under the site's Vitest suite.
 */

export const LIMITS = {
  name: 100,
  email: 254,
  messageMin: 20,
  messageMax: 5000,
};

// Pragmatic address check: one @, a dot in the domain, no whitespace.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Control characters except tab, LF and CR (message bodies keep line breaks).
// eslint-disable-next-line no-control-regex -- matching control chars is the point
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

/** Strip control characters; `headerSafe` also flattens line breaks. */
export function clean(str) {
  return String(str).replace(CONTROL_CHARS, '').trim();
}

/** Single-line header value: control chars and line breaks removed. */
export function headerSafe(str) {
  return clean(str).replace(/[\r\n]+/g, ' ');
}

/**
 * @returns {{ ok: true, value: { name: string, email: string, message: string } }
 *   | { ok: false, errors: string[] }}
 */
export function validate(raw) {
  if (!raw || typeof raw !== 'object') return { ok: false, errors: ['body'] };
  const errors = [];
  const name = headerSafe(raw.name ?? '');
  const email = headerSafe(raw.email ?? '');
  const message = clean(raw.message ?? '').replace(/\r\n?/g, '\n');

  if (!name || name.length > LIMITS.name) errors.push('name');
  if (!EMAIL_RE.test(email) || email.length > LIMITS.email)
    errors.push('email');
  if (message.length < LIMITS.messageMin || message.length > LIMITS.messageMax)
    errors.push('message');
  // Honeypot: real visitors never see or fill this field.
  if (raw.website) errors.push('website');
  if (typeof raw.token !== 'string' || !raw.token) errors.push('token');

  return errors.length
    ? { ok: false, errors }
    : { ok: true, value: { name, email, message } };
}

/** RFC 2047 encoded-word for non-ASCII header text. */
export function encodeHeader(text) {
  if (/^[\x20-\x7E]*$/.test(text)) return text;
  const bytes = new TextEncoder().encode(text);
  return `=?UTF-8?B?${toBase64(bytes)}?=`;
}

function toBase64(bytes) {
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}

/**
 * Plain-text MIME message. The visitor's address goes only in Reply-To;
 * From is always our own domain so Email Routing will deliver it.
 */
export function buildMime({ from, to, name, email, message, id, date }) {
  const body = `${message}\n\n— \n${name} <${email}>\nSent via the billmchenry.org contact form.\n`;
  const b64 = toBase64(new TextEncoder().encode(body)).replace(
    /.{76}/g,
    '$&\r\n'
  );
  return [
    `From: "billmchenry.org" <${from}>`,
    `To: <${to}>`,
    `Reply-To: "${encodeHeader(name.replace(/"/g, "'"))}" <${email}>`,
    `Subject: ${encodeHeader(`[billmchenry.org] Message from ${name}`)}`,
    `Message-ID: <${id}@billmchenry.org>`,
    `Date: ${date.toUTCString()}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=utf-8',
    'Content-Transfer-Encoding: base64',
    '',
    b64,
  ].join('\r\n');
}

/** Short, non-reversible key for an IP address (rate limiting only). */
export async function hashIp(ip) {
  const digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(ip)
  );
  return Array.from(new Uint8Array(digest), (b) =>
    b.toString(16).padStart(2, '0')
  )
    .join('')
    .slice(0, 16);
}

/**
 * Fixed-window counter in KV (same approach as feedback-worker).
 * @returns {Promise<{ allowed: boolean, retryAfterMs?: number }>}
 */
export async function checkWindow(kv, key, max, windowMs, now = Date.now()) {
  let record = { count: 0, windowStart: now };
  const existing = await kv.get(key, { type: 'json' });
  if (existing && now - existing.windowStart < windowMs) record = existing;
  if (record.count >= max) {
    return {
      allowed: false,
      retryAfterMs: windowMs - (now - record.windowStart),
    };
  }
  record.count += 1;
  await kv.put(key, JSON.stringify(record), {
    expirationTtl: Math.max(60, Math.ceil(windowMs / 1000)),
  });
  return { allowed: true };
}
