import React from 'react';
import { FilmStrip, ChartLineUp, Globe, CursorClick } from '@phosphor-icons/react';
import { FormattedMessage } from 'react-intl';
import AnimateIn from './AnimateIn';

export default function Services() {
  return (
    <section className="py-32 bg-surface" id="services">
      <div className="container mx-auto px-8 md:px-16">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-[10px] font-label uppercase tracking-[0.4em] text-[#ECC097] font-bold mb-4">
              <FormattedMessage id="services.subtitle" />
            </h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-on-surface tracking-tight">
              <FormattedMessage id="services.title" />
            </h3>
          </div>
          <AnimateIn direction="up">
            <div className="text-on-surface-variant max-w-sm text-sm font-light leading-relaxed">
              <FormattedMessage id="services.description" />
            </div>
          </AnimateIn>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <AnimateIn delay={0.1} flashRed={true} bgEnd="#0F0000" className="group p-8 bg-[#0F0000] border border-[#ECC097]/15 hover:border-[#ECC097]/60 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(236,192,151,0.15)] transition-all duration-500 rounded-none flex flex-col justify-between aspect-square">
            <FilmStrip size={36} weight="regular" className="text-[#ECC097] mb-12" />
            <div>
              <h4 className="text-xl font-bold text-on-surface mb-3"><FormattedMessage id="services.card1.title" /></h4>
              <p className="text-sm text-on-surface-variant font-light leading-relaxed"><FormattedMessage id="services.card1.desc" /></p>
            </div>
          </AnimateIn>
          {/* Card 2 */}
          <AnimateIn delay={0.2} flashRed={true} bgEnd="#0F0000" className="group p-8 bg-[#0F0000] border border-[#ECC097]/15 hover:border-[#ECC097]/60 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(236,192,151,0.15)] transition-all duration-500 rounded-none flex flex-col justify-between aspect-square">
            <ChartLineUp size={36} weight="regular" className="text-[#ECC097] mb-12" />
            <div>
              <h4 className="text-xl font-bold text-on-surface mb-3"><FormattedMessage id="services.card2.title" /></h4>
              <p className="text-sm text-on-surface-variant font-light leading-relaxed"><FormattedMessage id="services.card2.desc" /></p>
            </div>
          </AnimateIn>
          {/* Card 3 */}
          <AnimateIn delay={0.3} flashRed={true} bgEnd="#0F0000" className="group p-8 bg-[#0F0000] border border-[#ECC097]/15 hover:border-[#ECC097]/60 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(236,192,151,0.15)] transition-all duration-500 rounded-none flex flex-col justify-between aspect-square">
            <Globe size={36} weight="regular" className="text-[#ECC097] mb-12" />
            <div>
              <h4 className="text-xl font-bold text-on-surface mb-3"><FormattedMessage id="services.card3.title" /></h4>
              <p className="text-sm text-on-surface-variant font-light leading-relaxed"><FormattedMessage id="services.card3.desc" /></p>
            </div>
          </AnimateIn>
          {/* Card 4 */}
          <AnimateIn delay={0.4} flashRed={true} bgEnd="#0F0000" className="group p-8 bg-[#0F0000] border border-[#ECC097]/15 hover:border-[#ECC097]/60 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(236,192,151,0.15)] transition-all duration-500 rounded-none flex flex-col justify-between aspect-square">
            <CursorClick size={36} weight="regular" className="text-[#ECC097] mb-12" />
            <div>
              <h4 className="text-xl font-bold text-on-surface mb-3"><FormattedMessage id="services.card4.title" /></h4>
              <p className="text-sm text-on-surface-variant font-light leading-relaxed"><FormattedMessage id="services.card4.desc" /></p>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
