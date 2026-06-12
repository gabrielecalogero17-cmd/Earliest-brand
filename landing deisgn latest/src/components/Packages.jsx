import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { motion, AnimatePresence } from 'framer-motion';
import AnimateIn from './AnimateIn';

export default function Packages({ onSelectPackage }) {
  const [activeTab, setActiveTab] = useState('bundles');
  const intl = useIntl();

  return (
    <section className="py-32 bg-[#050505] border-t border-[#ECC097]/15" id="packages">
      <div className="container mx-auto px-8 md:px-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-[10px] font-label uppercase tracking-[0.4em] text-[#ECC097] font-bold mb-4">
            <FormattedMessage id="packages.subtitle" />
          </h2>
          <h3 className="text-4xl md:text-6xl font-display font-bold text-on-surface tracking-tighter mb-6">
            <FormattedMessage id="packages.title" />
          </h3>
          <p className="text-on-surface-variant text-lg font-light leading-relaxed max-w-2xl mx-auto">
            <FormattedMessage id="packages.description" />
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center gap-4 mb-16">
          <button 
            onClick={() => setActiveTab('bundles')} 
            className={`px-8 py-4 font-bold tracking-widest text-xs uppercase transition-all duration-300 ${activeTab === 'bundles' ? 'bg-[#ECC097] text-[#050505] border border-[#ECC097]' : 'bg-transparent text-on-surface border border-[#ECC097]/30 hover:border-[#ECC097]'}`}
          >
            <FormattedMessage id="packages.tab.bundles" />
          </button>
          <button 
            onClick={() => setActiveTab('verticals')} 
            className={`px-8 py-4 font-bold tracking-widest text-xs uppercase transition-all duration-300 ${activeTab === 'verticals' ? 'bg-[#ECC097] text-[#050505] border border-[#ECC097]' : 'bg-transparent text-on-surface border border-[#ECC097]/30 hover:border-[#ECC097]'}`}
          >
            <FormattedMessage id="packages.tab.verticals" />
          </button>
        </div>

        {/* Tab Contents */}
        <AnimatePresence mode="wait">
          {/* 1. BUNDLES TAB */}
          {activeTab === 'bundles' && (
            <motion.div 
              key="bundles"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            >
            {/* Tier 1: Growth Engine */}
            <AnimateIn flashRed={true} bgEnd="#0F0000" className="border border-[#ECC097]/20 bg-[#0F0000] p-10 flex flex-col justify-between transition-all duration-300 hover:border-[#ECC097]/60 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(236,192,151,0.15)] group relative">
              <div className="absolute top-0 right-0 bg-[#0F0000] border-l border-b border-[#ECC097]/20 text-on-surface text-[9px] font-bold tracking-widest uppercase px-4 py-1.5">
                <FormattedMessage id="packages.bundle.tag1" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-on-surface mb-2"><FormattedMessage id="packages.bundle.title1" /></h4>
                <div className="text-sm text-[#ECC097]/80 uppercase tracking-widest mb-6 font-semibold"><FormattedMessage id="packages.bundle.bonus1" /></div>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-xs text-[#5A5A5A]"><FormattedMessage id="packages.bundle.from" /></span>
                  <span className="text-5xl font-extrabold text-[#ECC097]">€1.600</span>
                  <span className="text-xs text-[#5A5A5A]"><FormattedMessage id="packages.bundle.month" /></span>
                </div>
                <p className="text-sm text-on-surface-variant font-light mb-8 leading-relaxed">
                  <FormattedMessage id="packages.bundle.desc1" />
                </p>
                <div className="w-full h-[1px] bg-[#ECC097]/10 mb-8"></div>
                <ul className="flex flex-col gap-4 mb-8">
                  <li className="flex items-center gap-3 text-sm text-on-surface-variant font-light">
                    <span className="text-[#ECC097]">✓</span>
                    <span><FormattedMessage id="packages.bundle.list1.1" /></span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-on-surface-variant font-light">
                    <span className="text-[#ECC097]">✓</span>
                    <span><FormattedMessage id="packages.bundle.list1.2" /></span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-on-surface-variant font-light">
                    <span className="text-[#ECC097]">✓</span>
                    <span><FormattedMessage id="packages.bundle.list1.3" /></span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-on-surface-variant font-light">
                    <span className="text-[#ECC097]">✓</span>
                    <span><FormattedMessage id="packages.bundle.list1.4" /></span>
                  </li>
                </ul>
              </div>
              <button 
                onClick={() => onSelectPackage('bundle_growth_engine', intl.formatMessage({ id: 'packages.bundle.title1' }) + ' - €1.600/mese')}
                className="w-full py-4 bg-transparent border border-[#ECC097]/40 hover:bg-[#ECC097] hover:text-[#050505] text-on-surface font-bold tracking-widest uppercase text-xs transition-all duration-300"
              >
                <FormattedMessage id="packages.bundle.btn1" />
              </button>
            </AnimateIn>

            {/* Tier 2: The Earliest Elite */}
            <AnimateIn delay={0.1} flashRed={true} bgEnd="#1C0000" className="border-2 border-[#ECC097] bg-[#1C0000] p-10 flex flex-col justify-between transition-all duration-300 shadow-[0_0_30px_rgba(236,192,151,0.1)] hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(236,192,151,0.3)] group relative">
              <div className="absolute top-0 right-0 bg-[#ECC097] text-[#050505] text-[9px] font-bold tracking-widest uppercase px-4 py-1.5">
                <FormattedMessage id="packages.bundle.tag2" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-on-surface mb-2"><FormattedMessage id="packages.bundle.title2" /></h4>
                <div className="text-sm text-[#ECC097]/80 uppercase tracking-widest mb-6 font-semibold"><FormattedMessage id="packages.bundle.bonus2" /></div>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-xs text-[#5A5A5A]"><FormattedMessage id="packages.bundle.from" /></span>
                  <span className="text-5xl font-extrabold text-[#ECC097]">€3.000</span>
                  <span className="text-xs text-[#5A5A5A]"><FormattedMessage id="packages.bundle.month" /></span>
                </div>
                <p className="text-sm text-on-surface-variant font-light mb-8 leading-relaxed">
                  <FormattedMessage id="packages.bundle.desc2" />
                </p>
                <div className="w-full h-[1px] bg-[#ECC097]/20 mb-8"></div>
                <ul className="flex flex-col gap-4 mb-8">
                  <li className="flex items-center gap-3 text-sm text-on-surface-variant font-light">
                    <span className="text-[#ECC097]">✓</span>
                    <span><FormattedMessage id="packages.bundle.list2.1" /></span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-on-surface-variant font-light">
                    <span className="text-[#ECC097]">✓</span>
                    <span><FormattedMessage id="packages.bundle.list2.2" /></span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-on-surface-variant font-light">
                    <span className="text-[#ECC097]">✓</span>
                    <span><FormattedMessage id="packages.bundle.list2.3" /></span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-on-surface-variant font-light">
                    <span className="text-[#ECC097]">✓</span>
                    <span><FormattedMessage id="packages.bundle.list2.4" /></span>
                  </li>
                </ul>
              </div>
              <button 
                onClick={() => onSelectPackage('bundle_earliest_elite', intl.formatMessage({ id: 'packages.bundle.title2' }) + ' - €3.000/mese')}
                className="w-full py-4 bg-[#ECC097] text-[#050505] font-bold tracking-widest uppercase text-xs transition-all duration-300 hover:bg-white"
              >
                <FormattedMessage id="packages.bundle.btn2" />
              </button>
            </AnimateIn>
            </motion.div>
          )}

          {/* 2. VERTICALS TAB */}
          {activeTab === 'verticals' && (
            <motion.div 
              key="verticals"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
            >
            {/* colonna 1: Social & Presenza */}
            <div className="flex flex-col gap-8">
              <h5 className="text-[#ECC097] font-bold tracking-widest text-sm uppercase border-b border-[#ECC097]/20 pb-4"><FormattedMessage id="packages.verticals.col1" /></h5>
              
              {/* Essential Authority */}
              <AnimateIn delay={0.1} flashRed={true} bgEnd="#0F0000" className="border border-[#ECC097]/15 bg-[#0F0000] p-8 flex flex-col justify-between min-h-[480px] transition-all duration-300 hover:border-[#ECC097]/60 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(236,192,151,0.15)]">
                <div>
                  <h6 className="text-xl font-bold text-on-surface mb-2">Essential Authority</h6>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-5xl font-extrabold text-[#ECC097]">€800</span>
                    <span className="text-xs text-[#5A5A5A]"><FormattedMessage id="packages.bundle.month" /></span>
                  </div>
                  <p className="text-xs text-on-surface-variant font-light mb-6">
                    <FormattedMessage id="packages.vertical.auth.desc" />
                  </p>
                  <ul className="flex flex-col gap-3 text-xs text-on-surface-variant font-light mb-6 border-t border-[#ECC097]/10 pt-4">
                    <li>• <FormattedMessage id="packages.vertical.auth.l1" /></li>
                    <li>• <FormattedMessage id="packages.vertical.auth.l2" /></li>
                    <li>• <FormattedMessage id="packages.vertical.auth.l3" /></li>
                    <li>• <FormattedMessage id="packages.vertical.auth.l4" /></li>
                    <li>• <FormattedMessage id="packages.vertical.auth.l5" /></li>
                  </ul>
                </div>
                <button 
                  onClick={() => onSelectPackage('pack_essential_authority', 'Essential Authority - €800')}
                  className="w-full py-3 bg-transparent border border-[#ECC097]/30 hover:bg-[#ECC097] hover:text-[#050505] text-on-surface font-bold tracking-widest uppercase text-[10px] transition-all"
                >
                  <FormattedMessage id="packages.vertical.btn" />
                </button>
              </AnimateIn>

              {/* Omnichannel Dominance */}
              <AnimateIn delay={0.2} flashRed={true} bgEnd="#0F0000" className="border border-[#ECC097]/15 bg-[#0F0000] p-8 flex flex-col justify-between min-h-[480px] transition-all duration-300 hover:border-[#ECC097]/60 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(236,192,151,0.15)]">
                <div>
                  <h6 className="text-xl font-bold text-on-surface mb-2">Omnichannel Dominance</h6>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-5xl font-extrabold text-[#ECC097]">€1.500</span>
                    <span className="text-xs text-[#5A5A5A]"><FormattedMessage id="packages.bundle.month" /></span>
                  </div>
                  <p className="text-xs text-on-surface-variant font-light mb-6">
                    <FormattedMessage id="packages.vertical.omni.desc" />
                  </p>
                  <ul className="flex flex-col gap-3 text-xs text-on-surface-variant font-light mb-6 border-t border-[#ECC097]/10 pt-4">
                    <li>• <FormattedMessage id="packages.vertical.omni.l1" /></li>
                    <li>• <FormattedMessage id="packages.vertical.omni.l2" /></li>
                    <li>• <FormattedMessage id="packages.vertical.omni.l3" /></li>
                    <li>• <FormattedMessage id="packages.vertical.omni.l4" /></li>
                  </ul>
                </div>
                <button 
                  onClick={() => onSelectPackage('pack_omnichannel_dominance', 'Omnichannel Dominance - €1.500')}
                  className="w-full py-3 bg-transparent border border-[#ECC097]/30 hover:bg-[#ECC097] hover:text-[#050505] text-on-surface font-bold tracking-widest uppercase text-[10px] transition-all"
                >
                  <FormattedMessage id="packages.vertical.btn" />
                </button>
              </AnimateIn>
            </div>

            {/* colonna 2: Sviluppo Web & Funnel */}
            <div className="flex flex-col gap-8">
              <h5 className="text-[#ECC097] font-bold tracking-widest text-sm uppercase border-b border-[#ECC097]/20 pb-4"><FormattedMessage id="packages.verticals.col2" /></h5>
              
              {/* Performance Landing Page */}
              <AnimateIn delay={0.1} flashRed={true} bgEnd="#0F0000" className="border border-[#ECC097]/15 bg-[#0F0000] p-8 flex flex-col justify-between min-h-[480px] transition-all duration-300 hover:border-[#ECC097]/60 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(236,192,151,0.15)]">
                <div>
                  <h6 className="text-xl font-bold text-on-surface mb-2">Performance Landing</h6>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-5xl font-extrabold text-[#ECC097]">€800</span>
                    <span className="text-xs text-[#5A5A5A]"><FormattedMessage id="packages.vertical.once" /></span>
                  </div>
                  <p className="text-xs text-on-surface-variant font-light mb-6">
                    <FormattedMessage id="packages.vertical.land.desc" />
                  </p>
                  <ul className="flex flex-col gap-3 text-xs text-on-surface-variant font-light mb-6 border-t border-[#ECC097]/10 pt-4">
                    <li>• <FormattedMessage id="packages.vertical.land.l1" /></li>
                    <li>• <FormattedMessage id="packages.vertical.land.l2" /></li>
                    <li>• <FormattedMessage id="packages.vertical.land.l3" /></li>
                    <li>• <FormattedMessage id="packages.vertical.land.l4" /></li>
                  </ul>
                </div>
                <button 
                  onClick={() => onSelectPackage('pack_performance_landing', 'Performance Landing Page - €800')}
                  className="w-full py-3 bg-transparent border border-[#ECC097]/30 hover:bg-[#ECC097] hover:text-[#050505] text-on-surface font-bold tracking-widest uppercase text-[10px] transition-all"
                >
                  <FormattedMessage id="packages.vertical.btn" />
                </button>
              </AnimateIn>

              {/* Custom Corporate Ecosystem */}
              <AnimateIn delay={0.2} flashRed={true} bgEnd="#0F0000" className="border border-[#ECC097]/15 bg-[#0F0000] p-8 flex flex-col justify-between min-h-[480px] transition-all duration-300 hover:border-[#ECC097]/60 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(236,192,151,0.15)]">
                <div>
                  <h6 className="text-xl font-bold text-on-surface mb-2">Corporate Ecosystem</h6>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-5xl font-extrabold text-[#ECC097]">€2.000</span>
                    <span className="text-xs text-[#5A5A5A]"><FormattedMessage id="packages.vertical.once" /></span>
                  </div>
                  <p className="text-xs text-on-surface-variant font-light mb-6">
                    <FormattedMessage id="packages.vertical.corp.desc" />
                  </p>
                  <ul className="flex flex-col gap-3 text-xs text-on-surface-variant font-light mb-6 border-t border-[#ECC097]/10 pt-4">
                    <li>• <FormattedMessage id="packages.vertical.corp.l1" /></li>
                    <li>• <FormattedMessage id="packages.vertical.corp.l2" /></li>
                    <li>• <FormattedMessage id="packages.vertical.corp.l3" /></li>
                    <li>• <FormattedMessage id="packages.vertical.corp.l4" /></li>
                  </ul>
                </div>
                <button 
                  onClick={() => onSelectPackage('pack_corporate_ecosystem', 'Custom Corporate Ecosystem - €2.000')}
                  className="w-full py-3 bg-transparent border border-[#ECC097]/30 hover:bg-[#ECC097] hover:text-[#050505] text-on-surface font-bold tracking-widest uppercase text-[10px] transition-all"
                >
                  <FormattedMessage id="packages.vertical.btn" />
                </button>
              </AnimateIn>
            </div>

            {/* colonna 3: Campagne & Video AI */}
            <div className="flex flex-col gap-8">
              <h5 className="text-[#ECC097] font-bold tracking-widest text-sm uppercase border-b border-[#ECC097]/20 pb-4"><FormattedMessage id="packages.verticals.col3" /></h5>
              
              {/* Performance Lead Boost */}
              <AnimateIn delay={0.1} flashRed={true} bgEnd="#0F0000" className="border border-[#ECC097]/15 bg-[#0F0000] p-8 flex flex-col justify-between min-h-[480px] transition-all duration-300 hover:border-[#ECC097]/60 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(236,192,151,0.15)]">
                <div>
                  <h6 className="text-xl font-bold text-on-surface mb-2">Performance Lead Boost</h6>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-5xl font-extrabold text-[#ECC097]">€700</span>
                    <span className="text-xs text-[#5A5A5A]"><FormattedMessage id="packages.bundle.month" /></span>
                  </div>
                  <p className="text-xs text-on-surface-variant font-light mb-6">
                    <FormattedMessage id="packages.vertical.lead.desc" />
                  </p>
                  <ul className="flex flex-col gap-3 text-xs text-on-surface-variant font-light mb-6 border-t border-[#ECC097]/10 pt-4">
                    <li>• <FormattedMessage id="packages.vertical.lead.l1" /></li>
                    <li>• <FormattedMessage id="packages.vertical.lead.l2" /></li>
                    <li>• <FormattedMessage id="packages.vertical.lead.l3" /></li>
                    <li>• <FormattedMessage id="packages.vertical.lead.l4" /></li>
                  </ul>
                </div>
                <button 
                  onClick={() => onSelectPackage('pack_lead_boost', 'Performance Lead Boost - €700')}
                  className="w-full py-3 bg-transparent border border-[#ECC097]/30 hover:bg-[#ECC097] hover:text-[#050505] text-on-surface font-bold tracking-widest uppercase text-[10px] transition-all"
                >
                  <FormattedMessage id="packages.vertical.btn" />
                </button>
              </AnimateIn>

              {/* AI Cinematic Scale */}
              <AnimateIn delay={0.2} flashRed={true} bgEnd="#0F0000" className="border border-[#ECC097]/15 bg-[#0F0000] p-8 flex flex-col justify-between min-h-[480px] transition-all duration-300 hover:border-[#ECC097]/60 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(236,192,151,0.15)]">
                <div>
                  <h6 className="text-xl font-bold text-on-surface mb-2">AI Cinematic Scale</h6>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-5xl font-extrabold text-[#ECC097]">€1.800</span>
                    <span className="text-xs text-[#5A5A5A]"><FormattedMessage id="packages.bundle.month" /></span>
                  </div>
                  <p className="text-xs text-on-surface-variant font-light mb-6">
                    <FormattedMessage id="packages.vertical.ai.desc" />
                  </p>
                  <ul className="flex flex-col gap-3 text-xs text-on-surface-variant font-light mb-6 border-t border-[#ECC097]/10 pt-4">
                    <li>• <FormattedMessage id="packages.vertical.ai.l1" /></li>
                    <li>• <FormattedMessage id="packages.vertical.ai.l2" /></li>
                    <li>• <FormattedMessage id="packages.vertical.ai.l3" /></li>
                    <li>• <FormattedMessage id="packages.vertical.ai.l4" /></li>
                  </ul>
                </div>
                <button 
                  onClick={() => onSelectPackage('pack_ai_cinematic', 'AI Cinematic Scale - €1.800')}
                  className="w-full py-3 bg-transparent border border-[#ECC097]/30 hover:bg-[#ECC097] hover:text-[#050505] text-on-surface font-bold tracking-widest uppercase text-[10px] transition-all"
                >
                  <FormattedMessage id="packages.vertical.btn" />
                </button>
              </AnimateIn>
            </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
