/**
 * Contact form Worker for billmchenry.org.
 *
 * POST /api/contact  { name, email, message, website (honeypot), token }
 *
 * Checks, in order: same-site Origin, JSON body, field validation,
 * Cloudflare Turnstile, per-IP and site-wide rate limits. Then sends a
 * plain-text email to CONTACT_TO through Email Routing. No attachments
 * are accepted, and the recipient address lives only in a Worker secret.
 */
import { EmailMessage } from 'cloudflare:email';
import { validate, buildMime, hashIp, checkWindow } from './lib.js';

const PER_IP = { max: 3, windowMs: 60 * 60 * 1000 }; // 3 per hour per visitor
const SITE_WIDE = { max: 30, windowMs: 24 * 60 * 60 * 1000 }; // 30 per day total
const SITEVERIFY = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname !== '/api/contact') {
      return json({ error: 'not_found' }, 404);
    }
    if (request.method !== 'POST') {
      return json({ error: 'method_not_allowed' }, 405, { Allow: 'POST' });
    }
    return handleContact(request, env);
  },
};

async function handleContact(request, env) {
  const allowed = (env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  if (!allowed.includes(request.headers.get('Origin') || '')) {
    return json({ error: 'forbidden' }, 403);
  }
  if (
    !(request.headers.get('Content-Type') || '').includes('application/json')
  ) {
    return json({ error: 'unsupported_media_type' }, 415);
  }
  if (Number(request.headers.get('Content-Length') || 0) > 16_384) {
    return json({ error: 'too_large' }, 413);
  }

  let raw;
  try {
    raw = await request.json();
  } catch {
    return json({ error: 'invalid_json' }, 400);
  }
  const result = validate(raw);
  if (!result.ok) {
    // A filled honeypot gets a fake success so bots learn nothing.
    if (result.errors.includes('website')) return json({ ok: true }, 200);
    return json({ error: 'invalid', fields: result.errors }, 400);
  }

  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const human = await verifyTurnstile(env.TURNSTILE_SECRET, raw.token, ip);
  if (!human) return json({ error: 'verification_failed' }, 403);

  const ipLimit = await checkWindow(
    env.RATE_LIMIT_KV,
    `contact:ip:${await hashIp(ip)}`,
    PER_IP.max,
    PER_IP.windowMs
  );
  const siteLimit = ipLimit.allowed
    ? await checkWindow(
        env.RATE_LIMIT_KV,
        'contact:site',
        SITE_WIDE.max,
        SITE_WIDE.windowMs
      )
    : ipLimit;
  if (!siteLimit.allowed) {
    return json({ error: 'rate_limited' }, 429, {
      'Retry-After': String(Math.ceil(siteLimit.retryAfterMs / 1000)),
    });
  }

  const { name, email, message } = result.value;
  const mime = buildMime({
    from: env.CONTACT_FROM,
    to: env.CONTACT_TO,
    name,
    email,
    message,
    id: crypto.randomUUID(),
    date: new Date(),
  });
  try {
    await env.CONTACT_EMAIL.send(
      new EmailMessage(env.CONTACT_FROM, env.CONTACT_TO, mime)
    );
  } catch (err) {
    console.error('send failed:', err.message);
    return json({ error: 'send_failed' }, 502);
  }
  return json({ ok: true }, 200);
}

async function verifyTurnstile(secret, token, ip) {
  const form = new FormData();
  form.append('secret', secret);
  form.append('response', token);
  form.append('remoteip', ip);
  try {
    const res = await fetch(SITEVERIFY, { method: 'POST', body: form });
    const data = await res.json();
    return data.success === true;
  } catch {
    return false;
  }
}

function json(data, status, extra = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      ...extra,
    },
  });
}
