import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onConsultationClick: () => void;
}

export default function Hero({ onConsultationClick }: HeroProps) {
  return (
    <div className="relative h-screen min-h-[600px] flex items-center justify-center">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1453499/pexels-photo-1453499.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Transform Your Outdoor Space
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-100 leading-relaxed">
          Professional landscaping services to bring your dream garden to life
        </p>
        <button
          onClick={onConsultationClick}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2 shadow-xl"
        >
          Get Free Consultation
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
