import React, { useState } from 'react';
import { 
  FileEdit, 
  Split,
  Fingerprint,
  Database,
  Image,
  Braces
} from 'lucide-react';
import MarkdownEditor from './MarkdownEditor';
import DiffChecker from './DiffChecker';
import CryptHelper from './CryptHelper';
import BlueprintGenerator from './BlueprintGenerator';
import SvgSandbox from './SvgSandbox';
import RegexSandbox from './RegexSandbox';
import { SITE_SEO } from '../seo';

type ActiveTool = 'markdown' | 'diff' | 'crypto' | 'blueprint' | 'svg' | 'regex';

export default function ToolHub() {
  const [activeTool, setActiveTool] = useState<ActiveTool>('markdown');

  return (
    <div className="flex flex-col h-screen max-h-screen bg-[#0F172A] text-slate-200 overflow-hidden font-sans" id="tool-hub-root">
      
      {/* CENTRAL DEVS SUITE BRAND EXTRACTION HEADER */}
      <header className="h-14 border-b border-slate-800 bg-[#1E293B] flex items-center justify-between px-6 shrink-0 z-10" id="tool-hub-main-header">
        
        {/* Hub Logo & Version */}
        <div className="flex items-center gap-3 select-none">
          <img src="/logo.svg" alt="SattaSpace Tools Logo" className="w-8.5 h-8.5 object-contain rounded-lg" />
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-white leading-tight">SattaSpace Tools</span>
            <span className="text-[9px] text-indigo-400 font-mono uppercase tracking-widest leading-none mt-1">
              Multi-Utility Suite
            </span>
          </div>
        </div>

        {/* Global Hub Navigation Tabs */}
        <div className="flex items-center bg-slate-950/60 p-1 rounded-xl border border-slate-800" id="tool-hub-navigation">
          <button
            onClick={() => setActiveTool('markdown')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-semibold cursor-pointer transition ${
              activeTool === 'markdown' 
                ? 'bg-indigo-650 text-white shadow-md shadow-indigo-950/30' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <FileEdit className="w-3.5 h-3.5" />
            <span>Markdown Workspace</span>
          </button>

          <button
            onClick={() => setActiveTool('diff')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-semibold cursor-pointer transition ${
              activeTool === 'diff' 
                ? 'bg-indigo-650 text-white shadow-md shadow-indigo-950/30' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <Split className="w-3.5 h-3.5" />
            <span>Diff Checker</span>
          </button>

          <button
            onClick={() => setActiveTool('crypto')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-semibold cursor-pointer transition ${
              activeTool === 'crypto' 
                ? 'bg-indigo-650 text-white shadow-md shadow-indigo-950/30' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <Fingerprint className="w-3.5 h-3.5" />
            <span>Crypt & Encoders</span>
          </button>

          <button
            onClick={() => setActiveTool('blueprint')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-semibold cursor-pointer transition ${
              activeTool === 'blueprint' 
                ? 'bg-indigo-650 text-white shadow-md shadow-indigo-950/30' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Blueprint Builder</span>
          </button>

          <button
            onClick={() => setActiveTool('svg')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-semibold cursor-pointer transition ${
              activeTool === 'svg' 
                ? 'bg-indigo-650 text-white shadow-md shadow-indigo-950/30' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <Image className="w-3.5 h-3.5" />
            <span>SVG Optimizer</span>
          </button>

          <button
            onClick={() => setActiveTool('regex')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-semibold cursor-pointer transition ${
              activeTool === 'regex' 
                ? 'bg-indigo-650 text-white shadow-md shadow-indigo-950/30' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <Braces className="w-3.5 h-3.5" />
            <span>Regex Sandbox</span>
          </button>
        </div>

        {/* Empty visual layout balance placeholder for large screens */}
        <div className="hidden lg:block w-36"></div>

      </header>

      {/* CORE ACTIVE WORKSPACE CONTAINER PANEL */}
      <div className="flex-1 flex flex-col min-h-0 relative" id="active-tool-workspace">
        {activeTool === 'markdown' && <MarkdownEditor />}
        {activeTool === 'diff' && <DiffChecker />}
        {activeTool === 'crypto' && <CryptHelper />}
        {activeTool === 'blueprint' && <BlueprintGenerator />}
        {activeTool === 'svg' && <SvgSandbox />}
        {activeTool === 'regex' && <RegexSandbox />}
      </div>

    </div>
  );
}
