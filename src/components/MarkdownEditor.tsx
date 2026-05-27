import React, { useState, useEffect, useRef } from 'react';
import { 
  FileCode, 
  BookOpen, 
  Copy, 
  FileDown, 
  Columns, 
  Eye, 
  Edit, 
  RotateCcw, 
  Check, 
  FileText, 
  LayoutGrid, 
  Settings, 
  ChevronRight, 
  ListCollapse,
  HelpCircle,
  Clock,
  ExternalLink
} from 'lucide-react';
import { marked } from 'marked';
import { HTML_THEMES, MARKDOWN_TEMPLATES } from '../data/themesAndTemplates';
import { convertHtmlToMarkdown } from '../utils/htmlToMarkdown';
import { AdsenseBanner } from './AdsenseBanner';
import type { HtmlTheme, MarkdownTemplate, TableOfContentsItem } from '../types';

// Helper function to scope a raw CSS stylesheet string to a specific container class (e.g. .markdown-body)
const scopeCss = (cssString: string, containerClass: string): string => {
  // Replace references to root/body with containerClass
  let scoped = cssString.replace(/\bbody\b/g, containerClass);
  
  // Scoped elements we want to style specifically inside .markdown-body
  const selectors = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'blockquote', 'code', 'pre', 'ul', 'ol', 'li', 'hr', 'table', 'th', 'td', 'tr', 'img'];
  selectors.forEach(sel => {
    const regex = new RegExp(`(?<![\\w\\.\\#\\-])(${sel})(?=[\\s\\,\\{])`, 'g');
    scoped = scoped.replace(regex, `${containerClass} $1`);
  });
  return scoped;
};

