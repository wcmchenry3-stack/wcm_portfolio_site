# Contact Worker

Relays messages from the site's `/contact` form to Bill's inbox without
publishing any email address. Runs on `billmchenry.org/api/contact`
(same origin as the site, so no CORS and no CSP `connect-src` change).

**What protects the inbox**

- **No attachments.** The form only takes name, email and message. The
  Worker builds a single-part `text/plain` email, so nothing executable
  can arrive through it.
- **Cloudflare Turnstile** on every submission, verified server-side.
- **Rate limits** in KV: 3 messages per visitor per hour and 30 per day
  site-wide (IP addresses are hashed, never stored raw).
- **Honeypot field.** Bots that fill it get a fake success and nothing is sent.
- **Origin allowlist, size cap, strict validation.** CR/LF is stripped
  from header fields, so senders can't inject headers.
- **The recipient address exists only as a Worker secret** (`CONTACT_TO`).
  The visitor's address goes in `Reply-To`, so replying works as normal.

## One-time setup

1. **Email Routing.** In the Cloudflare dashboard, open billmchenry.org →
   Email → Email Routing and enable it (Cloudflare adds the MX/SPF
   records). Under **Destination addresses**, add your personal inbox and
   click the verification link it sends. You don't need a routing rule for
   `contact@`. The Worker only _sends_ from that address. Leaving it
   without a rule means mail sent to it bounces, so it can't be spammed.
2. **Turnstile.** Dashboard → Turnstile → Add widget. Hostnames:
   `billmchenry.org`, `www.billmchenry.org` (add `localhost` for local
   testing). Mode: Managed. Copy the site key and the secret key.
3. **Deploy the Worker** (from this folder):

   ```bash
   npx wrangler login
   npx wrangler secret put CONTACT_TO        # your verified destination address
   npx wrangler secret put TURNSTILE_SECRET  # Turnstile secret key
   npx wrangler deploy
   ```

   The KV namespace (`CONTACT_RATE_LIMIT_KV`) already exists and is
   referenced in `wrangler.toml`.

4. **Site build variable.** In Render (and a local `.env.local` if you want
   to test the form), set `VITE_TURNSTILE_SITE_KEY` to the Turnstile _site_
   key, then redeploy the site. Without it, the page shows a LinkedIn
   fallback instead of the form.
5. **Response headers.** Render serves the real headers from its dashboard
   (Settings → Headers). Update the Content-Security-Policy there to match
   `render.yaml`, which adds `https://challenges.cloudflare.com` to
   `script-src` and a `frame-src`. After deploying, load `/contact` and
   confirm the Turnstile checkbox appears. If the browser console reports
   a Cross-Origin-Embedder-Policy block on the Turnstile frame, remove the
   `Cross-Origin-Embedder-Policy` header (the site doesn't need it).

## Testing

`src/lib.js` (validation, MIME building, header safety, rate limiting) is
covered by the site's test suite: `npm run test:run` from the repo root.
For an end-to-end check after deploying, submit the form once and confirm
the email arrives with the visitor in Reply-To.
