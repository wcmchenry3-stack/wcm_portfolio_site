import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="scroll-mt-20 flex-1 flex items-center justify-center bg-brand-dark px-4"
    >
      <div className="text-center max-w-md">
        <p className="text-6xl font-bold text-brand-teal">404</p>
        <h1 className="mt-4 text-2xl font-semibold text-brand-light">
          Page not found
        </h1>
        <p className="mt-3 text-brand-muted">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 bg-brand-teal text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 focus:ring-offset-brand-dark"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
