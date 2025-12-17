import { useState, useEffect } from 'react';
import { Menu, X, Leaf } from 'lucide-react';

interface HeaderProps {
  onConsultationClick: () => void;
}

export default function Header({ onConsultationClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
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
              <Leaf className={isScrolled ? 'text-white' : 'text-green-600'} size={28} />
            </div>
            <span className={`text-2xl font-bold ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              GreenScape Pro
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#services"
              className={`font-semibold transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-300'
              }`}
            >
              Services
            </a>
            <a
              href="#about"
              className={`font-semibold transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-300'
              }`}
            >
              About
            </a>
            <a
              href="#gallery"
              className={`font-semibold transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-300'
              }`}
            >
              Gallery
            </a>
            <button
              onClick={scrollToContact}
              className={`font-semibold transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-300'
              }`}
            >
              Contact
            </button>
            <button
              onClick={onConsultationClick}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Get Quote
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
            <a href="#services" className="text-gray-700 font-semibold hover:text-green-600" onClick={() => setIsMobileMenuOpen(false)}>
              Services
            </a>
            <a href="#about" className="text-gray-700 font-semibold hover:text-green-600" onClick={() => setIsMobileMenuOpen(false)}>
              About
            </a>
            <a href="#gallery" className="text-gray-700 font-semibold hover:text-green-600" onClick={() => setIsMobileMenuOpen(false)}>
              Gallery
            </a>
            <button onClick={scrollToContact} className="text-left text-gray-700 font-semibold hover:text-green-600">
              Contact
            </button>
            <button
              onClick={() => {
                onConsultationClick();
                setIsMobileMenuOpen(false);
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-semibold"
            >
              Get Quote
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
