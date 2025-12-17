import { useEffect, useState } from 'react';
import { Palette, Scissors, Droplets } from 'lucide-react';

interface ServicesBlockProps {
  blockId: string;
}

interface Service {
  title: string;
  description: string;
  image?: string;
  icon?: string;
}

const iconMap: Record<string, typeof Palette> = {
  palette: Palette,
  scissors: Scissors,
  droplets: Droplets,
};

export default function ServicesBlock({ blockId }: ServicesBlockProps) {
  const [title, setTitle] = useState('Our Services');
  const [description, setDescription] = useState('Comprehensive landscaping solutions for residential and commercial properties');
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const element = document.getElementById(blockId);
    if (!element) return;

    const titleAttr = element.getAttribute('data-title');
    const descriptionAttr = element.getAttribute('data-description');
    const servicesAttr = element.getAttribute('data-services');

    if (titleAttr) setTitle(titleAttr);
    if (descriptionAttr) setDescription(descriptionAttr);
    if (servicesAttr) {
      try {
        const parsedServices = JSON.parse(servicesAttr);
        setServices(parsedServices);
      } catch (e) {
        console.error('Error parsing services:', e);
      }
    }
  }, [blockId]);

  return (
    <section className="py-20 bg-white" id="services">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon && iconMap[service.icon] ? iconMap[service.icon] : Palette;
            const imageUrl = service.image || 'https://images.pexels.com/photos/1105019/pexels-photo-1105019.jpeg?auto=compress&cs=tinysrgb&w=800';

            return (
              <div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 bg-green-600 p-3 rounded-lg">
                    <IconComponent className="text-white" size={28} />
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
            );
          })}
        </div>
      </div>
    </section>
  );
}


