import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../test/i18nTestInstance.js';
import { ContactForm } from '../components/contact/ContactForm.jsx';
import Contact from './Contact.jsx';

function renderForm(props = { siteKey: 'test-site-key' }) {
  return render(
    <I18nextProvider i18n={i18n}>
      <MemoryRouter>
        <ContactForm {...props} />
      </MemoryRouter>
    </I18nextProvider>
  );
}

function fill({
  name = 'Ada Lovelace',
  email = 'ada@example.com',
  message = 'Hello Bill, I would love to talk about product.',
} = {}) {
  fireEvent.change(screen.getByLabelText(/^name$/i), {
    target: { value: name },
  });
  fireEvent.change(screen.getByLabelText(/^email$/i), {
    target: { value: email },
  });
  fireEvent.change(screen.getByLabelText(/^message$/i), {
    target: { value: message },
  });
}

describe('Contact page', () => {
  it('has a main landmark and an h1', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter>
          <Contact />
        </MemoryRouter>
      </I18nextProvider>
    );
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content');
    expect(
      screen.getByRole('heading', { level: 1, name: /get in touch/i })
    ).toBeInTheDocument();
  });
});

describe('ContactForm', () => {
  beforeEach(() => {
    // Stand-in Turnstile: issues a token as soon as the widget renders.
    window.turnstile = {
      render: vi.fn((_el, opts) => {
        opts.callback('turnstile-token');
        return 'widget-1';
      }),
      reset: vi.fn(),
      remove: vi.fn(),
    };
    globalThis.fetch = vi.fn();
  });
  afterEach(() => {
    delete window.turnstile;
    vi.restoreAllMocks();
  });

  it('falls back to LinkedIn when no Turnstile site key is configured', () => {
    renderForm({ siteKey: '' });
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /message on linkedin/i })
    ).toBeInTheDocument();
  });

  it('labels every field and offers no file upload', () => {
    const { container } = renderForm();
    expect(screen.getByLabelText(/^name$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^email$/i)).toHaveAttribute('type', 'email');
    expect(screen.getByLabelText(/^message$/i).tagName).toBe('TEXTAREA');
    expect(container.querySelector('input[type="file"]')).toBeNull();
  });

  it('shows field errors and does not send an invalid form', () => {
    renderForm();
    fill({ name: '', email: 'not-an-email', message: 'too short' });
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    expect(screen.getByLabelText(/^name$/i)).toHaveAttribute(
      'aria-invalid',
      'true'
    );
    expect(screen.getByLabelText(/^email$/i)).toHaveAttribute(
      'aria-invalid',
      'true'
    );
    expect(screen.getByLabelText(/^message$/i)).toHaveAttribute(
      'aria-invalid',
      'true'
    );
    expect(
      screen.getByText(/enter a valid email address/i)
    ).toBeInTheDocument();
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it('posts the message with the Turnstile token and shows success', async () => {
    globalThis.fetch.mockResolvedValue({ ok: true, status: 200 });
    renderForm();
    await waitFor(() => expect(window.turnstile.render).toHaveBeenCalled());
    fill();
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    await waitFor(() =>
      expect(screen.getByRole('status')).toHaveTextContent(/on its way/i)
    );
    const [url, init] = globalThis.fetch.mock.calls[0];
    expect(url).toBe('/api/contact');
    expect(JSON.parse(init.body)).toEqual({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      message: 'Hello Bill, I would love to talk about product.',
      website: '',
      token: 'turnstile-token',
    });
  });

  it('explains rate limiting and resets the Turnstile widget', async () => {
    globalThis.fetch.mockResolvedValue({ ok: false, status: 429 });
    renderForm();
    await waitFor(() => expect(window.turnstile.render).toHaveBeenCalled());
    fill();
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent(/try again later/i)
    );
    expect(window.turnstile.reset).toHaveBeenCalledWith('widget-1');
  });
});
