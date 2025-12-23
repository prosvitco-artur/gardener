import { useState, FormEvent } from 'react';
import { Send } from 'lucide-react';

interface ContactProps {
  translations?: {
    name: string;
    phone: string;
    service: string;
    message: string;
    enterName: string;
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
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const formatPhone = (value: string): string => {
    const digits = value.replace(/\D/g, '');
    
    if (digits.length === 0) return '';
    
    if (digits.startsWith('380')) {
      const formatted = digits.slice(0, 12);
      if (formatted.length <= 3) return `+${formatted}`;
      if (formatted.length <= 5) return `+${formatted.slice(0, 3)} ${formatted.slice(3)}`;
      if (formatted.length <= 8) return `+${formatted.slice(0, 3)} ${formatted.slice(3, 5)} ${formatted.slice(5)}`;
      return `+${formatted.slice(0, 3)} ${formatted.slice(3, 5)} ${formatted.slice(5, 8)} ${formatted.slice(8)}`;
    }
    
    if (digits.startsWith('0')) {
      const formatted = digits.slice(0, 10);
      if (formatted.length <= 1) return formatted;
      if (formatted.length <= 3) return `${formatted.slice(0, 1)} ${formatted.slice(1)}`;
      if (formatted.length <= 6) return `${formatted.slice(0, 1)} ${formatted.slice(1, 3)} ${formatted.slice(3)}`;
      return `${formatted.slice(0, 1)} ${formatted.slice(1, 3)} ${formatted.slice(3, 6)} ${formatted.slice(6)}`;
    }
    
    const formatted = digits.slice(0, 9);
    if (formatted.length <= 2) return formatted;
    if (formatted.length <= 5) return `${formatted.slice(0, 2)} ${formatted.slice(2)}`;
    return `${formatted.slice(0, 2)} ${formatted.slice(2, 5)} ${formatted.slice(5)}`;
  };

  const validatePhone = (phone: string): boolean => {
    const digits = phone.replace(/\D/g, '');
    
    if (digits.startsWith('380') && digits.length === 12) {
      return true;
    }
    
    if (digits.startsWith('0') && digits.length === 10) {
      return true;
    }
    
    if (digits.length === 9) {
      return true;
    }
    
    return false;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData({ ...formData, phone: formatted });
    
    if (formatted.length > 0 && !validatePhone(formatted)) {
      setPhoneError('Введіть коректний номер телефону');
    } else {
      setPhoneError(null);
    }
  };

  const t = translations || {
    name: 'Name',
    phone: 'Phone',
    service: 'Service',
    message: 'Message',
    enterName: 'Enter your name',
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!validatePhone(formData.phone)) {
      setPhoneError('Введіть коректний номер телефону');
      return;
    }
    
    setLoading(true);

    try {
      const response = await fetch('/wp-json/gardener/v1/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }

      setSubmitted(true);
      setFormData({ name: '', phone: '', service: '', message: '' });
      
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
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
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
            {t.phone}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handlePhoneChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all ${
              phoneError ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
            }`}
            placeholder="+380 XX XXX XX XX"
          />
          {phoneError && (
            <p className="mt-1 text-sm text-red-600">{phoneError}</p>
          )}
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
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all resize-none"
            placeholder={t.describeRequest}
          ></textarea>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || submitted}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:transform-none flex items-center justify-center gap-2 shadow-lg"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t.send}...
            </>
          ) : submitted ? (
            <>
              {t.messageSent}
              <Send size={20} />
            </>
          ) : (
            <>
              {t.send}
              <Send size={20} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
