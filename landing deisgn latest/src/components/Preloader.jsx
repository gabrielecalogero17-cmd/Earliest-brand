import React, { useEffect, useState } from 'react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Disable scrolling while preloader is active
    document.body.style.overflow = 'hidden';
    
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(() => {
              document.body.style.overflow = 'unset';
              onComplete();
            }, 800);
          }, 400);
          return 100;
        }
        return Math.min(prev + Math.floor(Math.random() * 20) + 5, 100);
      });
    }, 100);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = 'unset';
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center transition-all duration-[800ms] ease-in-out ${isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100'}`}>
      <img src="/assets/logo/logo_crest.png" alt="EARLIEST Logo" className="h-24 md:h-32 w-auto mb-10 animate-pulse drop-shadow-[0_0_20px_rgba(236,192,151,0.2)]" />
      <div className="w-64 md:w-80 h-[1px] bg-[#ECC097]/20 relative overflow-hidden mb-6">
        <div 
          className="absolute top-0 left-0 h-full bg-[#ECC097] transition-all duration-200 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="text-[#ECC097] font-display uppercase tracking-[0.4em] text-[10px] font-bold">
          {progress < 100 ? 'Initializing Protocol...' : 'System Ready'}
        </div>
        <div className="text-[#ECC097]/60 font-label text-[9px] tracking-widest">
          {progress}%
        </div>
      </div>
    </div>
  );
}
