import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import ServicesBlock from './components/blocks/ServicesBlock';

// @ts-ignore
import.meta.glob([
  '../images/**',
  '../fonts/**',
]);

const mountBlocks = () => {
  const servicesBlocks = document.querySelectorAll('.gardener-services-block');
  servicesBlocks.forEach((block) => {
    if (block.id && !block.hasAttribute('data-mounted')) {
      block.setAttribute('data-mounted', 'true');
      const root = createRoot(block);
      root.render(
        <StrictMode>
          <ServicesBlock blockId={block.id} />
        </StrictMode>
      );
    }
  });
};

const initHeroBlocks = () => {
  const consultationBtns = document.querySelectorAll('.gardener-hero-block [data-consultation-btn]');
  consultationBtns.forEach((btn) => {
    if (!btn.hasAttribute('data-hero-listener')) {
      btn.setAttribute('data-hero-listener', 'true');
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const event = new CustomEvent('gardener:consultation-click');
        window.dispatchEvent(event);
      });
    }
  });
};

const init = () => {
  mountBlocks();
  initHeroBlocks();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

if (typeof (window as any).wp !== 'undefined' && (window as any).wp.domReady) {
  (window as any).wp.domReady(() => {
    mountBlocks();
    initHeroBlocks();
  });
}

