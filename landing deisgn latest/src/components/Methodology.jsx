import React from 'react';
import { FormattedMessage } from 'react-intl';
import AnimateIn from './AnimateIn';

export default function Methodology() {
  return (
    <section className="py-32 bg-surface-container-lowest" id="methodology">
      <div className="container mx-auto px-8 md:px-16">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <h2 className="text-[10px] font-label uppercase tracking-[0.4em] text-[#ECC097] font-bold mb-4">
            <FormattedMessage id="methodology.subtitle" />
          </h2>
          <h3 className="text-4xl md:text-6xl font-display font-bold text-on-surface tracking-tighter mb-8">
            <FormattedMessage id="methodology.title" />
          </h3>
          <p className="text-on-surface-variant text-lg font-light leading-relaxed max-w-2xl mx-auto">
            <FormattedMessage id="methodology.description" />
          </p>
        </div>
        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-4">
          {/* Stage 1 */}
          <AnimateIn delay={0.1} direction="left">
            <div className="relative group">
              <div className="mb-8 relative z-10">
                <div className="w-16 h-16 rounded-none bg-[#660000] border border-[#ECC097]/20 hover:bg-[#800000] flex items-center justify-center text-white font-display text-2xl font-bold mb-6 group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-[0_0_20px_rgba(102,0,0,0.5)] transition-all duration-300">01</div>
                <h4 className="text-xl font-bold text-on-surface mb-3 tracking-tight"><FormattedMessage id="methodology.stage1.title" /></h4>
                <p className="text-sm text-on-surface-variant font-light leading-relaxed"><FormattedMessage id="methodology.stage1.desc" /></p>
              </div>
            </div>
          </AnimateIn>
          {/* Stage 2 */}
          <AnimateIn delay={0.2} direction="left">
            <div className="relative group">
              <div className="mb-8 relative z-10">
                <div className="w-16 h-16 rounded-none border border-[#ECC097]/30 bg-[#0F0000] flex items-center justify-center text-on-surface font-display text-2xl font-bold mb-6 group-hover:bg-[#660000] group-hover:border-[#ECC097]/20 group-hover:text-white group-hover:-translate-y-2 group-hover:shadow-[0_0_20px_rgba(102,0,0,0.5)] transition-all duration-300">02</div>
                <h4 className="text-xl font-bold text-on-surface mb-3 tracking-tight"><FormattedMessage id="methodology.stage2.title" /></h4>
                <p className="text-sm text-on-surface-variant font-light leading-relaxed"><FormattedMessage id="methodology.stage2.desc" /></p>
              </div>
            </div>
          </AnimateIn>
          {/* Stage 3 */}
          <AnimateIn delay={0.3} direction="left">
            <div className="relative group">
              <div className="mb-8 relative z-10">
                <div className="w-16 h-16 rounded-none border border-[#ECC097]/30 bg-[#0F0000] flex items-center justify-center text-on-surface font-display text-2xl font-bold mb-6 group-hover:bg-[#660000] group-hover:border-[#ECC097]/20 group-hover:text-white group-hover:-translate-y-2 group-hover:shadow-[0_0_20px_rgba(102,0,0,0.5)] transition-all duration-300">03</div>
                <h4 className="text-xl font-bold text-on-surface mb-3 tracking-tight"><FormattedMessage id="methodology.stage3.title" /></h4>
                <p className="text-sm text-on-surface-variant font-light leading-relaxed"><FormattedMessage id="methodology.stage3.desc" /></p>
              </div>
            </div>
          </AnimateIn>
          {/* Stage 4 */}
          <AnimateIn delay={0.4} direction="left">
            <div className="relative group">
              <div className="mb-8 relative z-10">
                <div className="w-16 h-16 rounded-none border border-[#ECC097]/30 bg-[#0F0000] flex items-center justify-center text-on-surface font-display text-2xl font-bold mb-6 group-hover:bg-[#660000] group-hover:border-[#ECC097]/20 group-hover:text-white group-hover:-translate-y-2 group-hover:shadow-[0_0_20px_rgba(102,0,0,0.5)] transition-all duration-300">04</div>
                <h4 className="text-xl font-bold text-on-surface mb-3 tracking-tight"><FormattedMessage id="methodology.stage4.title" /></h4>
                <p className="text-sm text-on-surface-variant font-light leading-relaxed"><FormattedMessage id="methodology.stage4.desc" /></p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
