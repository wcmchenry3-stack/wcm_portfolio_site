import { softSkills, technicalSkills } from '../../data/skills.js'

export function SkillsSection() {
  return (
    <section aria-labelledby="skills-heading" className="bg-brand-light py-14 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="skills-heading"
          className="text-2xl sm:text-3xl font-bold text-brand-dark text-center mb-12"
        >
          Skills &amp; Expertise
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Soft Skills */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-brand-navy mb-4">Soft Skills</h3>
            <ul className="flex flex-wrap gap-2" role="list">
              {softSkills.map((skill) => (
                <li key={skill}>
                  <span className="inline-block bg-brand-navy text-brand-light text-sm font-medium px-3 py-1.5 rounded-full">
                    {skill}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Skills */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-brand-navy mb-4">Technical Skills</h3>
            <ul className="flex flex-wrap gap-2" role="list">
              {technicalSkills.map((skill) => (
                <li key={skill}>
                  <span className="inline-block bg-brand-teal text-white text-sm font-medium px-3 py-1.5 rounded-full">
                    {skill}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
