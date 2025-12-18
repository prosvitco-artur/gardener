import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import HeroBlock from './components/blocks/HeroBlock';
import ServicesBlock from './components/blocks/ServicesBlock';

// @ts-ignore
import.meta.glob([
  '../images/**',
  '../fonts/**',
]);

const mountBlocks = () => {
  const heroBlocks = document.querySelectorAll('.gardener-hero-block');
  heroBlocks.forEach((block) => {
    if (block.id && !block.hasAttribute('data-mounted')) {
      block.setAttribute('data-mounted', 'true');
      const root = createRoot(block);
      root.render(
        <StrictMode>
          <HeroBlock blockId={block.id} />
        </StrictMode>
      );
    }
  });

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

