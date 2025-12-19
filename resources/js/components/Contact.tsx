import { useState, FormEvent } from 'react';
import { Send } from 'lucide-react';

interface ContactProps {
  translations?: {
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
    enterName: string;
    enterEmail: string;
    enterPhone: string;
    selectService: string;
    describeRequest: string;
    landscapeDesign: string;
    gardenMaintenance: string;
    irrigation: string;
    consultation: string;
    send: string;
    messageSent: string;
  };
}

export default function Contact({ translations }: ContactProps) {
  console.log(translations);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const t = translations || {
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    service: 'Service',
    message: 'Message',
    enterName: 'Enter your name',
    enterEmail: 'Enter your email',
    enterPhone: 'Enter your phone',
    selectService: 'Select service',
    describeRequest: 'Describe your request',
    landscapeDesign: 'Landscape design',
    gardenMaintenance: 'Garden maintenance',
    irrigation: 'Irrigation',
    consultation: 'Consultation',
    send: 'Send',
    messageSent: 'Message sent!',
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
            {t.name}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            placeholder={t.enterName}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            {t.email}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            placeholder={t.enterEmail}
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
            {t.phone}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            placeholder={t.enterPhone}
          />
        </div>

        <div>
          <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2">
            {t.service}
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all bg-white"
          >
            <option value="">{t.selectService}</option>
            <option value="landscape-design">{t.landscapeDesign}</option>
            <option value="garden-maintenance">{t.gardenMaintenance}</option>
            <option value="irrigation">{t.irrigation}</option>
            <option value="consultation">{t.consultation}</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
            {t.message}
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all resize-none"
            placeholder={t.describeRequest}
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
        >
          {submitted ? t.messageSent : t.send}
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}
