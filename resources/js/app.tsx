import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import Contact from './components/Contact';

// @ts-ignore
import.meta.glob([
  '../images/**',
  '../fonts/**',
]);

const mountBlocks = () => {
  const contactBlocks = document.querySelectorAll('#gardener-contact-block');
  contactBlocks.forEach((block) => {
    if (!block.hasAttribute('data-mounted')) {
      block.setAttribute('data-mounted', 'true');
      const root = createRoot(block);
      root.render(
        <StrictMode>
          <Contact />
        </StrictMode>
      );
    }
  });
};

const init = () => {
  mountBlocks();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

if (typeof (window as any).wp !== 'undefined' && (window as any).wp.domReady) {
  (window as any).wp.domReady(() => {
    mountBlocks();
  });
}

