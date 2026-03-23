import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18n.js';
import { useHtmlAttributes } from './i18n/useHtmlAttributes.js';
import { Navbar } from './components/layout/Navbar.jsx';
import { Footer } from './components/layout/Footer.jsx';
import Home from './pages/Home.jsx';
import Resume from './pages/Resume.jsx';

function AppContent() {
  useHtmlAttributes();
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-brand-dark font-sans">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Suspense fallback={null}>
        <AppContent />
      </Suspense>
    </I18nextProvider>
  );
}
