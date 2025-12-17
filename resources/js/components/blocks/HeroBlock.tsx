import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroBlockProps {
  blockId: string;
}

export default function HeroBlock({ blockId }: HeroBlockProps) {
  const [title, setTitle] = useState('Transform Your Outdoor Space');
  const [description, setDescription] = useState('Professional landscaping services to bring your dream garden to life');
  const [backgroundImage, setBackgroundImage] = useState('https://images.pexels.com/photos/1453499/pexels-photo-1453499.jpeg?auto=compress&cs=tinysrgb&w=1920');
  const [ctaText, setCtaText] = useState('Get Free Consultation');
  const [ctaUrl, setCtaUrl] = useState('#');

  useEffect(() => {
    const element = document.getElementById(blockId);
    if (!element) return;

    const titleAttr = element.getAttribute('data-title');
    const descriptionAttr = element.getAttribute('data-description');
    const bgImageAttr = element.getAttribute('data-background-image');
    const ctaTextAttr = element.getAttribute('data-cta-text');
    const ctaUrlAttr = element.getAttribute('data-cta-url');

    if (titleAttr) setTitle(titleAttr);
    if (descriptionAttr) setDescription(descriptionAttr);
    if (bgImageAttr) setBackgroundImage(bgImageAttr);
    if (ctaTextAttr) setCtaText(ctaTextAttr);
    if (ctaUrlAttr) setCtaUrl(ctaUrlAttr);
  }, [blockId]);

  const handleConsultationClick = () => {
    if (ctaUrl === '#') {
      const event = new CustomEvent('gardener:consultation-click');
      window.dispatchEvent(event);
    } else {
      window.location.href = ctaUrl;
    }
  };

  return (
    <div className="relative h-screen min-h-[600px] flex items-center justify-center">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          {title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-100 leading-relaxed">
          {description}
        </p>
        <button
          onClick={handleConsultationClick}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2 shadow-xl"
        >
          {ctaText}
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}

