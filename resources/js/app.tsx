import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';

import.meta.glob([
  '../images/**',
  '../fonts/**',
]);

const App = () => {
  return (
    <div>
      <Header onConsultationClick={() => {}} />
      <Hero onConsultationClick={() => {}} />
      <Services />
    </div>
  );
};

const container = document.getElementById('app');
if (container) {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

