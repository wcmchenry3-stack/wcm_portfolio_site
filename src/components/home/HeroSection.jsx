import { Link } from 'react-router-dom';

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="bg-brand-dark py-16 sm:py-24"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse sm:flex-row items-center gap-10 sm:gap-16">
          {/* Text content */}
          <div className="flex-1 text-center sm:text-left">
            <p className="text-brand-teal text-sm font-semibold uppercase tracking-widest mb-3">
              Calgary, Alberta
            </p>
            <h1
              id="hero-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-light leading-tight mb-6"
            >
              Crafting Innovative Solutions as a Data-Driven, Problem-Solving
              Product Management Leader
            </h1>
            <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
              <Link
                to="/resume"
                className="inline-flex items-center justify-center min-h-[44px] px-6 py-3 bg-brand-teal text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 focus:ring-offset-brand-dark"
              >
                View Resume
              </Link>
              <a
                href="https://www.linkedin.com/in/bill-mchenry/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect on LinkedIn (opens in new tab)"
                className="inline-flex items-center justify-center min-h-[44px] px-6 py-3 border border-brand-teal text-brand-teal font-semibold rounded-lg hover:bg-brand-navy transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 focus:ring-offset-brand-dark"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>

          {/* Profile photo */}
          <div className="flex-shrink-0">
            <img
              src="/bill-headshot.jpg"
              alt="Bill McHenry, Product Manager"
              className="w-40 h-40 sm:w-52 sm:h-52 rounded-full object-cover border-4 border-brand-teal shadow-lg"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
