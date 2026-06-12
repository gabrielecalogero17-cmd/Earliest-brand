import React from 'react';
import { MapPin, Envelope } from '@phosphor-icons/react';
import { FormattedMessage, useIntl } from 'react-intl';

export default function Contact({ selectedPackage, selectedNotes }) {
  const intl = useIntl();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const btn = event.target.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = intl.formatMessage({ id: 'contact.form.btn.sending' });
    btn.style.opacity = '0.7';
    
    // Simulate API Call
    setTimeout(() => {
        btn.innerHTML = intl.formatMessage({ id: 'contact.form.btn.received' });
        btn.style.backgroundColor = '#660000';
        btn.style.color = 'white';
        btn.style.opacity = '1';
        event.target.reset();
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.backgroundColor = '';
            btn.style.color = '';
        }, 5000);
    }, 1500);
  };

  return (
    <section className="py-32 bg-[#050505] border-t border-[#ECC097]/15" id="contact">
      <div className="container mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Side Info */}
          <div className="lg:col-span-5 flex flex-col justify-between h-auto">
            <div>
              <h2 className="text-[10px] font-label uppercase tracking-[0.4em] text-[#ECC097] font-bold mb-4">
                <FormattedMessage id="contact.subtitle" />
              </h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold text-on-surface tracking-tighter mb-8">
                <FormattedMessage id="contact.title" />
              </h3>
              <p className="text-on-surface-variant text-base font-light leading-relaxed mb-8">
                <FormattedMessage id="contact.description" />
              </p>
            </div>
            <div className="flex flex-col gap-6 mt-8 border-t border-[#ECC097]/10 pt-8">
              <div className="flex items-center gap-4 text-on-surface-variant text-sm font-light">
                <MapPin size={24} weight="regular" className="text-[#ECC097]" />
                <span><FormattedMessage id="contact.location" /></span>
              </div>
              <div className="flex items-center gap-4 text-on-surface-variant text-sm font-light">
                <Envelope size={24} weight="regular" className="text-[#ECC097]" />
                <span>EarliestAgency@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Right Side Form Wrapper */}
          <div className="lg:col-span-7 bg-[#0F0000] border border-[#ECC097]/15 p-8 md:p-12 relative">
            <h4 className="text-xl font-bold text-on-surface mb-8 tracking-wide">
              <FormattedMessage id="contact.form.title" />
            </h4>
            <form id="bookingForm" onSubmit={handleFormSubmit} className="flex flex-col gap-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Nome */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="firstName" className="text-[10px] font-label uppercase tracking-widest text-[#5A5A5A] font-bold">
                    <FormattedMessage id="contact.form.firstName" />
                  </label>
                  <input type="text" id="firstName" name="firstName" required className="w-full bg-[#050505] border border-[#ECC097]/20 focus:border-[#ECC097] text-on-surface px-4 py-3 text-sm outline-none transition-all" />
                </div>
                {/* Cognome */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="lastName" className="text-[10px] font-label uppercase tracking-widest text-[#5A5A5A] font-bold">
                    <FormattedMessage id="contact.form.lastName" />
                  </label>
                  <input type="text" id="lastName" name="lastName" required className="w-full bg-[#050505] border border-[#ECC097]/20 focus:border-[#ECC097] text-on-surface px-4 py-3 text-sm outline-none transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-[10px] font-label uppercase tracking-widest text-[#5A5A5A] font-bold">
                    <FormattedMessage id="contact.form.email" />
                  </label>
                  <input type="email" id="email" name="email" required className="w-full bg-[#050505] border border-[#ECC097]/20 focus:border-[#ECC097] text-on-surface px-4 py-3 text-sm outline-none transition-all" />
                </div>
                {/* Telefono */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-[10px] font-label uppercase tracking-widest text-[#5A5A5A] font-bold">
                    <FormattedMessage id="contact.form.phone" />
                  </label>
                  <input type="tel" id="phone" name="phone" className="w-full bg-[#050505] border border-[#ECC097]/20 focus:border-[#ECC097] text-on-surface px-4 py-3 text-sm outline-none transition-all" />
                </div>
              </div>

              {/* Servizio */}
              <div className="flex flex-col gap-2">
                <label htmlFor="serviceType" className="text-[10px] font-label uppercase tracking-widest text-[#5A5A5A] font-bold">
                  <FormattedMessage id="contact.form.service" />
                </label>
                <select id="serviceType" name="serviceType" value={selectedPackage || 'bundle_earliest_elite'} onChange={() => {}} className="w-full bg-[#050505] border border-[#ECC097]/20 focus:border-[#ECC097] text-on-surface px-4 py-3 text-sm outline-none transition-all appearance-none">
                  <option value="bundle_growth_engine">Tier 1: Growth Engine (€1.600)</option>
                  <option value="bundle_earliest_elite">Tier 2: The Earliest Elite (€3.000)</option>
                  <option value="pack_essential_authority">Essential Authority (€800)</option>
                  <option value="pack_performance_landing">Performance Landing Page (€800)</option>
                  <option value="pack_corporate_ecosystem">Custom Corporate Ecosystem (€2.000)</option>
                  <option value="pack_ai_cinematic">AI Cinematic Scale (€1.800)</option>
                </select>
              </div>

              {/* Calendario Semplice */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label htmlFor="prefDate" className="text-[10px] font-label uppercase tracking-widest text-[#5A5A5A] font-bold">
                    <FormattedMessage id="contact.form.date" />
                  </label>
                  <input type="date" id="prefDate" name="prefDate" required className="w-full bg-[#050505] border border-[#ECC097]/20 focus:border-[#ECC097] text-on-surface px-4 py-3 text-sm outline-none transition-all" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="prefTime" className="text-[10px] font-label uppercase tracking-widest text-[#5A5A5A] font-bold">
                    <FormattedMessage id="contact.form.time" />
                  </label>
                  <select id="prefTime" name="prefTime" required className="w-full bg-[#050505] border border-[#ECC097]/20 focus:border-[#ECC097] text-on-surface px-4 py-3 text-sm outline-none transition-all">
                    <option value="09:00">09:00</option>
                    <option value="10:30">10:30</option>
                    <option value="11:30">11:30</option>
                    <option value="14:30">14:30</option>
                    <option value="16:00">16:00</option>
                    <option value="17:30">17:30</option>
                  </select>
                </div>
              </div>

              {/* Note / Brief */}
              <div className="flex flex-col gap-2">
                <label htmlFor="notes" className="text-[10px] font-label uppercase tracking-widest text-[#5A5A5A] font-bold">
                  <FormattedMessage id="contact.form.brief" />
                </label>
                <textarea id="notes" name="notes" required rows="4" className="w-full bg-[#050505] border border-[#ECC097]/20 focus:border-[#ECC097] text-on-surface px-4 py-3 text-sm outline-none transition-all resize-none" placeholder={intl.formatMessage({ id: 'contact.form.briefPlaceholder'})} value={selectedNotes} onChange={() => {}}></textarea>
              </div>

              {/* Submit Button */}
              <button type="submit" className="w-full py-5 bg-[#ECC097] text-[#050505] font-bold tracking-[0.2em] uppercase text-xs transition-all duration-300 hover:bg-white hover:shadow-[0_0_20px_rgba(236,192,151,0.4)]">
                <FormattedMessage id="contact.form.submit" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
