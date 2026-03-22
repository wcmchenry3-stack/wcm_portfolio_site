/**
 * @param {{ company: string, location: string, title?: string, period?: string, bullets?: string[], roles?: Array<{ title: string, period: string, bullets: string[] }> }} props
 */
export function ExperienceItem({
  company,
  location,
  title,
  period,
  bullets,
  roles,
}) {
  return (
    <article className="mb-8 last:mb-0">
      <h3 className="text-lg font-bold text-brand-navy">
        {company}
        {location && (
          <span className="text-brand-muted font-normal text-sm ml-2">
            &mdash; {location}
          </span>
        )}
      </h3>

      {/* Single-role company */}
      {!roles && title && (
        <div className="mt-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
            <h4 className="text-base font-semibold text-brand-dark">{title}</h4>
            <span className="text-brand-muted text-sm shrink-0">{period}</span>
          </div>
          {bullets && bullets.length > 0 && (
            <ul className="list-disc list-outside ml-5 space-y-1.5">
              {bullets.map((bullet, i) => (
                <li
                  key={i}
                  className="text-brand-dark leading-relaxed text-sm sm:text-base"
                >
                  {bullet}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Multi-role company */}
      {roles && (
        <div className="mt-2 space-y-5">
          {roles.map((role, i) => (
            <div key={i}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                <h4 className="text-base font-semibold text-brand-dark">
                  {role.title}
                </h4>
                <span className="text-brand-muted text-sm shrink-0">
                  {role.period}
                </span>
              </div>
              {role.bullets && role.bullets.length > 0 && (
                <ul className="list-disc list-outside ml-5 space-y-1.5">
                  {role.bullets.map((bullet, j) => (
                    <li
                      key={j}
                      className="text-brand-dark leading-relaxed text-sm sm:text-base"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
