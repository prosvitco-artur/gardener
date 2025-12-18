import { useState, FormEvent } from 'react';
import { Send } from 'lucide-react';
import { __ } from '../utils/i18n';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

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
            {__('Name', 'sage')}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            placeholder={__('Enter your name', 'sage')}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            {__('Email', 'sage')}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            placeholder={__('Enter your email', 'sage')}
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
            {__('Phone', 'sage')}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            placeholder={__('Enter your phone', 'sage')}
          />
        </div>

        <div>
          <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2">
            {__('Service', 'sage')}
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all bg-white"
          >
            <option value="">{__('Select service', 'sage')}</option>
            <option value="landscape-design">{__('Landscape design', 'sage')}</option>
            <option value="garden-maintenance">{__('Garden maintenance', 'sage')}</option>
            <option value="irrigation">{__('Irrigation', 'sage')}</option>
            <option value="consultation">{__('Consultation', 'sage')}</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
            {__('Message', 'sage')}
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all resize-none"
            placeholder={__('Describe your request', 'sage')}
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
        >
          {submitted ? __('Message sent!', 'sage') : __('Send', 'sage')}
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}
