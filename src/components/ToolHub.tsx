import React, { useState } from 'react';
import { 
  FileEdit, 
  Split
} from 'lucide-react';
import MarkdownEditor from './MarkdownEditor';
import DiffChecker from './DiffChecker';
import { SITE_SEO } from '../seo';

type ActiveTool = 'markdown' | 'diff';

export default function ToolHub() {
  const [activeTool, setActiveTool] = useState<ActiveTool>('markdown');

  return (
    <div className="flex flex-col h-screen max-h-screen bg-[#0F172A] text-slate-200 overflow-hidden font-sans" id="tool-hub-root">
      
      {/* CENTRAL DEVS SUITE BRAND EXTRACTION HEADER */}
      <header className="h-14 border-b border-slate-800 bg-[#1E293B] flex items-center justify-between px-6 shrink-0 z-10" id="tool-hub-main-header">
        
        {/* Hub Logo & Version */}
        <div className="flex items-center gap-3 select-none">
          <img src="/logo.svg" alt="DevHub Suite Logo" className="w-8.5 h-8.5 object-contain rounded-lg" />
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-white leading-tight">DevHub Pro</span>
            <span className="text-[9px] text-indigo-400 font-mono uppercase tracking-widest leading-none mt-1">
              Multi-Utility Suite
            </span>
          </div>
        </div>

        {/* Global Hub Navigation Tabs */}
        <div className="flex items-center bg-slate-950/60 p-1 rounded-xl border border-slate-800" id="tool-hub-navigation">
          <button
            onClick={() => setActiveTool('markdown')}
            className={`px-4 py-1.5 rounded-lg flex items-center gap-2 text-xs font-semibold cursor-pointer transition ${
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
            className={`px-4 py-1.5 rounded-lg flex items-center gap-2 text-xs font-semibold cursor-pointer transition ${
              activeTool === 'diff' 
                ? 'bg-indigo-650 text-white shadow-md shadow-indigo-950/30' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <Split className="w-3.5 h-3.5" />
            <span>Visual Diff Checker</span>
          </button>
        </div>

        {/* Empty visual layout balance placeholder for large screens */}
        <div className="hidden lg:block w-36"></div>

      </header>

      {/* CORE ACTIVE WORKSPACE CONTAINER PANEL */}
      <div className="flex-1 flex flex-col min-h-0 relative" id="active-tool-workspace">
        {activeTool === 'markdown' ? <MarkdownEditor /> : <DiffChecker />}
      </div>

    </div>
  );
}
