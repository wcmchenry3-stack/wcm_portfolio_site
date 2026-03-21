export function ContactBar() {
  return (
    <section
      aria-label="Contact information"
      className="bg-brand-navy py-10"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-brand-light text-lg font-medium mb-4">
          Interested in working together?
        </p>
        <a
          href="https://www.linkedin.com/in/bill-mchenry/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Send a message on LinkedIn (opens in new tab)"
          className="inline-flex items-center justify-center min-h-[44px] gap-2 px-6 py-3 bg-brand-teal text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-navy"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          Get in Touch on LinkedIn
        </a>
      </div>
    </section>
  )
}
