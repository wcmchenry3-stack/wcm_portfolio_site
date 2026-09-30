import { describe, it, expect } from 'vitest';
import {
  validate,
  buildMime,
  encodeHeader,
  headerSafe,
  checkWindow,
  hashIp,
} from './lib.js';

const good = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  message: 'Hello Bill, I would love to talk about product leadership.',
  website: '',
  token: 'tok',
};

function memoryKv() {
  const store = new Map();
  return {
    async get(k) {
      return store.has(k) ? JSON.parse(store.get(k)) : null;
    },
    async put(k, v) {
      store.set(k, v);
    },
  };
}

describe('contact worker — validate', () => {
  it('accepts a well-formed submission', () => {
    const r = validate(good);
    expect(r.ok).toBe(true);
    expect(r.value).toEqual({
      name: good.name,
      email: good.email,
      message: good.message,
    });
  });

  it('flags each invalid field', () => {
    const r = validate({ ...good, name: '', email: 'nope', message: 'short' });
    expect(r.ok).toBe(false);
    expect(r.errors).toEqual(['name', 'email', 'message']);
  });

  it('rejects a filled honeypot and a missing Turnstile token', () => {
    expect(validate({ ...good, website: 'spam.biz' }).errors).toContain(
      'website'
    );
    expect(validate({ ...good, token: '' }).errors).toContain('token');
  });

  it('rejects over-long messages', () => {
    expect(validate({ ...good, message: 'x'.repeat(5001) }).ok).toBe(false);
  });
});

describe('contact worker — header safety', () => {
  it('strips CR/LF so a name cannot inject headers', () => {
    expect(headerSafe('Eve\r\nBcc: victim@example.com')).toBe(
      'Eve Bcc: victim@example.com'
    );
    const r = validate({ ...good, name: 'Eve\r\nBcc: x@y.z' });
    expect(r.value.name).not.toMatch(/[\r\n]/);
  });

  it('encodes non-ASCII headers as RFC 2047 words', () => {
    expect(encodeHeader('plain')).toBe('plain');
    expect(encodeHeader('José')).toMatch(/^=\?UTF-8\?B\?.+\?=$/);
  });
});

describe('contact worker — email address validation', () => {
  it('rejects angle brackets in the email address', () => {
    expect(validate({ ...good, email: 'foo@example.com>' }).ok).toBe(false);
    expect(validate({ ...good, email: '<foo@example.com' }).ok).toBe(false);
    expect(validate({ ...good, email: 'foo@example.com>bar' }).ok).toBe(false);
  });
});

describe('contact worker — buildMime', () => {
  const mime = buildMime({
    from: 'contact@billmchenry.org',
    to: 'owner@example.com',
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    message: 'Hi there',
    id: 'abc',
    date: new Date('2026-09-30T12:00:00Z'),
  });

  it('sends from our domain and puts the visitor only in Reply-To', () => {
    expect(mime).toContain('From: "billmchenry.org" <contact@billmchenry.org>');
    expect(mime).toContain('Reply-To: "Ada Lovelace" <ada@example.com>');
    expect(mime).not.toMatch(/^From:.*ada@example\.com/m);
  });

  it('is a plain-text, single-part message (no attachments)', () => {
    expect(mime).toContain('Content-Type: text/plain; charset=utf-8');
    expect(mime).not.toMatch(/multipart/i);
    const body = mime.split('\r\n\r\n')[1].replace(/\r\n/g, '');
    const decoded = new TextDecoder().decode(
      Uint8Array.from(atob(body), (c) => c.charCodeAt(0))
    );
    expect(decoded).toContain('Hi there');
    expect(decoded).toContain('Ada Lovelace <ada@example.com>');
  });
});

describe('contact worker — rate limiting', () => {
  it('allows up to the limit within a window, then blocks', async () => {
    const kv = memoryKv();
    const now = 1_000_000;
    for (let i = 0; i < 3; i++) {
      expect((await checkWindow(kv, 'k', 3, 60_000, now)).allowed).toBe(true);
    }
    const blocked = await checkWindow(kv, 'k', 3, 60_000, now + 1000);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterMs).toBe(59_000);
    expect((await checkWindow(kv, 'k', 3, 60_000, now + 61_000)).allowed).toBe(
      true
    );
  });

  it('hashes IPs to a short, stable, non-reversible key', async () => {
    const a = await hashIp('203.0.113.7');
    expect(a).toMatch(/^[0-9a-f]{16}$/);
    expect(await hashIp('203.0.113.7')).toBe(a);
    expect(a).not.toContain('203');
  });
});
