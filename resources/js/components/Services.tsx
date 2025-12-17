import { Palette, Scissors, Droplets } from 'lucide-react';

const services = [
  {
    icon: Palette,
    title: 'Landscape Design',
    description: 'Custom landscape designs tailored to your vision and property. From concept to creation, we bring beautiful outdoor spaces to life.',
    image: 'https://images.pexels.com/photos/1105019/pexels-photo-1105019.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    icon: Scissors,
    title: 'Garden Maintenance',
    description: 'Regular maintenance services to keep your garden healthy and beautiful year-round. Pruning, weeding, mulching, and more.',
    image: 'https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    icon: Droplets,
    title: 'Irrigation Systems',
    description: 'Professional installation of automatic irrigation systems. Efficient watering solutions that save time, water, and money.',
    image: 'https://images.pexels.com/photos/169523/pexels-photo-169523.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

export default function Services() {
  return (
    <section className="py-20 bg-white" id="services">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive landscaping solutions for residential and commercial properties
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 bg-green-600 p-3 rounded-lg">
                  <service.icon className="text-white" size={28} />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
