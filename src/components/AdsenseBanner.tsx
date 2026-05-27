import { useEffect, useRef } from 'react';
import { SITE_SEO } from '../seo';

// Extend window interface for AdSense scripts
declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

interface AdsenseBannerProps {
  type: 'sidebar' | 'footer' | 'midContent';
}

export function AdsenseBanner({ type }: AdsenseBannerProps) {
  const isInitialized = useRef<boolean>(false);
  const adsenseConfig = SITE_SEO.adsense;
  const slotConfig = adsenseConfig.slots[type];

  // Run official push for real Google AdSense ads if enabled
  useEffect(() => {
    if (adsenseConfig.enabled && !adsenseConfig.testMode && !isInitialized.current) {
      try {
        ((window.adsbygoogle = window.adsbygoogle || []).push({}));
        isInitialized.current = true;
      } catch (err) {
        console.error("AdSense initialization warning:", err);
      }
    }
  }, [adsenseConfig.enabled, adsenseConfig.testMode]);

  if (!slotConfig) return null;

  // Render Real AdSense Tag
  if (adsenseConfig.enabled && !adsenseConfig.testMode) {
    return (
      <div className="adsense-wrapper my-4 overflow-hidden w-full mx-auto" style={slotConfig.style}>
        <ins
          className="adsbygoogle"
          style={slotConfig.style || { display: 'block' }}
          data-ad-client={adsenseConfig.client}
          data-ad-slot={slotConfig.slotId}
          data-ad-format={slotConfig.format}
          data-full-width-responsive={slotConfig.responsive ? "true" : "false"}
        />
      </div>
    );
  }

  // Render Highly Polished Sandbox Ad Mockup for Developer Preview
  const bannerStyles = {
    sidebar: "p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex flex-col items-center justify-center text-center gap-1.5 min-h-[140px]",
    footer: "px-6 py-4 bg-slate-900/50 border border-slate-800/80 rounded-xl flex items-center justify-between text-left gap-4 w-full",
    midContent: "p-5 bg-gradient-to-r from-slate-900 via-indigo-950/20 to-slate-900 border border-slate-800 rounded-xl flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4 w-full"
  };

  return (
    <div className={`adsense-sandbox ${bannerStyles[type]} select-none transition-all hover:border-indigo-505/30 my-4`}>
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest border border-slate-750 px-1.5 py-0.5 rounded-sm bg-slate-950">
            SPONSOR
          </span>
          <span className="text-[10px] font-mono text-indigo-400 font-semibold">
            Google AdSense Placeholder
          </span>
        </div>
        <h4 className="text-[11px] font-bold text-slate-300 tracking-tight mt-1">
          {slotConfig.label}
        </h4>
        <p className="text-[10px] text-slate-500 leading-tight">
          Ad Slot ID: <code className="font-mono text-indigo-300 bg-slate-950 p-0.5 rounded">{slotConfig.slotId}</code> • format: {slotConfig.format}
        </p>
      </div>

      <div className="flex flex-col sm:items-end text-xs justify-center shrink-0">
        <span className="text-[9px] text-slate-450 bg-indigo-500/10 border border-indigo-500/20 px-2 py-1 rounded text-right">
          Ready to Receive Ads
        </span>
        <span className="text-[8px] text-slate-500 mt-1">
          Activate in <code className="font-mono text-indigo-300">src/seo.ts</code>
        </span>
      </div>
    </div>
  );
}
