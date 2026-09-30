import { useEffect, useRef, useState } from 'react';

const SCRIPT_SRC =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

let scriptPromise;

/** Loads the Turnstile script once per page, on first use. */
function loadTurnstile() {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  scriptPromise ??= new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve(window.turnstile);
    script.onerror = () => {
      scriptPromise = undefined;
      reject(new Error('turnstile_load_failed'));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

/**
 * Renders a Cloudflare Turnstile widget into the returned ref and tracks
 * its token. `reset()` asks for a fresh token (tokens are single-use).
 * Returns `[ref, { token, failed, reset }]` — the ref is kept separate so
 * callers never read it during render.
 *
 * @param {string | undefined} siteKey
 * @param {string} language — BCP 47 code for the widget's own text
 */
export function useTurnstile(siteKey, language) {
  const ref = useRef(null);
  const widgetId = useRef(null);
  const [token, setToken] = useState('');
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!siteKey || !ref.current) return undefined;
    let cancelled = false;
    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !ref.current) return;
        widgetId.current = turnstile.render(ref.current, {
          sitekey: siteKey,
          language,
          callback: setToken,
          'expired-callback': () => setToken(''),
          'error-callback': () => setToken(''),
        });
      })
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
      if (widgetId.current !== null) window.turnstile?.remove(widgetId.current);
      widgetId.current = null;
    };
  }, [siteKey, language]);

  const reset = () => {
    setToken('');
    if (widgetId.current !== null) window.turnstile?.reset(widgetId.current);
  };

  return [ref, { token, failed, reset }];
}
