import { useTranslation } from 'react-i18next';
import { useDateRange } from '../../hooks/useDateRange.js';

/**
 * Renders a single role's date range using the useDateRange hook.
 * Extracted so both single-role and multi-role layouts can reuse it.
 */
function DateRange({ startDate, endDate }) {
  const range = useDateRange(startDate, endDate);
  return <span className="text-brand-muted text-sm shrink-0">{range}</span>;
}

/**
 * Renders one role's title, date range, and bullets. Shared by both the
 * single-role and multi-role layouts in ExperienceItem — the only
 * difference between them is the i18n key prefix each role resolves
 * against.
 *
 * @param {{
 *   title: string,
 *   startDate?: { year: number, month: number },
 *   endDate?: { year: number, month: number } | null,
 *   bullets?: string[],
 *   keyPrefix: string,
 * }} props
 */
function RoleBlock({ title, startDate, endDate, bullets, keyPrefix }) {
  const { t } = useTranslation('resume');
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
        <h4 className="text-base font-semibold text-brand-dark">
          {t(`${keyPrefix}.title`, { defaultValue: title })}
        </h4>
        <DateRange startDate={startDate} endDate={endDate} />
      </div>
      {bullets && bullets.length > 0 && (
        <ul className="list-disc list-outside ms-5 space-y-1.5">
          {bullets.map((bullet, i) => (
            <li
              key={i}
              className="text-brand-dark leading-relaxed text-sm sm:text-base"
            >
              {t(`${keyPrefix}.bullet_${i + 1}`, { defaultValue: bullet })}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/**
 * @param {{
 *   company: string,
 *   location: string,
 *   title?: string,
 *   startDate?: { year: number, month: number },
 *   endDate?: { year: number, month: number } | null,
 *   bullets?: string[],
 *   roles?: Array<{
 *     title: string,
 *     startDate: { year: number, month: number },
 *     endDate: { year: number, month: number } | null,
 *     bullets: string[]
 *   }>
 * }} props
 */
export function ExperienceItem({
  company,
  i18nKey,
  location,
  title,
  startDate,
  endDate,
  bullets,
  roles,
}) {
  const { t } = useTranslation('resume');
  const tLocation = t(`experience.${i18nKey}.location`, {
    defaultValue: location,
  });

  // Normalize a single-role company into a one-element role list so both
  // shapes render through the same RoleBlock. Each role resolves its
  // translations under `experience.<i18nKey>` (single-role) or
  // `experience.<i18nKey>.role_<n>` (multi-role).
  const roleList =
    roles ?? (title ? [{ title, startDate, endDate, bullets }] : []);

  return (
    <article className="mb-8 last:mb-0">
      <h3 className="text-lg font-bold text-brand-navy">
        {company}
        {tLocation && (
          <span className="text-brand-muted font-normal text-sm ms-2">
            &mdash; {tLocation}
          </span>
        )}
      </h3>

      {roleList.length > 0 && (
        <div className="mt-2 space-y-5">
          {roleList.map((role, i) => (
            <RoleBlock
              key={i}
              {...role}
              keyPrefix={
                roles
                  ? `experience.${i18nKey}.role_${i + 1}`
                  : `experience.${i18nKey}`
              }
            />
          ))}
        </div>
      )}
    </article>
  );
}
