import React from 'react';
import { Network, Star } from '@phosphor-icons/react';
import { FormattedMessage } from 'react-intl';
import AnimateIn from './AnimateIn';

export default function StatsGrid() {
  return (
    <section className="py-32 bg-surface">
      <div className="container mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto">
          <AnimateIn flashRed={true} bgEnd="#050505" className="md:col-span-8 bg-surface-container-low rounded-none p-12 flex flex-col justify-end min-h-[400px] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8">
              <Network size={72} weight="regular" className="text-[#ECC097]/20 group-hover:text-[#ECC097]/40 transition-colors" />
            </div>
            <div className="relative z-10">
              <h3 className="text-5xl font-display font-extrabold text-on-surface mb-4">
                <FormattedMessage id="stats.management.title" />
              </h3>
              <p className="text-on-surface-variant text-lg font-light max-w-lg">
                <FormattedMessage id="stats.management.desc" />
              </p>
            </div>
          </AnimateIn>
          <AnimateIn delay={0.1} direction="down" flashRed={true} bgEnd="#660000" className="md:col-span-4 bg-[#660000] border border-[#ECC097]/20 hover:bg-[#800000] rounded-none p-12 flex flex-col items-center justify-center text-center group">
            <div className="text-8xl font-display font-extrabold text-white mb-4 group-hover:scale-110 transition-transform">98%</div>
            <div className="text-[10px] font-label uppercase tracking-widest text-[#ECC097] font-bold">
              <FormattedMessage id="stats.retention.title" />
            </div>
          </AnimateIn>
          <AnimateIn delay={0.2} flashRed={true} bgEnd="#050505" className="md:col-span-12 bg-surface-container-high rounded-none p-12 flex flex-col items-center justify-center text-center border border-[#ECC097]/15 hover:border-[#ECC097]/40 transition-colors">
            <div className="flex items-center gap-4 mb-6">
              <Star size={24} weight="fill" className="text-[#ECC097]" />
              <Star size={24} weight="fill" className="text-[#ECC097]" />
              <Star size={24} weight="fill" className="text-[#ECC097]" />
              <Star size={24} weight="fill" className="text-[#ECC097]" />
              <Star size={24} weight="fill" className="text-[#ECC097]" />
            </div>
            <p className="text-on-surface font-display text-xl italic leading-relaxed">
              <FormattedMessage id="stats.quote" />
            </p>
            <p className="mt-6 text-[10px] font-label uppercase tracking-widest text-on-surface-variant">
              <FormattedMessage id="stats.author" />
            </p>
          </AnimateIn>
          
          <div className="flex-1 w-full flex items-end gap-2 h-24">
            <div className="flex-1 bg-[#660000] border border-[#ECC097]/20 hover:bg-[#800000] h-[40%] rounded-t-sm"></div>
            <div className="flex-1 bg-[#660000] border border-[#ECC097]/20 hover:bg-[#800000] h-[60%] rounded-t-sm"></div>
            <div className="flex-1 bg-[#660000] border border-[#ECC097]/20 hover:bg-[#800000] h-[85%] rounded-t-sm"></div>
            <div className="flex-1 bg-[#660000] border border-[#ECC097]/20 hover:bg-[#800000] h-[70%] rounded-t-sm"></div>
            <div className="flex-1 bg-[#660000] border border-[#ECC097]/20 hover:bg-[#800000] h-[100%] rounded-t-sm"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
