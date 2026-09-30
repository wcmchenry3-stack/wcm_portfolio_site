import { useId, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LINKEDIN_URL } from '../../data/brand.js';
import { Button } from '../ui/Button.jsx';
import { useTurnstile } from './useTurnstile.js';

const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || '/api/contact';
const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;

// Mirrors workers/contact/src/lib.js so visitors see errors before sending.
const LIMITS = { name: 100, messageMin: 20, messageMax: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FIELD =
  'w-full px-4 py-3 text-base text-brand-dark bg-white rounded-lg border focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-1';

/** @returns {Set<'name' | 'email' | 'message'>} fields with errors, in form order */
function validate({ name, email, message }) {
  const errors = new Set();
  if (!name.trim() || name.trim().length > LIMITS.name) errors.add('name');
  if (!EMAIL_RE.test(email.trim())) errors.add('email');
  const len = message.trim().length;
  if (len < LIMITS.messageMin || len > LIMITS.messageMax) errors.add('message');
  return errors;
}

/**
 * Contact form posting to the contact Worker (`workers/contact`). No
 * email address is exposed on the site; messages are relayed by the
 * Worker after a Turnstile check and rate limiting.
 *
 * @param {{ siteKey?: string }} props — overrides the build-time
 *   `VITE_TURNSTILE_SITE_KEY` (used by tests).
 */
export function ContactForm({ siteKey = SITE_KEY }) {
  const { t, i18n } = useTranslation('common');
  const id = useId();
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState(() => new Set());
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errorKey, setErrorKey] = useState('');
  const [turnstileRef, turnstile] = useTurnstile(siteKey, i18n.language);

  if (!siteKey || turnstile.failed) {
    return (
      <div className="flex flex-col items-start gap-4">
        <p className="text-brand-ink">{t('contact.form.unavailable')}</p>
        <Button href={LINKEDIN_URL} surface="light">
          {t('contact.form.linkedin')}
        </Button>
      </div>
    );
  }

  if (status === 'sent') {
    return (
      <p
        role="status"
        className="p-6 text-lg bg-white rounded-xl border border-brand-teal text-brand-dark"
      >
        {t('contact.form.success')}
      </p>
    );
  }

  const update = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (errors.has(field)) {
      setErrors((errs) => new Set([...errs].filter((f) => f !== field)));
    }
  };

  async function onSubmit(e) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (found.size > 0) {
      const [first] = found;
      document.getElementById(`${id}-${first}`)?.focus();
      return;
    }
    if (!turnstile.token) {
      setStatus('error');
      setErrorKey('contact.form.verify');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          website: honeypot,
          token: turnstile.token,
        }),
      });
      if (res.ok) {
        setStatus('sent');
        return;
      }
      setStatus('error');
      setErrorKey(
        res.status === 429 ? 'contact.form.rateLimited' : 'contact.form.error'
      );
    } catch {
      setStatus('error');
      setErrorKey('contact.form.error');
    }
    turnstile.reset();
  }

  const fields = [
    { name: 'name', type: 'text', autoComplete: 'name' },
    { name: 'email', type: 'email', autoComplete: 'email' },
  ];

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-6">
      {fields.map((f) => (
        <div key={f.name} className="flex flex-col gap-2">
          <label
            htmlFor={`${id}-${f.name}`}
            className="font-semibold text-brand-dark"
          >
            {t(`contact.form.${f.name}`)}
          </label>
          <input
            id={`${id}-${f.name}`}
            name={f.name}
            type={f.type}
            autoComplete={f.autoComplete}
            required
            maxLength={f.name === 'name' ? LIMITS.name : 254}
            value={f.name === 'name' ? values.name : values.email}
            onChange={update(f.name)}
            aria-invalid={errors.has(f.name) ? 'true' : undefined}
            aria-describedby={
              errors.has(f.name) ? `${id}-${f.name}-error` : undefined
            }
            className={`${FIELD} ${errors.has(f.name) ? 'border-brand-error' : 'border-brand-border'}`}
          />
          {errors.has(f.name) && (
            <p
              id={`${id}-${f.name}-error`}
              className="text-sm text-brand-error"
            >
              {t(`contact.form.${f.name}Error`)}
            </p>
          )}
        </div>
      ))}

      <div className="flex flex-col gap-2">
        <label
          htmlFor={`${id}-message`}
          className="font-semibold text-brand-dark"
        >
          {t('contact.form.message')}
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={7}
          required
          maxLength={LIMITS.messageMax}
          value={values.message}
          onChange={update('message')}
          aria-invalid={errors.has('message') ? 'true' : undefined}
          aria-describedby={`${id}-message-hint${errors.has('message') ? ` ${id}-message-error` : ''}`}
          className={`${FIELD} ${errors.has('message') ? 'border-brand-error' : 'border-brand-border'}`}
        />
        <p id={`${id}-message-hint`} className="text-sm text-brand-ink">
          {t('contact.form.messageHint')}
        </p>
        {errors.has('message') && (
          <p id={`${id}-message-error`} className="text-sm text-brand-error">
            {t('contact.form.messageError')}
          </p>
        )}
      </div>

      {/* Honeypot: hidden from people and assistive tech; bots fill it. */}
      <div
        aria-hidden="true"
        className="absolute -start-[10000px] w-px h-px overflow-hidden"
      >
        <label htmlFor={`${id}-website`}>{t('contact.form.honeypot')}</label>
        <input
          id={`${id}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div ref={turnstileRef} className="min-h-16" />

      {status === 'error' && (
        <p role="alert" className="text-brand-error">
          {t(errorKey)}
        </p>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Button
          type="submit"
          surface="light"
          disabled={status === 'sending'}
          className="self-start disabled:opacity-60"
        >
          {status === 'sending'
            ? t('contact.form.sending')
            : t('contact.form.submit')}
        </Button>
        <p className="text-sm text-brand-ink">{t('contact.form.privacy')}</p>
      </div>
    </form>
  );
}
