import React, { useEffect, useRef } from 'react';
import { 
  FileEdit, 
  Split, 
  Fingerprint, 
  Database, 
  Image, 
  Braces, 
  ArrowRight, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
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

interface SuiteToolLink {
  path: string;
  name: string;
  shortDesc: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SUITE_TOOLS: SuiteToolLink[] = [
  {
    path: '/markdown/',
    name: 'Markdown Workspace',
    shortDesc: 'Live GFM editor & HTML converter',
    badge: 'GFM',
    icon: FileEdit
  },
  {
    path: '/diff/',
    name: 'Visual Diff Checker',
    shortDesc: 'Compare files with LCS algorithm',
    badge: 'Diff',
    icon: Split
  },
  {
    path: '/crypto/',
    name: 'Crypt & Encoders',
    shortDesc: 'Hashes, HMAC, Base64 & JWT inspector',
    badge: 'Security',
    icon: Fingerprint
  },
  {
    path: '/blueprint/',
    name: 'Blueprint Generator',
    shortDesc: 'Synthetic JSON & CSV database generator',
    badge: 'Data',
    icon: Database
  },
  {
    path: '/svg/',
    name: 'SVG Optimizer',
    shortDesc: 'Strip metadata & minify vector paths',
    badge: 'Vectors',
    icon: Image
  },
  {
    path: '/regex/',
    name: 'Regex Sandbox',
    shortDesc: 'Live matches, groups & substitution',
    badge: 'Regex',
    icon: Braces
  }
];

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

  // Render Real AdSense Tag when enabled and not in testMode
  if (adsenseConfig.enabled && !adsenseConfig.testMode) {
    return (
      <div 
        className="adsense-wrapper my-4 overflow-hidden w-full mx-auto" 
        style={slotConfig.style}
        data-ad-ready="true"
        data-ad-slot={slotConfig.slotId}
      >
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

  // Smooth client-side navigation handler for SPA links
  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
      e.preventDefault();
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  // Render Ad-Ready Block with contextual internal links when no live ads are active
  if (type === 'sidebar') {
    const sidebarTools = SUITE_TOOLS.slice(1, 4); // Suggest 3 other tools
    return (
      <div 
        className="adsense-block-sidebar p-3.5 bg-slate-900/70 border border-slate-800 rounded-xl flex flex-col gap-2.5 my-3 select-none transition-all hover:border-slate-700"
        data-ad-ready="true"
        data-ad-slot={slotConfig.slotId}
      >
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[8.5px] font-bold text-slate-500 uppercase tracking-widest border border-slate-750 px-1 py-0.5 rounded-xs bg-slate-950 font-mono">
              SPONSOR
            </span>
            <span className="text-[10px] font-semibold text-slate-300">
              More Dev Tools
            </span>
          </div>
          <span className="text-[9px] font-mono text-indigo-400/80">
            Slot: {slotConfig.slotId}
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          {sidebarTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <a
                key={tool.path}
                href={tool.path}
                onClick={(e) => handleNavigate(e, tool.path)}
                className="group p-2 rounded-lg bg-slate-950/40 hover:bg-indigo-950/30 border border-slate-800/60 hover:border-indigo-500/40 transition-all flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded bg-slate-900 text-slate-400 group-hover:text-indigo-400 transition-colors">
                    <Icon className="w-3 h-3" />
                  </div>
                  <div>
                    <h5 className="text-[10.5px] font-bold text-slate-200 group-hover:text-white transition-colors">
                      {tool.name}
                    </h5>
                    <p className="text-[9px] text-slate-400 truncate max-w-[130px]">
                      {tool.shortDesc}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-3 h-3 text-slate-450 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
              </a>
            );
          })}
        </div>

        <div className="text-[8.5px] text-slate-400 text-center pt-1 border-t border-slate-800/60 flex items-center justify-center gap-1 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/70 inline-block"></span>
          <span>Ad-Ready Block â€¢ Switch live in src/seo.ts</span>
        </div>
      </div>
    );
  }

  if (type === 'midContent') {
    const midTools = [SUITE_TOOLS[1], SUITE_TOOLS[3], SUITE_TOOLS[5]]; // Diff, Blueprint, Regex
    return (
      <div 
        className="adsense-block-midcontent p-4 bg-gradient-to-r from-slate-900 via-indigo-950/20 to-slate-900 border border-slate-800 rounded-xl my-4 select-none transition-all hover:border-indigo-500/30 w-full"
        data-ad-ready="true"
        data-ad-slot={slotConfig.slotId}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[8.5px] font-bold text-slate-500 uppercase tracking-widest border border-slate-750 px-1.5 py-0.5 rounded-xs bg-slate-950 font-mono">
              SPONSOR
            </span>
            <span className="text-xs font-bold text-slate-200 tracking-tight flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Recommended Developer Utilities</span>
            </span>
          </div>
          <span className="text-[9.5px] font-mono text-indigo-300/80">
            Ad-Ready Unit â€¢ Slot {slotConfig.slotId} ({slotConfig.format})
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {midTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <a
                key={tool.path}
                href={tool.path}
                onClick={(e) => handleNavigate(e, tool.path)}
                className="group p-3 rounded-lg bg-slate-950/50 hover:bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between text-left gap-2"
              >
                <div className="flex items-center justify-between">
                  <div className="p-1.5 rounded-md bg-slate-900 border border-slate-800 text-slate-400 group-hover:text-indigo-400 group-hover:border-indigo-500/30 transition-all">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[9px] font-mono font-bold text-slate-500 border border-slate-800 px-1.5 py-0.5 rounded bg-slate-950">
                    {tool.badge}
                  </span>
                </div>
                <div>
                  <h5 className="text-[11px] font-bold text-slate-200 group-hover:text-white transition-colors">
                    {tool.name}
                  </h5>
                  <p className="text-[9.5px] text-slate-450 leading-snug mt-0.5">
                    {tool.shortDesc}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[9.5px] font-bold text-indigo-400 group-hover:text-indigo-300 pt-1">
                  <span>Launch Tool</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    );
  }

  // Footer Leaderboard Slot
  return (
    <div 
      className="adsense-block-footer px-5 py-3.5 bg-slate-900/60 border border-slate-800/80 rounded-xl my-3 select-none transition-all hover:border-slate-750 w-full flex flex-col md:flex-row items-center justify-between gap-3"
      data-ad-ready="true"
      data-ad-slot={slotConfig.slotId}
    >
      <div className="flex items-center gap-3">
        <span className="text-[8.5px] font-bold text-slate-500 uppercase tracking-widest border border-slate-750 px-1.5 py-0.5 rounded-xs bg-slate-950 font-mono shrink-0">
          SPONSOR
        </span>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-slate-200 tracking-tight">
            SattaSpace Developer Ecosystem
          </span>
          <span className="text-[10px] text-slate-400 font-sans">
            100% client-side privacy-first developer tools â€¢ No telemetry or data storage
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 justify-center md:justify-end">
        {SUITE_TOOLS.map((tool) => {
          const Icon = tool.icon;
          return (
            <a
              key={tool.path}
              href={tool.path}
              onClick={(e) => handleNavigate(e, tool.path)}
              className="px-2.5 py-1 rounded-md bg-slate-950/70 hover:bg-indigo-950/40 border border-slate-800 hover:border-indigo-500/40 text-[10px] font-medium text-slate-300 hover:text-white transition-all flex items-center gap-1"
            >
              <Icon className="w-3 h-3 text-slate-450" />
              <span>{tool.name}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Dedicated, non-intrusive blank space for Google AdSense Auto Ads.
 * Placed in natural reading / scroll flows with reserved height to prevent CLS.
 */
export function AutoAdSpace({ 
  className = '',
  label = 'Sponsored Advertisement'
}: { 
  className?: string;
  label?: string;
}) {
  return (
    <div 
      className={`google-auto-ads-container my-6 w-full min-h-[90px] border border-dashed border-slate-800/40 rounded-xl bg-slate-950/15 flex flex-col items-center justify-center p-3 text-center transition-all overflow-hidden select-none ${className}`}
      aria-label="Advertisement Space"
      data-google-auto-ad-zone="true"
    >
      <div className="flex items-center gap-1.5 opacity-60">
        <span className="text-[8.5px] font-mono tracking-widest text-slate-500 uppercase border border-slate-800 px-1.5 py-0.5 rounded bg-slate-900/60">
          AUTO AD
        </span>
        <span className="text-[9.5px] font-mono text-slate-400">
          {label}
        </span>
      </div>
      <p className="text-[9px] text-slate-400 mt-1 font-mono">
        Reserved responsive container for Google Auto Ads
      </p>
    </div>
  );
}