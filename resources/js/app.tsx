import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import TestComponent from './components/TestComponent';

import.meta.glob([
  '../images/**',
  '../fonts/**',
]);

const App = () => {
  return (
    <div>
      <TestComponent />
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

