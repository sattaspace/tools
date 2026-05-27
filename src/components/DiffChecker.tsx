import React, { useState, useEffect, useRef } from 'react';
import { 
  FileCode, 
  RotateCcw, 
  ArrowLeftRight, 
  Copy, 
  Check, 
  SlidersHorizontal, 
  Upload, 
  Search, 
  Eye, 
  HelpCircle, 
  Sparkles, 
  GitPullRequest,
  CheckCircle2,
  Trash2,
  FileText,
  Split,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { computeLineDiff, computeCharacterDiff, type DiffItem, type WordDiffSegment } from '../utils/diffEngine';
import { DIFF_SAMPLES } from '../data/diffSamples';
import { AdsenseBanner } from './AdsenseBanner';

export default function DiffChecker() {
  // Source states
  const [originalText, setOriginalText] = useState<string>(DIFF_SAMPLES[0].original);
  const [modifiedText, setModifiedText] = useState<string>(DIFF_SAMPLES[0].modified);

  // Search query to filter or highlight lines in difference view
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Settings states
  const [ignoreWhitespace, setIgnoreWhitespace] = useState<boolean>(false);
  const [ignoreCase, setIgnoreCase] = useState<boolean>(false);
  const [highlightCharDiff, setHighlightCharDiff] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'split' | 'unified'>('split');
  const [hideUnchanged, setHideUnchanged] = useState<boolean>(false);

  // Status/Copy feedback states
  const [copiedOriginal, setCopiedOriginal] = useState<boolean>(false);
  const [copiedModified, setCopiedModified] = useState<boolean>(false);
  const [copiedUnified, setCopiedUnified] = useState<boolean>(false);
  
  // Custom alerts/modal states
  const [modalMessage, setModalMessage] = useState<{ show: boolean; title: string; text: string } | null>(null);

  // Computed results state
  const [diffItems, setDiffItems] = useState<DiffItem[]>([]);
  const [statistics, setStatistics] = useState({
    addedCount: 0,
    removedCount: 0,
    unchangedCount: 0,
    similarity: 100
  });

  // Calculate Difference using LCS Diff Engine
  useEffect(() => {
    const linesOrig = originalText.split(/\r?\n/);
    const linesMod = modifiedText.split(/\r?\n/);

    const items = computeLineDiff(linesOrig, linesMod, ignoreWhitespace, ignoreCase);
    setDiffItems(items);

    // Calculate count stats
    let added = 0;
    let removed = 0;
    let unchanged = 0;

    items.forEach(item => {
      if (item.type === 'added') added++;
      else if (item.type === 'removed') removed++;
      else if (item.type === 'unchanged') unchanged++;
    });

    // Calculate similarity index
    const totalLines = Math.max(linesOrig.length, linesMod.length);
    const similarity = totalLines > 0 
      ? Math.max(0, Math.min(100, Math.round((unchanged / totalLines) * 100))) 
      : 100;

    setStatistics({
      addedCount: added,
      removedCount: removed,
      unchangedCount: unchanged,
      similarity
    });
  }, [originalText, modifiedText, ignoreWhitespace, ignoreCase]);

  // Handle Drag & Drop For Left (Original)
  const [dragActiveLeft, setDragActiveLeft] = useState<boolean>(false);
  const handleDragLeft = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActiveLeft(true);
    } else if (e.type === "dragleave") {
      setDragActiveLeft(false);
    }
  };
  const handleDropLeft = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveLeft(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setOriginalText(event.target.result as string);
        }
      };
      reader.readAsText(file);
    }
  };

  // Handle Drag & Drop For Right (Modified)
  const [dragActiveRight, setDragActiveRight] = useState<boolean>(false);
  const handleDragRight = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActiveRight(true);
    } else if (e.type === "dragleave") {
      setDragActiveRight(false);
    }
  };
  const handleDropRight = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveRight(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setModifiedText(event.target.result as string);
        }
      };
      reader.readAsText(file);
    }
  };

  // Handle File Input Selectors
  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>, target: 'original' | 'modified') => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          if (target === 'original') {
            setOriginalText(event.target.result as string);
          } else {
            setModifiedText(event.target.result as string);
          }
        }
      };
      reader.readAsText(file);
    }
  };

  // Swapper function
  const swapSides = () => {
    const temp = originalText;
    setOriginalText(modifiedText);
    setModifiedText(temp);
  };

  const copyToClipboard = (text: string, flagSetter: React.Dispatch<React.SetStateAction<boolean>>) => {
    navigator.clipboard.writeText(text);
    flagSetter(true);
    setTimeout(() => flagSetter(false), 2000);
  };

  const loadSample = (sample: typeof DIFF_SAMPLES[0]) => {
    setOriginalText(sample.original);
    setModifiedText(sample.modified);
  };

  // Group diff items into pairs (removed / added) to perform precise character/word highlighting where possible
  const renderPairHighlight = (removedItem: DiffItem, addedItem: DiffItem) => {
    const { removedSegments, addedSegments } = computeCharacterDiff(removedItem.value, addedItem.value);

    return {
      leftHighlighted: (
        <span className="break-all whitespace-pre-wrap">
          {removedSegments.map((seg, sIdx) => (
            <span 
              key={sIdx} 
              className={seg.type === 'removed' ? 'bg-rose-500/35 text-rose-100 font-bold px-0.5 rounded-xs' : ''}
            >
              {seg.text}
            </span>
          ))}
        </span>
      ),
      rightHighlighted: (
        <span className="break-all whitespace-pre-wrap">
          {addedSegments.map((seg, sIdx) => (
            <span 
              key={sIdx} 
              className={seg.type === 'added' ? 'bg-emerald-500/35 text-emerald-100 font-bold px-0.5 rounded-xs' : ''}
            >
              {seg.text}
            </span>
          ))}
        </span>
      )
    };
  };

  // Build list of paired/aligned blocks for Split Side-By-Side layout
  const getAlignedDiffs = (): { left?: DiffItem; right?: DiffItem; innerCharDiff?: { left: React.ReactNode; right: React.ReactNode } }[] => {
    const aligned: { left?: DiffItem; right?: DiffItem; innerCharDiff?: { left: React.ReactNode; right: React.ReactNode } }[] = [];
    let idx = 0;

    while (idx < diffItems.length) {
      const current = diffItems[idx];
      const next = diffItems[idx + 1];

      // Check if current is a removed line and next is an added line, which allows character inline differences
      if (current && current.type === 'removed' && next && next.type === 'added') {
        if (highlightCharDiff) {
          const highlights = renderPairHighlight(current, next);
          aligned.push({
            left: current,
            right: next,
            innerCharDiff: {
              left: highlights.leftHighlighted,
              right: highlights.rightHighlighted
            }
          });
        } else {
          aligned.push({ left: current, right: next });
        }
        idx += 2;
      } else if (current.type === 'removed') {
        aligned.push({ left: current });
        idx++;
      } else if (current.type === 'added') {
        aligned.push({ right: current });
        idx++;
      } else {
        aligned.push({ left: current, right: current });
        idx++;
      }
    }

    return aligned;
  };

  const alignedLines = getAlignedDiffs();

  // Unified mode inline rows list
  // If adjacent removed/added, we can highlight character differences
  const getUnifiedRows = () => {
    const rows: { type: 'added' | 'removed' | 'unchanged'; renderContent: React.ReactNode; lineNumLeft?: number; lineNumRight?: number }[] = [];
    let idx = 0;

    while (idx < diffItems.length) {
      const current = diffItems[idx];
      const next = diffItems[idx + 1];

      if (current && current.type === 'removed' && next && next.type === 'added') {
        if (highlightCharDiff) {
          const highlights = renderPairHighlight(current, next);
          rows.push({
            type: 'removed',
            lineNumLeft: current.leftLineNum,
            renderContent: highlights.leftHighlighted
          });
          rows.push({
            type: 'added',
            lineNumRight: next.rightLineNum,
            renderContent: highlights.rightHighlighted
          });
        } else {
          rows.push({
            type: 'removed',
            lineNumLeft: current.leftLineNum,
            renderContent: current.value
          });
          rows.push({
            type: 'added',
            lineNumRight: next.rightLineNum,
            renderContent: next.value
          });
        }
        idx += 2;
      } else {
        rows.push({
          type: current.type,
          lineNumLeft: current.leftLineNum,
          lineNumRight: current.rightLineNum,
          renderContent: current.value
        });
        idx++;
      }
    }
    return rows;
  };

  const unifiedRows = getUnifiedRows();

  return (
    <div className="flex-1 flex flex-col overflow-hidden min-h-0 bg-[#0F172A]" id="diff-checker-workspace">
      
      {/* LOCAL UTILITY MENU & SAMPLE PRESET LOADER */}
      <div className="bg-[#1E293B] border-b border-slate-800/80 px-6 py-3 shrink-0 flex flex-col md:flex-row gap-4 items-center justify-between" id="diff-header-menu">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-indigo-600/10 rounded-lg text-indigo-400 border border-indigo-505/20">
            <Split className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">Visual Difference Checker</h2>
            <p className="text-[10px] text-slate-400 font-mono">Compare structure models, strings, or codes with precise inline annotations</p>
          </div>
        </div>

        {/* Preset Selectors */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none" id="diff-presets-panel">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest shrink-0 select-none">Samples:</span>
          {DIFF_SAMPLES.map((sample, sIdx) => (
            <button
              key={sIdx}
              onClick={() => loadSample(sample)}
              className="text-[11px] bg-slate-800 hover:bg-slate-75 *:transition duration-150 border border-slate-705 px-2.5 py-1 rounded-lg text-slate-300 hover:text-white shrink-0 font-medium cursor-pointer"
            >
              {sample.name}
            </button>
          ))}
        </div>
      </div>

      {/* CORE CONTROL SHEET */}
      <div className="bg-slate-900 border-b border-slate-800/40 p-5 shrink-0 flex flex-col xl:flex-row gap-5" id="diff-statistics-controls">
        
        {/* Statistics Widgets */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 flex-1 select-none">
          <div className="bg-slate-950/45 p-3 rounded-xl border border-slate-800/80 flex flex-col">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Similarity Match</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className={`text-lg font-bold font-mono ${statistics.similarity > 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {statistics.similarity}%
              </span>
              <span className="text-[9px] text-slate-500 font-medium font-sans">ratio</span>
            </div>
          </div>

          <div className="bg-slate-950/45 p-3 rounded-xl border border-slate-800/80 flex flex-col">
            <span className="text-[9px] font-bold text-rose-500 uppercase tracking-widest">Deletions (Left)</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-lg font-bold font-mono text-rose-400">
                -{statistics.removedCount}
              </span>
              <span className="text-[9px] text-slate-500 font-medium font-sans">lines</span>
            </div>
          </div>

          <div className="bg-slate-950/45 p-3 rounded-xl border border-slate-800/80 flex flex-col">
            <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Additions (Right)</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-lg font-bold font-mono text-emerald-400">
                +{statistics.addedCount}
              </span>
              <span className="text-[9px] text-slate-500 font-medium font-sans">lines</span>
            </div>
          </div>

          <div className="bg-slate-950/45 p-3 rounded-xl border border-slate-800/80 flex flex-col">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Unchanged Lines</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-lg font-bold font-mono text-slate-300">
                {statistics.unchangedCount}
              </span>
              <span className="text-[9px] text-slate-500 font-medium font-sans">stable</span>
            </div>
          </div>
        </div>

        {/* Engine Filters / Checkbox States */}
        <div className="bg-[#141C2F] p-4 rounded-xl border border-slate-800 flex flex-wrap gap-5 xl:gap-6 items-center">
          
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Engine Rules</span>
          </div>

          <label className="flex items-center gap-2 text-xs font-medium text-slate-350 cursor-pointer select-none">
            <input 
              type="checkbox" 
              checked={ignoreWhitespace} 
              onChange={() => setIgnoreWhitespace(!ignoreWhitespace)}
              className="accent-indigo-500 rounded border-slate-700 bg-slate-950 cursor-pointer" 
            />
            <span>Ignore Whitespace</span>
          </label>

          <label className="flex items-center gap-2 text-xs font-medium text-slate-350 cursor-pointer select-none">
            <input 
              type="checkbox" 
              checked={ignoreCase} 
              onChange={() => setIgnoreCase(!ignoreCase)}
              className="accent-indigo-500 rounded border-slate-700 bg-slate-950 cursor-pointer" 
            />
            <span>Ignore Case</span>
          </label>

          <label className="flex items-center gap-2 text-xs font-medium text-slate-350 cursor-pointer select-none">
            <input 
              type="checkbox" 
              checked={highlightCharDiff} 
              onChange={() => setHighlightCharDiff(!highlightCharDiff)}
              className="accent-indigo-500 rounded border-slate-700 bg-slate-950 cursor-pointer" 
            />
            <span>Highlight Characters</span>
          </label>

          <label className="flex items-center gap-2 text-xs font-medium text-slate-350 cursor-pointer select-none">
            <input 
              type="checkbox" 
              checked={hideUnchanged} 
              onChange={() => setHideUnchanged(!hideUnchanged)}
              className="accent-indigo-500 rounded border-slate-700 bg-slate-950 cursor-pointer" 
            />
            <span>Hide Stable Lines</span>
          </label>

          {/* Toggle View Side-by-Side vs Unified */}
          <div className="flex pl-3 border-l border-slate-800 items-center gap-1">
            <button
              onClick={() => setViewMode('split')}
              className={`px-3 py-1 font-bold text-[10px] rounded-lg tracking-wide uppercase transition cursor-pointer ${
                viewMode === 'split' 
                  ? 'bg-indigo-600 text-white shadow' 
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Split view
            </button>
            <button
              onClick={() => setViewMode('unified')}
              className={`px-3 py-1 font-bold text-[10px] rounded-lg tracking-wide uppercase transition cursor-pointer ${
                viewMode === 'unified' 
                  ? 'bg-indigo-600 text-white shadow' 
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Unified View
            </button>
          </div>
        </div>
      </div>

      {/* TWIN WORKSPACE INPUTS */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5 shrink-0 select-none" id="twin-source-textareas">
        
        {/* Left Input: Primary Original Document */}
        <div 
          className={`flex flex-col gap-2 rounded-xl border p-4.5 bg-[#1B253B] transition-all relative ${
            dragActiveLeft ? 'border-indigo-500 bg-indigo-950/20' : 'border-slate-800'
          }`}
          onDragEnter={handleDragLeft}
          onDragOver={handleDragLeft}
          onDragLeave={handleDragLeft}
          onDrop={handleDropLeft}
        >
          <div className="flex items-center justify-between text-xs mb-1 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800">
            <div className="flex items-center gap-2 font-bold text-slate-300">
              <FileText className="w-3.5 h-3.5 text-rose-455" />
              <span>ORIGINAL SOURCE (LEFT)</span>
            </div>
            
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1.5 text-[10px] text-slate-400 hover:text-white cursor-pointer transition font-mono">
                <Upload className="w-3 h-3" />
                <span>Upload</span>
                <input 
                  type="file" 
                  accept=".txt,.json,.js,.ts,.tsx,.py,.css,.html,.md" 
                  onChange={(e) => uploadFile(e, 'original')}
                  className="hidden" 
                />
              </label>
              
              <button 
                onClick={() => copyToClipboard(originalText, setCopiedOriginal)}
                className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 font-mono transition cursor-pointer ml-1"
                title="Copy Original Text"
              >
                {copiedOriginal ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedOriginal ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <textarea
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
            className="w-full h-36 max-h-48 text-[11px] font-mono bg-slate-950/75 text-rose-100 hover:text-white focus:text-white border border-slate-850 focus:border-indigo-500 focus:outline-hidden p-3 rounded-lg leading-relaxed focus:ring-1 focus:ring-indigo-505/30 transition shadow-inner"
            placeholder="Paste your original source, structure config, or code segment here..."
            id="editor-original-input"
          />

          {dragActiveLeft && (
            <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center border border-indigo-500 border-dashed rounded-xl select-none">
              <div className="text-center">
                <Upload className="w-8 h-8 text-indigo-400 mx-auto mb-2 animate-bounce" />
                <p className="text-xs font-bold text-white">Release File To Load Original Source</p>
                <p className="text-[10px] text-slate-500 mt-1">Accepts any formatted txt, json, markdown file</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Input: Target Modified Document */}
        <div 
          className={`flex flex-col gap-2 rounded-xl border p-4.5 bg-[#1B253B] transition-all relative ${
            dragActiveRight ? 'border-indigo-500 bg-indigo-950/20' : 'border-slate-800'
          }`}
          onDragEnter={handleDragRight}
          onDragOver={handleDragRight}
          onDragLeave={handleDragRight}
          onDrop={handleDropRight}
        >
          <div className="flex items-center justify-between text-xs mb-1 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800">
            <div className="flex items-center gap-2 font-bold text-slate-300">
              <FileCode className="w-3.5 h-3.5 text-emerald-455" />
              <span>MODIFIED TARGET (RIGHT)</span>
            </div>
            
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1.5 text-[10px] text-slate-400 hover:text-white cursor-pointer transition font-mono">
                <Upload className="w-3 h-3" />
                <span>Upload</span>
                <input 
                  type="file" 
                  accept=".txt,.json,.js,.ts,.tsx,.py,.css,.html,.md" 
                  onChange={(e) => uploadFile(e, 'modified')}
                  className="hidden" 
                />
              </label>
              
              <button 
                onClick={() => copyToClipboard(modifiedText, setCopiedModified)}
                className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 font-mono transition cursor-pointer ml-1"
                title="Copy Modified Text"
              >
                {copiedModified ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedModified ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <textarea
            value={modifiedText}
            onChange={(e) => setModifiedText(e.target.value)}
            className="w-full h-36 max-h-48 text-[11px] font-mono bg-slate-950/75 text-emerald-100 hover:text-white focus:text-white border border-slate-850 focus:border-indigo-500 focus:outline-hidden p-3 rounded-lg leading-relaxed focus:ring-1 focus:ring-indigo-505/30 transition shadow-inner"
            placeholder="Paste your reworked, modified code, formatted key-values, or copy specs here..."
            id="editor-modified-input"
          />

          {dragActiveRight && (
            <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center border border-indigo-500 border-dashed rounded-xl select-none">
              <div className="text-center">
                <Upload className="w-8 h-8 text-indigo-400 mx-auto mb-2 animate-bounce" />
                <p className="text-xs font-bold text-white">Release File To Load Modified Source</p>
                <p className="text-[10px] text-slate-500 mt-1">Accepts any formatted txt, json, markdown file</p>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* SWAP & RESET ALIGN BAR */}
      <div className="px-6 flex items-center justify-between pb-4 select-none shrink-0" id="diff-quick-actions-bar">
        <div className="flex gap-2">
          <button
            onClick={swapSides}
            className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-75 *:transition text-slate-300 hover:text-white text-[11px] rounded-lg border border-slate-705 flex items-center gap-1.5 font-bold cursor-pointer"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 text-indigo-400" />
            <span>Swap Source Left/Right</span>
          </button>
          
          <button
            onClick={() => {
              setOriginalText('');
              setModifiedText('');
            }}
            className="px-3.5 py-1.5 bg-slate-800/60 hover:bg-slate-80 text-rose-455 hover:text-rose-400 text-[11px] rounded-lg border border-slate-800 flex items-center gap-1.5 font-bold cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Both Fields</span>
          </button>
        </div>

        {/* Text Filter Search */}
        <div className="relative w-64 max-w-sm">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-500">
            <Search className="w-3 h-3" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950/75 border border-slate-800 text-[11px] text-slate-300 placeholder-slate-500 rounded-lg pl-8 pr-3 py-1.5 focus:outline-hidden focus:border-indigo-505"
            placeholder="Search matching diff content..."
          />
        </div>
      </div>

      {/* DYNAMIC SCROLL CONTAINER RENDERED PRESENTATION */}
      <div className="flex-1 overflow-y-auto px-6 pb-6 min-h-0 select-text" id="diff-output-canvas">
        
        {/* Mid-Content Ad Slot Banner */}
        <div className="mb-4">
          <AdsenseBanner type="midContent" />
        </div>

        <div className="bg-slate-950 border border-slate-800/80 rounded-xl overflow-hidden shadow-2xl flex flex-col h-full min-h-[300px]">
          
          <div className="h-10 px-4 bg-[#111827] border-b border-slate-800 flex items-center justify-between shrink-0 select-none">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div>
              <span className="text-[10px] font-bold text-slate-300 font-mono uppercase tracking-widest">
                ALIGNED COMPILATION VIEW • {viewMode} mode
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-[10px] text-slate-450 font-mono">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-xs bg-rose-500/20 border border-rose-500/40"></span> Deleted
              </span>
              <span className="flex items-center gap-1 pl-1">
                <span className="w-1.5 h-1.5 rounded-xs bg-emerald-500/20 border border-emerald-500/40"></span> Added
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-auto bg-[#0a0f1d] font-mono text-[11px] leading-relaxed relative min-h-0">
            
            {/* SPLIT / SIDE-BY-SIDE MODE */}
            {viewMode === 'split' && (
              <div className="grid grid-cols-2 divide-x divide-slate-800/60 min-w-[700px] h-full">
                
                {/* Left side diff output (Deletions/Unchanged) */}
                <div className="flex flex-col bg-slate-950/20">
                  {alignedLines.map((line, lIdx) => {
                    const meetsQuery = !searchQuery || 
                      (line.left && line.left.value.toLowerCase().includes(searchQuery.toLowerCase()));

                    if (!meetsQuery) return null;

                    // If unchanged, and user chose to hide unchanged lines, skip rendering
                    if (line.left?.type === 'unchanged' && hideUnchanged) return null;

                    // If only right has added content and left has nothing, we render an empty alignment placeholder block
                    if (!line.left) {
                      return (
                        <div key={lIdx} className="h-5.5 flex bg-emerald-950/5 select-none opacity-30 border-y border-transparent">
                          <div className="w-10 px-1 border-r border-slate-900 bg-slate-900/10 text-right select-none text-slate-700 select-none text-[10px] pr-2.5 leading-5.5">~</div>
                          <div className="flex-1 pl-4 leading-5.5 text-slate-700 italic text-[10px]">No original content</div>
                        </div>
                      );
                    }

                    const isRemoved = line.left.type === 'removed';
                    const hasInnerDiff = !!line.innerCharDiff;

                    return (
                      <div 
                        key={lIdx} 
                        className={`min-h-5.5 flex border-y border-transparent ${
                          isRemoved ? 'bg-rose-950/20 hover:bg-rose-950/30' : 'hover:bg-slate-850/20'
                        }`}
                      >
                        {/* Line Number column */}
                        <div className={`w-10 px-1 border-r border-slate-900 text-right select-none text-[10px] pr-2.5 leading-5.5 ${
                          isRemoved ? 'bg-rose-950/30 text-rose-500 font-bold' : 'bg-slate-900/10 text-slate-600'
                        }`}>
                          {line.left.leftLineNum}
                        </div>
                        {/* Status Icon Indicator */}
                        <div className={`w-5 flex items-center justify-center font-bold text-[10px] select-none ${
                          isRemoved ? 'text-rose-400' : 'text-slate-600'
                        }`}>
                          {isRemoved ? '-' : ' '}
                        </div>
                        {/* Code Content text */}
                        <div className={`flex-1 pl-3 pr-2 py-0.5 break-all whitespace-pre-wrap font-mono ${
                          isRemoved ? 'text-rose-200' : 'text-slate-300'
                        }`}>
                          {hasInnerDiff ? line.innerCharDiff?.left : line.left.value}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Right side diff output (Additions/Unchanged) */}
                <div className="flex flex-col bg-slate-950/20">
                  {alignedLines.map((line, lIdx) => {
                    const meetsQuery = !searchQuery || 
                      (line.right && line.right.value.toLowerCase().includes(searchQuery.toLowerCase()));

                    if (!meetsQuery) return null;

                    // If unchanged, and user chose to hide unchanged, skip rendering
                    if (line.left?.type === 'unchanged' && hideUnchanged) return null;

                    // If only left has deleted content and right has nothing, render empty align placeholder
                    if (!line.right) {
                      return (
                        <div key={lIdx} className="h-5.5 flex bg-rose-950/5 select-none opacity-30 border-y border-transparent">
                          <div className="w-10 px-1 border-r border-slate-900 bg-slate-900/10 text-right select-none text-slate-700 select-none text-[10px] pr-2.5 leading-5.5">~</div>
                          <div className="flex-1 pl-4 leading-5.5 text-slate-700 italic text-[10px]">No modified content</div>
                        </div>
                      );
                    }

                    const isAdded = line.right.type === 'added';
                    const hasInnerDiff = !!line.innerCharDiff;

                    return (
                      <div 
                        key={lIdx} 
                        className={`min-h-5.5 flex border-y border-transparent ${
                          isAdded ? 'bg-emerald-950/20 hover:bg-emerald-950/30' : 'hover:bg-slate-850/20'
                        }`}
                      >
                        {/* Line Number col */}
                        <div className={`w-10 px-1 border-r border-slate-900 text-right select-none text-[10px] pr-2.5 leading-5.5 ${
                          isAdded ? 'bg-emerald-950/30 text-emerald-500 font-bold' : 'bg-slate-900/10 text-slate-600'
                        }`}>
                          {line.right.rightLineNum}
                        </div>
                        {/* Status Icon Selector */}
                        <div className={`w-5 flex items-center justify-center font-bold text-[10px] select-none ${
                          isAdded ? 'text-emerald-400' : 'text-slate-600'
                        }`}>
                          {isAdded ? '+' : ' '}
                        </div>
                        {/* Code Segment Content */}
                        <div className={`flex-1 pl-3 pr-2 py-0.5 break-all whitespace-pre-wrap font-mono ${
                          isAdded ? 'text-emerald-200' : 'text-slate-300'
                        }`}>
                          {hasInnerDiff ? line.innerCharDiff?.right : line.right.value}
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            )}

            {/* UNIFIED / INLINE MODE */}
            {viewMode === 'unified' && (
              <div className="flex flex-col">
                {unifiedRows.map((row, rIdx) => {
                  const contentStr = typeof row.renderContent === 'string' 
                    ? row.renderContent 
                    : '';

                  const meetsQuery = !searchQuery || contentStr.toLowerCase().includes(searchQuery.toLowerCase());
                  if (!meetsQuery) return null;

                  if (row.type === 'unchanged' && hideUnchanged) return null;

                  const isAdded = row.type === 'added';
                  const isRemoved = row.type === 'removed';

                  let bgClass = 'hover:bg-slate-850/20';
                  let textClass = 'text-slate-350';
                  let symbol = ' ';
                  let borderNumL = 'bg-slate-900/10 text-slate-600';
                  let borderNumR = 'bg-slate-900/10 text-slate-600';

                  if (isAdded) {
                    bgClass = 'bg-emerald-950/20 hover:bg-emerald-950/30';
                    textClass = 'text-emerald-200';
                    symbol = '+';
                    borderNumR = 'bg-emerald-950/30 text-emerald-500 font-bold';
                  } else if (isRemoved) {
                    bgClass = 'bg-rose-950/20 hover:bg-rose-950/30';
                    textClass = 'text-rose-200';
                    symbol = '-';
                    borderNumL = 'bg-rose-950/30 text-rose-500 font-bold';
                  }

                  return (
                    <div key={rIdx} className={`min-h-5.5 flex border-y border-transparent ${bgClass}`}>
                      {/* Left side line numbers (original) */}
                      <div className={`w-10 px-1 border-r border-slate-900 text-right select-none text-[10px] pr-2.5 leading-5.5 ${borderNumL}`}>
                        {row.lineNumLeft || ''}
                      </div>
                      
                      {/* Right side line numbers (modified) */}
                      <div className={`w-10 px-1 border-r border-[#1b253b] text-right select-none text-[10px] pr-2.5 leading-5.5 mr-2 ${borderNumR}`}>
                        {row.lineNumRight || ''}
                      </div>

                      {/* Status marker */}
                      <div className={`w-4 flex items-center justify-center font-bold text-[10px] select-none ${
                        isAdded ? 'text-emerald-400' : isRemoved ? 'text-rose-400' : 'text-slate-600'
                      }`}>
                        {symbol}
                      </div>

                      {/* Output element */}
                      <div className={`flex-1 pl-3 pr-2 py-0.5 break-all whitespace-pre-wrap font-mono ${textClass}`}>
                        {row.renderContent}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Empty check */}
            {diffItems.length === 0 && (
              <div className="py-20 flex flex-col items-center justify-center text-center select-none" id="diff-empty-indicator">
                <FileCode className="w-12 h-12 text-slate-600 mb-2.5 animate-pulse" />
                <h4 className="text-sm font-bold text-slate-400">No input content supplied</h4>
                <p className="text-[11px] text-slate-600 max-w-xs leading-normal mt-1">
                  Fill fields manually or select one of the high-fidelity template samples above to compare.
                </p>
              </div>
            )}

          </div>
        </div>

        {/* Footer Ad Slot Banner */}
        <div className="mt-5">
          <AdsenseBanner type="footer" />
        </div>

      </div>
    </div>
  );
}