export default function MarkdownEditor() {
  // Main states
  const [markdown, setMarkdown] = useState<string>(MARKDOWN_TEMPLATES[0].content);
  const [activeTab, setActiveTab] = useState<'split' | 'editor' | 'preview' | 'html' | 'reverse'>('split');
  const [selectedTheme, setSelectedTheme] = useState<HtmlTheme>(HTML_THEMES[0]);
  const [includeStylesInExport, setIncludeStylesInExport] = useState<boolean>(true);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [clipboardFeedback, setClipboardFeedback] = useState<string>('');
  
  // Custom states for HTML reverse converter
  const [reverseHtml, setReverseHtml] = useState<string>('<h1>Dynamic Header</h1>\n<p>Paste your HTML code list here to convert it <strong>back</strong> into Markdown!</p>\n<ul>\n  <li>Standard item A</li>\n  <li>Standard item B</li>\n</ul>');
  const [reverseResult, setReverseResult] = useState<string>('');

  // Sidebar helpers state
  const [sidebarPanel, setSidebarPanel] = useState<'none' | 'templates' | 'cheatsheet' | 'outline'>('templates');
  const [toc, setToc] = useState<TableOfContentsItem[]>([]);
  const [gfmSupport, setGfmSupport] = useState<boolean>(true);
  const [shikiHighlights, setShikiHighlights] = useState<boolean>(true);

  // Stats calculation
  const [stats, setStats] = useState({ words: 0, chars: 0, readingTime: 0 });

  // Parsing markdown to HTML for preview
  const [compiledHtml, setCompiledHtml] = useState<string>('');

  // Custom dialog/confirmation states
  const [confirmState, setConfirmState] = useState<{
    show: boolean;
    title: string;
    message: string;
    actionLabel: string;
    onAction: () => void;
    isDangerous?: boolean;
  }>({
    show: false,
    title: '',
    message: '',
    actionLabel: '',
    onAction: () => {},
    isDangerous: false,
  });

  const [alertState, setAlertState] = useState<{
    show: boolean;
    title: string;
    message: string;
  }>({
    show: false,
    title: '',
    message: '',
  });

  const askConfirmation = (title: string, message: string, actionLabel: string, action: () => void, isDangerous = false) => {
    setConfirmState({
      show: true,
      title,
      message,
      actionLabel,
      onAction: action,
      isDangerous
    });
  };

  const showAlert = (title: string, message: string) => {
    setAlertState({
      show: true,
      title,
      message,
    });
  };

  // Auto compile and recalculate statistics
  useEffect(() => {
    try {
      // Setup marked options for neat parsed outputs with GFM customization
      const html = marked.parse(markdown, { gfm: gfmSupport }) as string;
      setCompiledHtml(html);

      // Recalculate statistics
      const charCount = markdown.length;
      const wordCount = markdown.trim() === '' ? 0 : markdown.trim().split(/\s+/).length;
      const minutes = Math.ceil(wordCount / 200); // Average 200 wpm
      setStats({ words: wordCount, chars: charCount, readingTime: minutes });

      // Generate Table of Contents/Outline
      const parsedToc: TableOfContentsItem[] = [];
      const lines = markdown.split('\n');
      lines.forEach((line, index) => {
        const match = line.match(/^(#{1,4})\s+(.+)$/);
        if (match) {
          const level = match[1].length;
          const text = match[2].trim();
          const id = `toc-${index}-${text.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
          parsedToc.push({ level, text, id });
        }
      });
      setToc(parsedToc);
    } catch (err) {
      console.error("Marked parsing error:", err);
    }
  }, [markdown, gfmSupport, shikiHighlights]);

  // Handle template insertion
  const applyTemplate = (template: MarkdownTemplate) => {
    askConfirmation(
      "Load Starter Blueprint",
      `Are you sure you want to load the "${template.name}" blueprint? This will replace your current markdown document workspace.`,
      "Load Blueprint",
      () => {
        setMarkdown(template.content);
      }
    );
  };

  // Helper to insert snippets at textarea selection cursor
  const insertMarkdownSnippet = (snippet: string) => {
    const activeTextarea = document.getElementById(
      activeTab === 'split' ? 'textarea-markdown-split' : 'textarea-markdown-sole'
    ) as HTMLTextAreaElement | null;

    if (activeTextarea) {
      const start = activeTextarea.selectionStart;
      const end = activeTextarea.selectionEnd;
      const text = activeTextarea.value;
      const before = text.substring(0, start);
      const after = text.substring(end, text.length);
      const newMarkdown = before + snippet + after;
      
      setMarkdown(newMarkdown);
      
      setTimeout(() => {
        activeTextarea.focus();
        activeTextarea.selectionStart = start + snippet.length;
        activeTextarea.selectionEnd = start + snippet.length;
      }, 50);
    } else {
      setMarkdown(prev => prev + (prev.endsWith('\n') || prev === '' ? '' : '\n') + snippet);
    }
  };

  // Copy to clipboard helper
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setClipboardFeedback(type);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
      setClipboardFeedback('');
    }, 2000);
  };

  // Convert HTML back to markdown
  const handleReverseConvert = () => {
    try {
      const result = convertHtmlToMarkdown(reverseHtml);
      setReverseResult(result);
    } catch (err) {
      console.error(err);
      showAlert("Conversion Alert", "Failed to parse visual HTML block cleanly. Please verify that your source HTML structure is well-formed.");
    }
  };

  // Generate downloadable self-contained HTML payload
  const triggerHtmlDownload = () => {
    let finalPayload = '';
    if (includeStylesInExport) {
      finalPayload = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exported Markdown Document</title>
  <style>
${selectedTheme.css}
  </style>
</head>
<body>
${compiledHtml}
</body>
</html>`;
    } else {
      finalPayload = compiledHtml;
    }

    const blob = new Blob([finalPayload], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `exported_document_${Date.now()}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Handle direct scroll or outline click highlight
  const navigateToHeading = (text: string) => {
    // We want to find a heading in the document that contains the exact or matching text.
    // Normalized text helper (e.g. ignoring emojis or wrapping spaces)
    const normalizeText = (t: string) => t.trim().toLowerCase().replace(/[\s\W]+/g, '');
    const cleanTargetText = normalizeText(text);

    // Let's search inside our active scrollable preview zones
    const viewContainer = document.getElementById('split-view') || document.getElementById('full-preview-view');
    if (!viewContainer) {
      // If we are in another tab (like Sole Editor), switch to Split view first
      setActiveTab('split');
      // Give React brief moments to render
      setTimeout(() => {
        const recheckContainer = document.getElementById('split-view');
        if (recheckContainer) {
          triggerScrollInElement(recheckContainer, cleanTargetText, normalizeText);
        }
      }, 150);
      return;
    }

    triggerScrollInElement(viewContainer, cleanTargetText, normalizeText);
  };

  const triggerScrollInElement = (container: HTMLElement, targetText: string, normalizeFn: (t: string) => string) => {
    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
    for (let i = 0; i < headings.length; i++) {
      const heading = headings[i] as HTMLElement;
      if (normalizeFn(heading.textContent || '') === targetText) {
        heading.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Dynamic highlight animation on target head
        const originalBg = heading.style.backgroundColor;
        const originalTransition = heading.style.transition;
        
        heading.style.backgroundColor = 'rgba(99, 102, 241, 0.25)';
        heading.style.transition = 'background-color 0.3s ease';
        
        setTimeout(() => {
          heading.style.backgroundColor = originalBg;
          heading.style.transition = originalTransition;
        }, 1500);
        break;
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden min-h-0" id="markdown-editor-workspace">
      {/* Workspace Inner Sub-toolbar */}
      <div className="h-12 border-b border-slate-800 bg-[#161F30] flex items-center justify-between px-6 shrink-0" id="workspace-sub-toolbar">
        <div className="flex items-center gap-2 select-none">
          <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-[10px] font-bold text-slate-350 uppercase tracking-widest font-mono">WORKSPACE LAYOUTS</span>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1.5 bg-slate-950/65 p-1 rounded-lg border border-slate-850 font-sans" id="tab-navigation">
          <button 
            id="tab-split"
            onClick={() => setActiveTab('split')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-[11px] font-bold cursor-pointer transition-all ${
              activeTab === 'split' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-450 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <Columns className="w-3 h-3 shrink-0" />
            <span className="hidden sm:inline">Split Workspace</span>
          </button>
          
          <button 
            id="tab-editor"
            onClick={() => setActiveTab('editor')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-[11px] font-bold cursor-pointer transition-all ${
              activeTab === 'editor' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-450 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <Edit className="w-3 h-3 shrink-0" />
            <span className="hidden sm:inline">Sole Editor</span>
          </button>

          <button 
            id="tab-preview"
            onClick={() => setActiveTab('preview')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-[11px] font-bold cursor-pointer transition-all ${
              activeTab === 'preview' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-450 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <Eye className="w-3 h-3 shrink-0" />
            <span className="hidden sm:inline">Live Preview</span>
          </button>

          <button 
            id="tab-html"
            onClick={() => setActiveTab('html')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-[11px] font-bold cursor-pointer transition-all ${
              activeTab === 'html' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-450 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <FileCode className="w-3 h-3 shrink-0" />
            <span>Compiled HTML</span>
          </button>

          <button 
            id="tab-reverse"
            onClick={() => setActiveTab('reverse')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-[11px] font-bold cursor-pointer transition-all ${
              activeTab === 'reverse' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-450 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <RotateCcw className="w-3 h-3 shrink-0" />
            <span>HTML → MD</span>
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden" id="workspace-layout">
        
        {/* LEFT COLUMN: Sidebar Controls styled from Design HTML */}
        {activeTab !== 'reverse' && sidebarPanel !== 'none' && (
          <aside className="w-64 border-r border-slate-800 bg-[#0F172A] flex flex-col shrink-0 overflow-y-auto" id="left-sidebar">
            
            {/* Sidebar headers tab selection */}
            <div className="flex border-b border-slate-800 bg-[#0F172A] sticky top-0 z-10" id="sidebar-tab-selectors">
              <button
                id="btn-sidebar-templates"
                onClick={() => setSidebarPanel('templates')}
                className={`flex-1 py-3.5 text-[10px] font-bold text-center uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                  sidebarPanel === 'templates' ? 'border-indigo-500 text-indigo-400 bg-slate-900/60' : 'border-transparent text-slate-500 hover:text-slate-350 hover:bg-slate-900/40'
                }`}
              >
                Templates
              </button>
              <button
                id="btn-sidebar-outline"
                onClick={() => setSidebarPanel('outline')}
                className={`flex-1 py-3.5 text-[10px] font-bold text-center uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                  sidebarPanel === 'outline' ? 'border-indigo-500 text-indigo-400 bg-slate-900/60' : 'border-transparent text-slate-500 hover:text-slate-350 hover:bg-slate-900/40'
                }`}
              >
                Outline ({toc.length})
              </button>
              <button
                id="btn-sidebar-cheatsheet"
                onClick={() => setSidebarPanel('cheatsheet')}
                className={`flex-1 py-3.5 text-[10px] font-bold text-center uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                  sidebarPanel === 'cheatsheet' ? 'border-indigo-500 text-indigo-400 bg-slate-900/60' : 'border-transparent text-slate-500 hover:text-slate-350 hover:bg-slate-900/40'
                }`}
              >
                Cheatsheet
              </button>
            </div>

            {/* Content panel */}
            <div className="p-5 flex-1 flex flex-col gap-6">
              {sidebarPanel === 'templates' && (
                <div className="space-y-4" id="panel-templates">
                  <div className="pt-2">
                    <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">Starter Blueprints</h3>
                    <div className="space-y-3">
                      {MARKDOWN_TEMPLATES.map((tmpl) => (
                        <button
                          key={tmpl.name}
                          onClick={() => applyTemplate(tmpl)}
                          className="w-full text-left p-3 rounded-lg border border-slate-800 bg-slate-800/40 hover:bg-slate-800/85 hover:border-slate-700 transition flex flex-col group cursor-pointer"
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className="text-xs font-bold text-slate-200 group-hover:text-indigo-400 transition">{tmpl.name}</span>
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-slate-900 text-slate-400 border border-slate-800">{tmpl.category}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 mt-1 leading-snug">{tmpl.description}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-800/80 mt-6 text-center">
                    <button 
                      onClick={() => {
                        askConfirmation(
                          "Reset Workspace Empty",
                          "Are you sure you want to clear the entire workspace? Any unsaved changes in Markdown will be permanently cleared.",
                          "Clear Markdown",
                          () => setMarkdown(""),
                          true
                        );
                      }}
                      className="inline-flex items-center space-x-1.5 text-xs text-rose-455 hover:text-rose-400 font-semibold cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset Workspace Empty</span>
                    </button>
                  </div>
                </div>
              )}

              {sidebarPanel === 'cheatsheet' && (
                <div className="space-y-4" id="panel-cheatsheet">
                  <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">Parser Options</h3>
                  <div className="space-y-2 mb-4 bg-slate-900/40 p-3 rounded-lg border border-slate-800">
                    <label className="flex items-center gap-3 cursor-pointer group select-none">
                      <input 
                        type="checkbox"
                        checked={gfmSupport}
                        onChange={(e) => setGfmSupport(e.target.checked)}
                        className="rounded border-slate-700 bg-slate-900 text-indigo-500 focus:ring-indigo-600 outline-none w-4 h-4 cursor-pointer"
                      />
                      <span className="text-xs text-slate-300">GFM Support</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-not-allowed group opacity-40 select-none">
                      <input 
                        type="checkbox"
                        disabled
                        checked={false}
                        className="rounded border-slate-700 bg-transparent text-slate-500 outline-none w-4 h-4"
                      />
                      <span className="text-xs text-slate-400">Sanitize HTML</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group select-none">
                      <input 
                        type="checkbox"
                        checked={shikiHighlights}
                        onChange={(e) => setShikiHighlights(e.target.checked)}
                        className="rounded border-slate-700 bg-slate-900 text-indigo-500 focus:ring-indigo-600 outline-none w-4 h-4 cursor-pointer"
                      />
                      <span className="text-xs text-slate-300">Shiki Highlights</span>
                    </label>
                  </div>

                  <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Syntax Guide</h3>
                  <p className="text-[10px] text-slate-500 italic pb-1">Click any syntax block below to instantly insert it into your active editor cursor:</p>
                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    <div 
                      onClick={() => insertMarkdownSnippet('# ')}
                      className="bg-slate-900/40 p-2.5 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900/80 rounded cursor-pointer group transition-all"
                      title="Click to insert '# ' (H1 Header)"
                    >
                      <div className="text-[10px] font-bold text-slate-450 group-hover:text-indigo-400 mb-0.5 flex justify-between items-center">
                        <span>Headers</span>
                        <span className="text-[9px] text-indigo-500/80 font-mono font-bold group-hover:opacity-100 opacity-0 transition">+ Insert</span>
                      </div>
                      <code className="text-[10px] text-indigo-300 font-mono"># Title</code>
                    </div>

                    <div 
                      onClick={() => insertMarkdownSnippet('**bold**')}
                      className="bg-slate-900/40 p-2.5 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900/80 rounded cursor-pointer group transition-all"
                      title="Click to insert '**bold**'"
                    >
                      <div className="text-[10px] font-bold text-slate-450 group-hover:text-indigo-400 mb-0.5 flex justify-between items-center">
                        <span>Emphasis</span>
                        <span className="text-[9px] text-indigo-500/80 font-mono font-bold group-hover:opacity-100 opacity-0 transition">+ Insert</span>
                      </div>
                      <code className="text-[10px] text-indigo-300 font-mono">**bold** or *italic*</code>
                    </div>

                    <div 
                      onClick={() => insertMarkdownSnippet('```javascript\nconsole.log("hello world");\n```')}
                      className="bg-slate-900/40 p-2.5 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900/80 rounded cursor-pointer group transition-all"
                      title="Click to insert code block"
                    >
                      <div className="text-[10px] font-bold text-slate-450 group-hover:text-indigo-400 mb-0.5 flex justify-between items-center">
                        <span>Codeblocks</span>
                        <span className="text-[9px] text-indigo-500/80 font-mono font-bold group-hover:opacity-100 opacity-0 transition">+ Insert</span>
                      </div>
                      <code className="text-[10px] text-indigo-300 font-mono">```javascript ... ```</code>
                    </div>

                    <div 
                      onClick={() => insertMarkdownSnippet('\n| Header 1 | Header 2 |\n|---|---|\n| Item A | Item B |\n')}
                      className="bg-slate-900/40 p-2.5 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900/80 rounded cursor-pointer group transition-all"
                      title="Click to insert standard Table structure"
                    >
                      <div className="text-[10px] font-bold text-slate-450 group-hover:text-indigo-400 mb-0.5 flex justify-between items-center">
                        <span>Web tables</span>
                        <span className="text-[9px] text-indigo-500/80 font-mono font-bold group-hover:opacity-100 opacity-0 transition">+ Insert</span>
                      </div>
                      <code className="text-[9.5px] text-indigo-300 font-mono whitespace-pre sm:block leading-tight">{`| H1 | H2 |\n|---|---|`}</code>
                    </div>
                  </div>
                </div>
              )}

              {sidebarPanel === 'outline' && (
                <div className="space-y-3" id="panel-outline">
                  <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">Table of Contents</h3>
                  {toc.length === 0 ? (
                    <p className="text-slate-500 italic text-xs">No section headers found. Type standard headings (e.g. # Briefing) to construct outline list.</p>
                  ) : (
                    <div className="space-y-1.5 max-h-96 overflow-y-auto pr-1">
                      {toc.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => navigateToHeading(item.text)}
                          className="w-full text-left py-1.5 hover:text-indigo-400 hover:bg-slate-900/40 rounded px-2 transition-all truncate flex items-center cursor-pointer text-xs"
                          style={{ paddingLeft: `${(item.level - 1) * 8 + 8}px` }}
                        >
                          <ChevronRight className="w-3 h-3 text-slate-500 mr-1.5 shrink-0" />
                          <span className={`${item.level === 1 ? 'font-semibold text-slate-200' : 'text-slate-400'}`}>{item.text}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Sidebar Sponsor Ad Block */}
              <div className="mt-auto pt-3 border-t border-slate-800/60">
                <AdsenseBanner type="sidebar" />
              </div>

            </div>
          </aside>
        )}

        {/* WORKSPACE AREA */}
        <main className="flex-1 flex flex-col min-w-0" id="main-workspace-section">
          
          {/* TOP HELPER FILTER CONTROLS BAR */}
          {activeTab !== 'reverse' && (
            <div className="flex bg-[#1E293B] px-5 py-2.5 border-b border-slate-800 items-center justify-between text-xs shrink-0 sticky top-0 z-10" id="toolbar-container">
              <div className="flex items-center space-x-3">
                <button
                  id="btn-sidebar-toggle"
                  onClick={() => setSidebarPanel(sidebarPanel === 'none' ? 'templates' : 'none')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 font-semibold flex items-center space-x-1.5 cursor-pointer transition text-slate-200 border border-slate-700/80"
                >
                  <ListCollapse className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                  <span>{sidebarPanel === 'none' ? 'Show Workspace Controls' : 'Hide Workspace Controls'}</span>
                </button>

                {/* Live info badge */}
                <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700/60 uppercase tracking-wider">
                  Engine: V8 Sandbox Run
                </span>
              </div>

              {/* Theme customizer layout selector */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1.5">
                  <Settings className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-slate-400 font-medium font-sans">Render Theme:</span>
                </div>
                <select
                  id="select-theme"
                  value={selectedTheme.id}
                  onChange={(e) => {
                    const theme = HTML_THEMES.find(t => t.id === e.target.value);
                    if (theme) setSelectedTheme(theme);
                  }}
                  className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                >
                  {HTML_THEMES.map((theme) => (
                    <option key={theme.id} value={theme.id}>{theme.name}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* DYNAMIC DISPLAY PANELS WITH 'SLEEK' BORDERS & HEADINGS */}
          <div className="flex-1 flex overflow-hidden min-h-0 bg-[#0F172A]" id="pane-views-container">
            {/* Inject Scoped theme stylesheet dynamically */}
            <style dangerouslySetInnerHTML={{ __html: scopeCss(selectedTheme.css, '.markdown-body') }} />
            
            {/* VIEW TAB "SPLIT": Side-by-side editing */}
            {activeTab === 'split' && (
              <div className="flex-1 flex divide-x divide-slate-800 overflow-hidden" id="split-view">
                {/* Editor Panel Left */}
                <div className="w-1/2 flex flex-col h-full bg-[#1E293B] relative">
                  <div className="h-10 px-4 flex items-center bg-[#0F172A]/30 border-b border-slate-800/50 justify-between select-none">
                    <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest">EDITOR: content.md</span>
                    <span className="text-[10px] bg-slate-800/80 text-slate-400 border border-slate-700/80 px-2 py-0.5 rounded font-mono">MD</span>
                  </div>
                  <textarea
                    id="textarea-markdown-split"
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                    placeholder="Type or paste Markdown syntax here..."
                    className="flex-1 p-6 font-mono text-sm leading-relaxed text-slate-200 bg-[#1E293B] placeholder-slate-500 focus:outline-none resize-none align-baseline w-full overflow-y-auto selection:bg-indigo-900/60"
                  />
                </div>

                {/* Live Preview Panel Right */}
                <div className={`w-1/2 flex flex-col h-full ${selectedTheme.previewBg || 'bg-white'} border-l border-slate-800 transition-all duration-300`}>
                  <div className="h-10 px-4 flex items-center bg-slate-50 border-b border-slate-200 justify-between select-none shrink-0">
                    <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest">Preview: html_rendered</span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => copyToClipboard(compiledHtml, 'live-html')}
                        className="px-2 py-1 text-[10px] font-bold text-indigo-600 hover:text-indigo-500 hover:bg-slate-100 rounded border border-slate-200 flex items-center gap-1 transition cursor-pointer"
                        title="Copy Compiled HTML"
                      >
                        {isCopied && clipboardFeedback === 'live-html' ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-slate-400" />
                            <span>Copy HTML</span>
                          </>
                        )}
                      </button>
                      <div className="flex gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-8">
                    <div 
                      className={`markdown-body max-w-2xl mx-auto rounded-lg p-6 ${selectedTheme.previewText || 'text-slate-800'}`}
                      dangerouslySetInnerHTML={{ __html: compiledHtml }} 
                    />
                  </div>
                </div>
              </div>
            )}

            {/* VIEW TAB "EDITOR": Full Screen Text Area */}
            {activeTab === 'editor' && (
              <div className="flex-1 flex flex-col bg-[#1E293B] h-full" id="sole-editor-view">
                <div className="h-10 px-4 flex items-center bg-[#0F172A]/30 border-b border-slate-800/50 justify-between select-none">
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest">Focused Editor Terminal</span>
                  <span className="text-[10px] bg-indigo-950 text-indigo-300 border border-indigo-900 px-2 py-0.5 rounded font-mono">SOLE</span>
                </div>
                <textarea
                  id="textarea-markdown-sole"
                  value={markdown}
                  onChange={(e) => setMarkdown(e.target.value)}
                  placeholder="Type or paste Markdown here..."
                  className="flex-1 p-8 font-mono text-sm leading-relaxed text-slate-200 bg-[#1E293B] placeholder-slate-500 focus:outline-none resize-none select-text align-baseline w-full overflow-y-auto selection:bg-indigo-900/60"
                />
              </div>
            )}

            {/* VIEW TAB "PREVIEW": Large Scale visual HTML results */}
            {activeTab === 'preview' && (
              <div className={`flex-1 flex flex-col h-full ${selectedTheme.previewBg || 'bg-white'} overflow-y-auto p-12 transition-all duration-300`} id="full-preview-view">
                <div className="max-w-3xl mx-auto w-full">
                  <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between border-b border-slate-200 pb-4">
                    <span className="font-mono text-[10px] bg-slate-100 text-slate-600 border border-slate-250 px-3 py-1 rounded font-bold tracking-wider uppercase">
                      Rendered Presentation Theme: {selectedTheme.name}
                    </span>
                    <button
                      onClick={() => copyToClipboard(compiledHtml, 'full-html')}
                      className="px-3.5 py-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-500 hover:bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                      title="Copy Compiled HTML"
                    >
                      {isCopied && clipboardFeedback === 'full-html' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Copied Converted HTML!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>Copy Converted HTML</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div 
                    className={`markdown-body p-8 rounded-lg shadow-md border border-slate-100/10 animate-fade-in ${selectedTheme.previewText || 'text-slate-800'}`}
                    dangerouslySetInnerHTML={{ __html: compiledHtml }} 
                  />
                </div>
              </div>
            )}

            {/* VIEW TAB "HTML": Raw structured exports, code viewports */}
            {activeTab === 'html' && (
              <div className="flex-1 flex flex-col h-full bg-[#0F172A]" id="html-code-view">
                {/* Visual toolbar options */}
                <div className="bg-[#1E293B] border-b border-slate-800 px-6 py-4 flex flex-col sm:flex-row space-y-3 sm:space-y-0 justify-between items-start sm:items-center text-slate-300" id="export-controls-bar">
                  <div className="flex items-center space-x-6">
                    <label className="flex items-center space-x-2.5 text-xs text-slate-300 cursor-pointer font-sans select-none">
                      <input
                        id="checkbox-embed-styles"
                        type="checkbox"
                        checked={includeStylesInExport}
                        onChange={(e) => setIncludeStylesInExport(e.target.checked)}
                        className="rounded border-slate-700 bg-slate-900 text-indigo-500 focus:ring-indigo-600 outline-none w-4 h-4 cursor-pointer"
                      />
                      <span>Embed Custom Stylesheet (<strong className="text-indigo-400">{selectedTheme.name}</strong>)</span>
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      id="btn-copy-html"
                      onClick={() => {
                        const styleBlock = includeStylesInExport ? `<style>\n${selectedTheme.css}\n</style>\n\n` : '';
                        copyToClipboard(`${styleBlock}${compiledHtml}`, 'html');
                      }}
                      className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition-colors flex items-center space-x-1.5 cursor-pointer border border-slate-700"
                    >
                      {isCopied && clipboardFeedback === 'html' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied HTML!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-450" />
                          <span>Copy HTML Syntax</span>
                        </>
                      )}
                    </button>

                    <button
                      id="btn-download-html"
                      onClick={triggerHtmlDownload}
                      className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-505 text-white font-semibold text-xs transition duration-150 flex items-center space-x-1.5 cursor-pointer shadow-md"
                    >
                      <FileDown className="w-3.5 h-3.5" />
                      <span>Download HTML Page</span>
                    </button>
                  </div>
                </div>

                {/* HTML Output preview container */}
                <div className="flex-1 overflow-auto p-6 font-mono text-xs text-slate-300 leading-relaxed bg-[#0A101E] selection:bg-indigo-900/60 select-text">
                  <pre className="text-slate-300 whitespace-pre-wrap">
                    {includeStylesInExport ? (
                      <span className="text-emerald-550 select-none font-sans font-medium block mb-4">
                        {`<!-- ==============================================
* Exported Document via AstroMD Pro
* CSS Preset Stylesheet: ${selectedTheme.name}
=============================================== -->\n<style>\n`}
                        <span className="text-slate-500 font-mono text-[11px] block pl-4 max-h-40 overflow-y-auto mb-2 border-l border-slate-800">{selectedTheme.css}</span>
                        {`</style>\n\n`}
                      </span>
                    ) : null}
                    <code>{compiledHtml}</code>
                  </pre>
                </div>
              </div>
            )}

            {/* VIEW TAB "REVERSE": Interactive HTML back into markdown */}
            {activeTab === 'reverse' && (
              <div className="flex-1 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-800 overflow-hidden" id="reverse-converter-view">
                {/* HTML Input terminal */}
                <div className="w-full md:w-1/2 flex flex-col h-1/2 md:h-full bg-[#1E293B] relative">
                  <div className="h-10 px-4 flex items-center bg-[#0F172A]/30 border-b border-slate-800/50 justify-between select-none text-slate-400">
                    <span className="text-[11px] font-mono uppercase tracking-widest">HTML Input viewport</span>
                    <span className="text-[10px] bg-slate-800 text-slate-400 border border-slate-700 px-1.5 py-0.5 rounded font-mono font-bold">HTML FEED</span>
                  </div>
                  <textarea
                    id="textarea-html-reverse"
                    value={reverseHtml}
                    onChange={(e) => setReverseHtml(e.target.value)}
                    placeholder="Paste standard structured HTML fragments here..."
                    className="flex-1 p-6 font-mono text-sm leading-relaxed text-slate-200 bg-[#1E293B] placeholder-slate-500 focus:outline-none resize-none align-baseline w-full overflow-y-auto"
                  />
                  
                  {/* Action convert trigger */}
                  <div className="absolute bottom-4 right-4 z-10">
                    <button
                      id="btn-run-reverse-convert"
                      onClick={handleReverseConvert}
                      className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg shadow-lg hover:shadow-indigo-500/25 transition duration-150 flex items-center space-x-2 cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4 shrink-0" />
                      <span>Decompile to Markdown</span>
                    </button>
                  </div>
                </div>

                {/* Compiled Markdown Output block */}
                <div className="w-full md:w-1/2 flex flex-col h-1/2 md:h-full bg-[#0A0F1D]">
                  <div className="h-10 px-4 flex items-center bg-[#0F172A]/40 border-b border-slate-800/60 justify-between select-none text-slate-405">
                    <span className="text-[11px] font-mono uppercase tracking-widest">Decompiled output template</span>
                    <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-900 px-1.5 py-0.5 rounded font-mono">CONVERTED</span>
                  </div>
                  <div className="flex-1 flex flex-col p-6 relative">
                    <textarea
                      id="textarea-markdown-result"
                      readOnly
                      placeholder="Decompiled markdown code output..."
                      value={reverseResult}
                      className="flex-1 bg-transparent text-indigo-305 font-mono text-sm leading-relaxed outline-none border-b border-slate-850 resize-none overflow-y-auto mb-4"
                    />

                    {/* Copy result button */}
                    {reverseResult && (
                      <div className="absolute top-4 right-4 z-10 text-slate-300">
                        <button
                          id="btn-copy-reverse"
                          onClick={() => copyToClipboard(reverseResult, 'reverse')}
                          className="px-3.5 py-1.8 rounded bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition flex items-center space-x-1 border border-slate-700 cursor-pointer"
                        >
                          {isCopied && clipboardFeedback === 'reverse' ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Code</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    <div className="flex justify-between items-center text-[11px] text-slate-500">
                      <span>Click Decompile to transform standard HTML back into Markdown structure.</span>
                      {reverseResult && (
                        <button
                          id="btn-import-to-workspace"
                          onClick={() => {
                            askConfirmation(
                              "Import Decompiled Content",
                              "Are you sure you want to load this decompiled markdown document into your primary editor workspace? This will replace your current active draft.",
                              "Import Content",
                              () => {
                                setMarkdown(reverseResult);
                                setActiveTab('split');
                              }
                            );
                          }}
                          className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white font-bold flex items-center space-x-1 cursor-pointer transition shadow-md"
                        >
                          <span>Import to Editor Workstation</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Leaderboard Google AdSense Footer Segment */}
          <div className="px-6 py-2 border-t border-slate-800 bg-[#0B0F19]/40 select-none shrink-0">
            <AdsenseBanner type="footer" />
          </div>

          {/* Bottom Status Bar from Design HTML */}
          <footer className="h-8 border-t border-slate-800 bg-[#0F172A] px-4 flex items-center justify-between text-[10px] text-slate-500 shrink-0 select-none font-mono">
            <div className="flex gap-4">
              <span>CHARS: {stats.chars}</span>
              <span>WORDS: {stats.words}</span>
              <span>READ TIME: {stats.readingTime} min</span>
            </div>
            <div className="flex gap-4 items-center">
              <span className="text-emerald-500 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping mr-0.5"></span>
                RENDER TIME: 14ms
              </span>
              <span className="text-slate-400 select-all">UTF-8</span>
            </div>
          </footer>

        </main>
      </div>

      {/* CUSTOM DIALOG MODALS FOR NATIVE SANDBOX RESILIENCE */}
      {confirmState.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xs animate-fade-in animate-duration-150" id="custom-confirmation-modal">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full p-6 shadow-2xl relative">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${confirmState.isDangerous ? 'bg-rose-500 animate-pulse' : 'bg-indigo-500'}`}></span>
              {confirmState.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              {confirmState.message}
            </p>
            <div className="flex justify-end gap-3 text-xs">
              <button
                onClick={() => setConfirmState(prev => ({ ...prev, show: false }))}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-350 cursor-pointer font-semibold transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  confirmState.onAction();
                  setConfirmState(prev => ({ ...prev, show: false }));
                }}
                className={`px-4 py-2 rounded-lg text-white font-bold cursor-pointer transition ${
                  confirmState.isDangerous 
                    ? 'bg-rose-600 hover:bg-rose-500 shadow-md shadow-rose-900/10' 
                    : 'bg-indigo-600 hover:bg-indigo-550 shadow-md shadow-indigo-900/10'
                }`}
              >
                {confirmState.actionLabel}
              </button>
            </div>
          </div>
        </div>
      )}

      {alertState.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xs animate-fade-in animate-duration-150" id="custom-alert-modal">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full p-6 shadow-2xl relative">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              {alertState.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              {alertState.message}
            </p>
            <div className="flex justify-end text-xs">
              <button
                onClick={() => setAlertState(prev => ({ ...prev, show: false }))}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-550 text-white font-bold cursor-pointer transition"
              >
                Okay, Understood
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
