import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { caseStudies, getCaseStudy } from '../data/caseStudies.js';
import { featuredProjects } from '../data/projects.js';
import { Container } from '../components/ui/Container.jsx';
import { PageMain } from '../components/ui/PageMain.jsx';
import NotFound from './NotFound.jsx';

const range = (n) => Array.from({ length: n }, (_, i) => i + 1);

const TEXT_LINK =
  'rounded focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2';

/** Section heading block: numbered eyebrow + display h2. */
function SectionHeader({ id, index, label, children }) {
  return (
    <>
      <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-teal-text">
        {String(index).padStart(2, '0')} · {label}
      </p>
      <h2
        id={`${id}-heading`}
        className="mb-4 font-display text-2xl sm:text-4xl font-semibold leading-tight tracking-tight text-brand-dark"
      >
        {children}
      </h2>
    </>
  );
}

/**
 * Renders one case-study section's body by `type` (see
 * src/data/caseStudies.js). `k` is the section's key prefix in the
 * `work` namespace, e.g. `bookshelfai.problem`.
 */
function SectionBody({ section, k, t }) {
  const intro = t(`${k}.intro`, { defaultValue: '' });
  const introEl = intro && (
    <p className="max-w-3xl mb-8 text-lg leading-relaxed text-brand-ink">
      {intro}
    </p>
  );

  switch (section.type) {
    case 'cards':
      return (
        <>
          {introEl}
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-5" role="list">
            {range(section.items).map((n) => (
              <li
                key={n}
                className="p-6 bg-white rounded-xl border border-brand-border"
              >
                <h3 className="mb-2 text-lg font-semibold text-brand-dark">
                  {t(`${k}.item_${n}.title`)}
                </h3>
                <p className="leading-relaxed text-brand-ink">
                  {t(`${k}.item_${n}.body`)}
                </p>
              </li>
            ))}
          </ul>
        </>
      );
    case 'rows':
      return (
        <dl className="border-t border-brand-border">
          {range(section.items).map((n) => (
            <div
              key={n}
              className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-8 py-6 border-b border-brand-border"
            >
              <dt className="text-lg font-semibold text-brand-dark">
                {t(`${k}.item_${n}.title`)}
              </dt>
              <dd className="md:col-span-2 leading-relaxed text-brand-ink">
                {t(`${k}.item_${n}.body`)}
              </dd>
            </div>
          ))}
        </dl>
      );
    case 'system':
      return (
        <>
          {introEl}
          {section.nodes > 0 && (
            <figure className="mb-8 p-6 sm:p-8 bg-white rounded-2xl border border-brand-border">
              <figcaption className="sr-only">
                {t('caseStudy.diagramLabel')}
              </figcaption>
              <ol className="flex flex-col lg:flex-row lg:items-stretch gap-3">
                {range(section.nodes).map((n) => (
                  <li
                    key={n}
                    className="flex flex-col lg:flex-row lg:flex-1 items-center gap-3"
                  >
                    <div className="flex flex-col justify-center w-full h-full p-4 text-center rounded-xl border-2 border-brand-dark">
                      <span className="font-semibold text-brand-dark">
                        {t(`${k}.node_${n}.title`)}
                      </span>
                      <span className="text-sm text-brand-ink">
                        {t(`${k}.node_${n}.detail`)}
                      </span>
                    </div>
                    {n < section.nodes && (
                      <span
                        aria-hidden="true"
                        className="text-xl text-brand-muted rotate-90 lg:rotate-0 rtl:lg:rotate-180"
                      >
                        →
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </figure>
          )}
          <ul
            className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3"
            role="list"
          >
            {range(section.bullets).map((n) => (
              <li
                key={n}
                className="flex gap-3 leading-relaxed text-brand-dark"
              >
                <span
                  aria-hidden="true"
                  className="font-bold text-brand-teal-text"
                >
                  —
                </span>
                {t(`${k}.bullet_${n}`)}
              </li>
            ))}
          </ul>
        </>
      );
    case 'table':
      return (
        <div className="overflow-x-auto rounded-xl border border-brand-border bg-white">
          <table className="w-full min-w-xl text-start">
            <thead className="bg-brand-light">
              <tr>
                {['question', 'decision', 'why'].map((col) => (
                  <th
                    key={col}
                    scope="col"
                    className="px-5 py-4 text-start font-semibold text-brand-dark"
                  >
                    {t(`caseStudy.col.${col}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {range(section.rows).map((n) => (
                <tr key={n} className="border-t border-brand-border align-top">
                  <th
                    scope="row"
                    className="px-5 py-4 text-start font-medium text-brand-dark"
                  >
                    {t(`${k}.row_${n}.question`)}
                  </th>
                  <td className="px-5 py-4 leading-relaxed text-brand-ink">
                    {t(`${k}.row_${n}.decision`)}
                  </td>
                  <td className="px-5 py-4 leading-relaxed text-brand-ink">
                    {t(`${k}.row_${n}.why`)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'prose':
      return (
        <div className="flex flex-col gap-4 max-w-3xl text-lg leading-relaxed text-brand-dark">
          {range(section.paragraphs).map((n) => (
            <p key={n}>{t(`${k}.para_${n}`)}</p>
          ))}
        </div>
      );
    case 'checklist':
      return (
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3"
          role="list"
        >
          {range(section.items).map((n) => (
            <li key={n} className="flex gap-3 text-brand-subtle">
              <span aria-hidden="true" className="text-brand-accent">
                ✓
              </span>
              {t(`${k}.item_${n}`)}
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}

export default function CaseStudy() {
  const { slug } = useParams();
  const { t } = useTranslation('work');
  const { t: tHome } = useTranslation('home');
  const study = getCaseStudy(slug);

  if (!study) return <NotFound />;

  const project = featuredProjects.find((p) => p.id === study.id);
  const next =
    caseStudies[(caseStudies.indexOf(study) + 1) % caseStudies.length];

  return (
    <PageMain className="bg-brand-light">
      <section aria-labelledby="case-heading" className="bg-brand-dark">
        <Container className="pt-10 sm:pt-14 pb-12 sm:pb-16">
          <nav aria-label={t('caseStudy.breadcrumbLabel')} className="mb-8">
            <ol className="flex gap-2 text-sm text-brand-faint">
              <li>
                <Link
                  to="/work"
                  className={`text-brand-subtle hover:text-brand-accent ${TEXT_LINK} focus:ring-offset-brand-dark`}
                >
                  {t('page.title')}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{study.name}</li>
            </ol>
          </nav>
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            <div className="flex-1">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-accent">
                {t('caseStudy.eyebrow')} · {t(`${study.id}.eyebrow`)}
              </p>
              <h1
                id="case-heading"
                className="mb-4 font-display text-5xl sm:text-6xl font-semibold tracking-tight text-brand-light"
              >
                {study.name}
              </h1>
              <p className="mb-5 font-display text-2xl sm:text-3xl leading-snug text-brand-light">
                {t(`${study.id}.tagline`)}
              </p>
              <p className="max-w-2xl text-lg leading-relaxed text-brand-subtle">
                {t(`${study.id}.summary`)}
              </p>
            </div>
            <dl className="flex flex-col gap-5 lg:w-80 shrink-0 self-start p-6 rounded-2xl border border-brand-rule bg-brand-panel">
              <div>
                <dt className="mb-1 text-xs font-semibold uppercase tracking-widest text-brand-faint">
                  {t('caseStudy.roleLabel')}
                </dt>
                <dd className="text-brand-light">{t(`${study.id}.role`)}</dd>
              </div>
              <div>
                <dt className="mb-1 text-xs font-semibold uppercase tracking-widest text-brand-faint">
                  {t('caseStudy.platformsLabel')}
                </dt>
                <dd className="text-brand-light">
                  {t(`${study.id}.platforms`)}
                </dd>
              </div>
              <div>
                <dt className="mb-1 text-xs font-semibold uppercase tracking-widest text-brand-faint">
                  {t('caseStudy.stackLabel')}
                </dt>
                <dd className="text-brand-light">{study.stack}</dd>
              </div>
              <div>
                <a
                  href={study.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center min-h-touch font-semibold text-brand-accent hover:underline ${TEXT_LINK} focus:ring-offset-brand-panel`}
                >
                  {t('caseStudy.viewSource')}
                  <span aria-hidden="true">&nbsp;↗</span>
                  <span className="sr-only">
                    {' '}
                    {t('caseStudy.opensInNewTab')}
                  </span>
                </a>
              </div>
            </dl>
          </div>

          {project?.images.length > 0 && (
            <div className="mt-12">
              <h2 className="sr-only">{t('caseStudy.screensLabel')}</h2>
              <ul
                className="flex justify-center items-end gap-4 sm:gap-7"
                role="list"
              >
                {project.images.map((image, i) => (
                  <li
                    key={image.src}
                    className={i === 2 ? 'hidden sm:block' : ''}
                  >
                    <img
                      src={image.src}
                      alt={tHome(`work.${project.id}.image_${i + 1}`, {
                        defaultValue: image.alt,
                      })}
                      width="390"
                      height="844"
                      className="w-36 sm:w-52 rounded-3xl border-[6px] border-brand-rule"
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </section>

      <nav
        aria-label={t('caseStudy.onThisPage')}
        className="bg-white border-b border-brand-border"
      >
        <Container>
          <ol className="flex gap-1 overflow-x-auto text-sm font-medium">
            {study.sections.map((section, i) => (
              <li key={section.key} className="shrink-0">
                <a
                  href={`#${section.key}`}
                  className={`inline-flex items-center min-h-touch px-3 text-brand-ink hover:text-brand-teal-text ${TEXT_LINK}`}
                >
                  {String(i + 1).padStart(2, '0')}{' '}
                  {t(`caseStudy.section.${section.key}`)}
                </a>
              </li>
            ))}
          </ol>
        </Container>
      </nav>

      <Container className="flex flex-col gap-16 sm:gap-24 py-16 sm:py-24">
        {study.sections.map((section, i) => {
          const k = `${study.id}.${section.key}`;
          const isBuilt = section.type === 'checklist';
          return (
            <section
              key={section.key}
              id={section.key}
              aria-labelledby={`${section.key}-heading`}
              className={`scroll-mt-24 ${
                isBuilt ? 'p-8 sm:p-12 bg-brand-dark rounded-2xl' : ''
              }`}
            >
              {isBuilt ? (
                <>
                  <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-accent">
                    {String(i + 1).padStart(2, '0')} ·{' '}
                    {t(`caseStudy.section.${section.key}`)}
                  </p>
                  <h2
                    id={`${section.key}-heading`}
                    className="mb-8 font-display text-2xl sm:text-4xl font-semibold leading-tight tracking-tight text-brand-light"
                  >
                    {t(`${k}.heading`)}
                  </h2>
                </>
              ) : (
                <SectionHeader
                  id={section.key}
                  index={i + 1}
                  label={t(`caseStudy.section.${section.key}`)}
                >
                  {t(`${k}.heading`)}
                </SectionHeader>
              )}
              <SectionBody section={section} k={k} t={t} />
            </section>
          );
        })}

        <Link
          to={`/work/${next.id}`}
          className={`flex justify-between items-center gap-6 pt-8 border-t border-brand-border group ${TEXT_LINK}`}
        >
          <span className="flex flex-col gap-1">
            <span className="text-sm font-semibold uppercase tracking-widest text-brand-ink">
              {t('caseStudy.nextLabel')}
            </span>
            <span className="font-display text-3xl font-semibold text-brand-dark group-hover:text-brand-teal-text">
              {next.name}
            </span>
          </span>
          <span
            aria-hidden="true"
            className="text-3xl text-brand-teal-text rtl:rotate-180"
          >
            →
          </span>
        </Link>
      </Container>
    </PageMain>
  );
}
