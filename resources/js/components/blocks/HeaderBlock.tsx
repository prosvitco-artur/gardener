import { useState, useEffect } from 'react';
import { Menu, X, Leaf } from 'lucide-react';

interface HeaderBlockProps {
  blockId: string;
}

interface MenuItem {
  label: string;
  url: string;
}

export default function HeaderBlock({ blockId }: HeaderBlockProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoText, setLogoText] = useState('GreenScape Pro');
  const [logoImage, setLogoImage] = useState<string>('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [ctaText, setCtaText] = useState('Get Quote');

  useEffect(() => {
    const element = document.getElementById(blockId);
    if (!element) return;

    const logoTextAttr = element.getAttribute('data-logo-text');
    const logoImageAttr = element.getAttribute('data-logo-image');
    const menuItemsAttr = element.getAttribute('data-menu-items');
    const ctaTextAttr = element.getAttribute('data-cta-text');

    if (logoTextAttr) setLogoText(logoTextAttr);
    if (logoImageAttr) setLogoImage(logoImageAttr);
    if (ctaTextAttr) setCtaText(ctaTextAttr);
    if (menuItemsAttr) {
      try {
        const items = JSON.parse(menuItemsAttr);
        setMenuItems(items);
      } catch (e) {
        console.error('Error parsing menu items:', e);
      }
    }
  }, [blockId]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuItemClick = (url: string) => {
    if (url.startsWith('#')) {
      const section = document.querySelector(url);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const handleConsultationClick = () => {
    const event = new CustomEvent('gardener:consultation-click');
    window.dispatchEvent(event);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg ${isScrolled ? 'bg-green-600' : 'bg-white'}`}>
              {logoImage ? (
                <img src={logoImage} alt={logoText} className="w-7 h-7" />
              ) : (
                <Leaf className={isScrolled ? 'text-white' : 'text-green-600'} size={28} />
              )}
            </div>
            <span className={`text-2xl font-bold ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              {logoText}
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.url}
                onClick={(e) => {
                  if (item.url.startsWith('#')) {
                    e.preventDefault();
                    const section = document.querySelector(item.url);
                    if (section) {
                      section.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
                className={`font-semibold transition-colors ${
                  isScrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-300'
                }`}
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={handleConsultationClick}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              {ctaText}
            </button>
          </nav>

          <button
            className={`md:hidden ${isScrolled ? 'text-gray-900' : 'text-white'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col p-4 space-y-4">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.url}
                className="text-gray-700 font-semibold hover:text-green-600"
                onClick={(e) => {
                  if (item.url.startsWith('#')) {
                    e.preventDefault();
                    handleMenuItemClick(item.url);
                  } else {
                    setIsMobileMenuOpen(false);
                  }
                }}
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => {
                handleConsultationClick();
                setIsMobileMenuOpen(false);
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-semibold"
            >
              {ctaText}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

