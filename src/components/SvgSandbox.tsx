import React, { useState, useEffect } from 'react';
import { 
  FileCode, 
  Settings, 
  Trash2, 
  Copy, 
  Check, 
  Sparkles, 
  Eye, 
  Languages, 
  Sliders, 
  SlidersHorizontal, 
  Download, 
  Grid, 
  Compass, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Image
} from 'lucide-react';
import { optimizeSvg, DEFAULT_SVG_PRESET, type SvgOptimizationOptions } from '../utils/svgOptimizer';
import { AdsenseBanner } from './AdsenseBanner';
import { ToolSeoContent } from './ToolSeoContent';

export default function SvgSandbox() {
  const [rawSvg, setRawSvg] = useState<string>(DEFAULT_SVG_PRESET);
  const [optimizedSvg, setOptimizedSvg] = useState<string>('');

  // Svg Sandbox Visual States
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [gridColor, setGridColor] = useState<'dark-grid' | 'light-grid' | 'navy' | 'black'>('dark-grid');

  // Optimization Checklist configurations
  const [stripComments, setStripComments] = useState<boolean>(true);
  const [stripMetadata, setStripMetadata] = useState<boolean>(true);
  const [stripNamespaces, setStripNamespaces] = useState<boolean>(true);
  const [roundDecimals, setRoundDecimals] = useState<boolean>(true);
  const [decimalPlaces, setDecimalPlaces] = useState<number>(2);
  const [minify, setMinify] = useState<boolean>(false);

  // Copy success status
  const [copiedOpt, setCopiedOpt] = useState<boolean>(false);
  const [copiedRaw, setCopiedRaw] = useState<boolean>(false);

  // Synchronous compile callback
  const handleOptimize = () => {
    if (!rawSvg.trim()) {
      setOptimizedSvg('');
      return;
    }
    const options: SvgOptimizationOptions = {
      stripComments,
      stripMetadata,
      stripNamespaces,
      roundDecimals,
      decimalPlaces,
      minify
    };
    try {
      const optimized = optimizeSvg(rawSvg, options);
      setOptimizedSvg(optimized);
    } catch (err) {
      console.error(err);
    }
  };

  // Run automatically on input/option trigger shifts
  useEffect(() => {
    handleOptimize();
  }, [rawSvg, stripComments, stripMetadata, stripNamespaces, roundDecimals, decimalPlaces, minify]);

  // Set preset
  const handleLoadPreset = () => {
    setRawSvg(DEFAULT_SVG_PRESET);
    setZoomLevel(100);
    setGridColor('dark-grid');
  };

  const copyToClipboard = (text: string, setFlag: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setFlag(true);
    setTimeout(() => setFlag(false), 2000);
  };

  const handleDownload = () => {
    if (!optimizedSvg) return;
    const blob = new Blob([optimizedSvg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'vector_artwork_optimized.svg';
    link.click();
    URL.revokeObjectURL(url);
  };

  // Calculations weight
  const rawBytes = new TextEncoder().encode(rawSvg).length;
  const optBytes = new TextEncoder().encode(optimizedSvg).length;
  const savedPercent = rawBytes > 0 
    ? Math.max(0, Math.round(((rawBytes - optBytes) / rawBytes) * 100)) 
    : 0;

  return (
    <div className="flex-1 flex flex-col overflow-hidden min-h-0 bg-[#0F172A]" id="svg-sandbox-main-layout">
      
      {/* LOCAL NAV SUB-TOOLBAR */}
      <div className="bg-[#1E293B] border-b border-slate-800/80 px-6 py-3 shrink-0 flex flex-col md:flex-row gap-4 items-center justify-between" id="svg-header-menu">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-sky-600/10 rounded-lg text-sky-400 border border-sky-500/20">
            <Image className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">SVG Optimizer & Vector Sandbox Canvas</h2>
            <p className="text-[10px] text-slate-400 font-mono font-semibold">Tweak vectors, eliminate redundant metadata, compile minified inline XMLs</p>
          </div>
        </div>

        {/* Local helper presets trigger button */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleLoadPreset}
            className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-75 *transition duration-150 text-slate-350 hover:text-white border border-slate-705 text-xs font-bold rounded-lg cursor-pointer"
          >
            Reset Default Cyber-Badge Asset
          </button>
        </div>
      </div>

      {/* CORE CONTROL SHEET */}
      <div className="bg-slate-900 border-b border-slate-800/45 p-4 shrink-0 flex flex-wrap items-center justify-between gap-5" id="svg-opt-control-sheet">
        
        {/* Statistics trackers */}
        <div className="flex items-center gap-4.5 bg-slate-950/40 p-2 rounded-xl border border-slate-850">
          <div className="flex items-baseline gap-1 text-xs">
            <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Original:</span>
            <span className="font-mono font-semibold text-slate-300">{(rawBytes / 1024).toFixed(2)} KB</span>
          </div>
          
          <span className="h-4 border-l border-slate-800"></span>

          <div className="flex items-baseline gap-1 text-xs">
            <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Optimized:</span>
            <span className="font-mono font-semibold text-sky-400">{(optBytes / 1024).toFixed(2)} KB</span>
          </div>

          <span className="h-4 border-l border-slate-800"></span>

          {savedPercent > 0 && (
            <div className="text-[10px] font-bold text-emerald-400 bg-emerald-950/45 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
              {savedPercent}% BANDWIDTH SAVED!
            </div>
          )}
        </div>

        {/* Checkerboard/Navy Stage Grid controls */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mr-1.5 select-none font-medium">
            <Compass className="w-3.5 h-3.5 text-sky-400" />
            <span>Stage Grid Layout:</span>
          </div>

          <div className="flex items-center bg-slate-950/60 p-0.5 rounded-lg border border-slate-805 text-[10px]">
            <button
              onClick={() => setGridColor('dark-grid')}
              className={`px-2.5 py-1 rounded font-bold uppercase cursor-pointer ${
                gridColor === 'dark-grid' ? 'bg-sky-600 text-white shadow' : 'text-slate-450 hover:text-white'
              }`}
            >
              Dark Grid
            </button>
            <button
              onClick={() => setGridColor('light-grid')}
              className={`px-2.5 py-1 rounded font-bold uppercase cursor-pointer ${
                gridColor === 'light-grid' ? 'bg-sky-600 text-white shadow' : 'text-slate-450 hover:text-white'
              }`}
            >
              Light Grid
            </button>
            <button
              onClick={() => setGridColor('navy')}
              className={`px-2.5 py-1 rounded font-bold uppercase cursor-pointer ${
                gridColor === 'navy' ? 'bg-sky-600 text-white shadow' : 'text-slate-450 hover:text-white'
              }`}
            >
              Solid Navy
            </button>
            <button
              onClick={() => setGridColor('black')}
              className={`px-2.5 py-1 rounded font-bold uppercase cursor-pointer ${
                gridColor === 'black' ? 'bg-sky-600 text-white shadow' : 'text-slate-450 hover:text-white'
              }`}
            >
              Black
            </button>
          </div>

          {/* Zoom controls inputs */}
          <div className="flex items-center gap-2 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800 text-xs">
            <button onClick={() => setZoomLevel(Math.max(25, zoomLevel - 25))} className="p-1 hover:text-white text-slate-400 cursor-pointer" title="Zoom Out">
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            
            <input 
              type="range" 
              min="25" 
              max="300" 
              step="25"
              value={zoomLevel} 
              onChange={(e) => setZoomLevel(parseInt(e.target.value))}
              className="accent-sky-500 w-20 cursor-pointer" 
            />

            <span className="font-mono font-bold text-sky-400 text-[10px] w-9 text-right shrink-0">
              {zoomLevel}%
            </span>

            <button onClick={() => setZoomLevel(Math.min(300, zoomLevel + 25))} className="p-1 hover:text-white text-slate-400 cursor-pointer" title="Zoom In">
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* DYNAMIC TWO WAY CODES SHEETS */}
      <div className="flex-1 overflow-y-auto px-6 pb-6 min-h-0 select-text" id="svg-workspace-grid">
        
        {/* Mid-Content Ad Slot Banner */}
        <div className="mb-4">
          <AdsenseBanner type="midContent" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
          
          {/* Output Block 1: Raw paste source and triggers optimizer checkboxes */}
          <div className="xl:col-span-4 flex flex-col gap-4 bg-[#1B253B] rounded-2xl border border-slate-800/70 p-4.5 relative overflow-hidden">
            <div className="flex items-center gap-2 border-b border-slate-800/80 pb-2.5 select-none">
              <SlidersHorizontal className="w-4 h-4 text-sky-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-widest">Optimizer Formulas</h3>
            </div>

            {/* Checkbox triggers list */}
            <div className="space-y-3.5 text-xs text-slate-300 font-medium select-none">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={stripComments}
                  onChange={() => setStripComments(!stripComments)}
                  className="accent-sky-500 rounded border-slate-700 bg-slate-950 cursor-pointer" 
                />
                <span>Strip Comments <span className="text-[10px] text-slate-500 font-mono">(&lt;!-- ... --&gt;)</span></span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={stripMetadata}
                  onChange={() => setStripMetadata(!stripMetadata)}
                  className="accent-sky-500 rounded border-slate-700 bg-slate-950 cursor-pointer" 
                />
                <span>Strip Metadata, Descs & Titles</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={stripNamespaces}
                  onChange={() => setStripNamespaces(!stripNamespaces)}
                  className="accent-sky-500 rounded border-slate-700 bg-slate-950 cursor-pointer" 
                />
                <span>Strip Editor Namespaces <span className="text-[10px] text-slate-500 font-mono">(Inkscape, Sodipodi)</span></span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={roundDecimals}
                  onChange={() => setRoundDecimals(!roundDecimals)}
                  className="accent-sky-500 rounded border-slate-700 bg-slate-950 cursor-pointer" 
                />
                <span>Round Path Coordinate Decimals</span>
              </label>

              {roundDecimals && (
                <div className="pl-6 flex items-center gap-2">
                  <span className="text-[10px] text-slate-400">Decimals target precision:</span>
                  <select
                    value={decimalPlaces}
                    onChange={(e) => setDecimalPlaces(parseInt(e.target.value))}
                    className="bg-slate-950 border border-slate-800 text-[10px] text-sky-400 py-0.5 px-2 rounded font-mono"
                  >
                    {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n} place{n > 1 ? 's' : ''}</option>)}
                  </select>
                </div>
              )}

              <label className="flex items-center gap-2.5 cursor-pointer pt-2 border-t border-slate-800/70">
                <input 
                  type="checkbox" 
                  checked={minify}
                  onChange={() => setMinify(!minify)}
                  className="accent-sky-500 rounded border-slate-700 bg-slate-950 cursor-pointer" 
                />
                <span className="font-bold text-sky-300">Minify Outputs (strip linebreaks)</span>
              </label>
            </div>

            <div className="flex flex-col gap-1.5 mt-2">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block select-none">
                RAW VEKTOR SOURCE XML:
              </span>
              <textarea
                value={rawSvg}
                onChange={(e) => setRawSvg(e.target.value)}
                className="w-full h-36 max-h-48 text-[10px] font-mono bg-slate-955 bg-slate-950/85 text-sky-100 hover:text-white border border-slate-850 rounded-lg p-2.5 leading-relaxed focus:outline-hidden focus:border-sky-500 shadow-inner"
                placeholder="Paste code segments here directly..."
              />
            </div>
          </div>

          {/* Output Block 2: Live interactive stage (dynamic zooming) */}
          <div className="xl:col-span-4 flex flex-col bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl h-[420px]">
            <div className="h-10 px-4 bg-[#111827] border-b border-slate-850 flex items-center justify-between col-span-1 select-none">
              <div className="flex items-center gap-2">
                <Eye className="w-3.5 h-3.5 text-sky-400" />
                <span className="text-[10px] font-bold text-slate-350 font-mono uppercase tracking-widest">LIVE RENDER STAGE</span>
              </div>
            </div>

            {/* Display panel with responsive checkerboard styled background configurations */}
            <div className="flex-1 relative overflow-auto flex items-center justify-center p-4" id="svg-sandbox-stage-panel">
              
              {/* Checkerboard/Custom Grid Styles backing */}
              <div className={`absolute inset-0 transition-all ${
                gridColor === 'dark-grid' 
                  ? 'bg-[#0b0f19] bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]' 
                  : gridColor === 'light-grid'
                  ? 'bg-[#f1f5f9] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]'
                  : gridColor === 'navy'
                  ? 'bg-[#1e293b]'
                  : 'bg-black'
              }`} />

              {/* Rendered scalable SVG block container */}
              <div 
                className="relative transition-all duration-150 select-none pointer-events-none"
                style={{ 
                  transform: `scale(${zoomLevel / 100})`, 
                  maxHeight: '100%', 
                  maxWidth: '100%',
                  width: '280px',
                  height: '280px'
                }}
                dangerouslySetInnerHTML={{ __html: optimizedSvg || '<g></g>' }}
              />

            </div>
          </div>

          {/* Output Block 3: Optimized source markup output display */}
          <div className="xl:col-span-4 flex flex-col bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl h-[420px]">
            <div className="h-10 px-4.5 bg-[#111827] border-b border-slate-850 flex items-center justify-between col-span-1 select-none">
              <div className="flex items-center gap-2">
                <FileCode className="w-3.5 h-3.5 text-sky-400" />
                <span className="text-[10px] font-bold text-slate-350 font-mono uppercase tracking-widest">OPTIMIZED SVG XML</span>
              </div>

              <button 
                onClick={() => copyToClipboard(optimizedSvg, setCopiedOpt)}
                className="text-[10px] text-slate-450 hover:text-white flex items-center gap-1.5 font-mono transition cursor-pointer"
              >
                {copiedOpt ? <Check className="w-3.5 h-3.5 text-emerald-400 font-bold" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Code</span>
              </button>
            </div>

            <div className="flex-1 overflow-auto bg-[#070b14] p-4 font-mono text-[10px] leading-relaxed relative select-text scrollbar-thin scrollbar-thumb-slate-800">
              <pre className="text-sky-350 whitespace-pre-wrap">{optimizedSvg}</pre>
            </div>

            {/* Bottom Download and Quick Action bars */}
            <div className="bg-[#111827] border-t border-slate-850 p-3 flex justify-between items-center select-none" id="svg-canvas-output-actions">
              <button
                onClick={handleDownload}
                className="w-full bg-[#1e293b] hover:bg-[#2d3748] border border-slate-800 text-sky-350 hover:text-white transition font-bold py-2 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Optimized File (.svg)</span>
              </button>
            </div>
          </div>

        </div>

        {/* High-fidelity SEO optimization copy */}
        <div className="mt-8 select-text">
          <ToolSeoContent tool="svg" />
        </div>

        {/* Footer Ad Slot Banner */}
        <div className="mt-10">
          <AdsenseBanner type="footer" />
        </div>

      </div>

    </div>
  );
}
