import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import HeaderBlock from './components/blocks/HeaderBlock';
import HeroBlock from './components/blocks/HeroBlock';
import ServicesBlock from './components/blocks/ServicesBlock';

// @ts-ignore
import.meta.glob([
  '../images/**',
  '../fonts/**',
]);

const mountBlocks = () => {
  const headerBlocks = document.querySelectorAll('.gardener-header-block');
  headerBlocks.forEach((block) => {
    if (block.id && !block.hasAttribute('data-mounted')) {
      block.setAttribute('data-mounted', 'true');
      const root = createRoot(block);
      root.render(
        <StrictMode>
          <HeaderBlock blockId={block.id} />
        </StrictMode>
      );
    }
  });

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

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountBlocks);
} else {
  mountBlocks();
}

if (typeof (window as any).wp !== 'undefined' && (window as any).wp.domReady) {
  (window as any).wp.domReady(mountBlocks);
}

