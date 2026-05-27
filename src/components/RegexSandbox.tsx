import React, { useState, useEffect } from 'react';
import { 
  Braces, 
  Settings, 
  Trash2, 
  Copy, 
  Check, 
  Sparkles, 
  Eye, 
  RotateCcw, 
  Replace, 
  SearchCode, 
  HelpCircle,
  FileText,
  Sliders,
  CheckCircle2,
  Workflow
} from 'lucide-react';
import { AdsenseBanner } from './AdsenseBanner';
import { ToolSeoContent } from './ToolSeoContent';

interface MatchItem {
  text: string;
  index: number;
  groups: (string | undefined)[];
}

interface TextSegment {
  text: string;
  isMatch: boolean;
  matchIndex?: number;
}

const REGEX_PRESETS = [
  {
    name: 'Email Format Validation',
    pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}',
    flags: 'g',
    text: 'You can contact dev.support@devhub-pro.live or sales_team@corporate.io for assistance. Let us also test simple test@example.com.',
    replacePattern: 'mailto:$0'
  },
  {
    name: 'Formatted Dates (YYYY-MM-DD)',
    pattern: '\\d{4}-\\d{2}-\\d{2}',
    flags: 'g',
    text: 'Database records show creation date of 2026-05-27, deployment deadline set to 2026-06-15, and archival scheduled for 2027-12-31.',
    replacePattern: '[$&]'
  },
  {
    name: 'HTTP/HTTPS URLs Extractor',
    pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&\\/\\/=]*)',
    flags: 'g',
    text: 'Launch portals are available at https://devhub-pro.live and support channels are active at http://help.devhub-pro.live/tickets.',
    replacePattern: '<a href="$&">Link</a>'
  },
  {
    name: 'HTML Tag Pairs Extractor',
    pattern: '<([a-zA-Z0-9]+)[^>]*>(.*?)<\\/\\1>',
    flags: 'g',
    text: 'The body incorporates <h1>Main Title</h1> and standard <p>Paragraph contents elements</p> with some <span>Inline Badges</span>.',
    replacePattern: 'tag:$1($2)'
  },
  {
    name: 'Phone Number Formats',
    pattern: '\\+?\\d{1,4}?[-.\\s]?\\(?\\d{1,3}?\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}',
    flags: 'g',
    text: 'Reach us at +1 555-0199 or call the main hotline +65-6789-0123. International inquiries: +44 20 7946 0958.',
    replacePattern: 'TEL_REDACTED'
  },
  {
    name: 'Hex Color Codes',
    pattern: '#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})',
    flags: 'gi',
    text: 'Standard canvas uses #0F172A visual background, accented with #10B981 emerald, and #8b5cf6 for active highlight tags. #FFF works for light text.',
    replacePattern: 'rgb(HEX:$1)'
  }
];

export default function RegexSandbox() {
  // Input regex & target texts
  const [pattern, setPattern] = useState<string>('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}');
  const [sampleText, setSampleText] = useState<string>(
    'You can contact dev.support@devhub-pro.live or sales_team@corporate.io for assistance. Let us also test simple test@example.com.'
  );
  const [replacePattern, setReplacePattern] = useState<string>('mailto:$0');

  // Flag states
  const [flagGlobal, setFlagGlobal] = useState<boolean>(true);
  const [flagIgnoreCase, setFlagIgnoreCase] = useState<boolean>(false);
  const [flagMultiline, setFlagMultiline] = useState<boolean>(false);
  const [flagDotAll, setFlagDotAll] = useState<boolean>(false);
  const [flagUnicode, setFlagUnicode] = useState<boolean>(false);

  // Computed Outputs
  const [matches, setMatches] = useState<MatchItem[]>([]);
  const [replacedText, setReplacedText] = useState<string>('');
  const [segments, setSegments] = useState<TextSegment[]>([]);
  const [regexError, setRegexError] = useState<string>('');

  // UI Modes / Active tabs inside compiler output
  const [outputMode, setOutputMode] = useState<'highlight' | 'replace'>('highlight');

  // Clipboard notify animations
  const [copiedPattern, setCopiedPattern] = useState<boolean>(false);
  const [copiedReplace, setCopiedReplace] = useState<boolean>(false);
  const [copiedResult, setCopiedResult] = useState<boolean>(false);

  // Synchronous rebuild of flags string
  const getFlagsString = () => {
    let result = '';
    if (flagGlobal) result += 'g';
    if (flagIgnoreCase) result += 'i';
    if (flagMultiline) result += 'm';
    if (flagDotAll) result += 's';
    if (flagUnicode) result += 'u';
    return result;
  };

  // Run match calculations on dependency update
  useEffect(() => {
    setRegexError('');
    if (!pattern) {
      setMatches([]);
      setSegments([{ text: sampleText, isMatch: false }]);
      setReplacedText(sampleText);
      return;
    }

    try {
      const flagsStr = getFlagsString();
      const regexForEval = new RegExp(pattern, flagsStr);
      
      // Calculate list of matches safely preventing infinite loops
      const matchesList: MatchItem[] = [];
      const computedSegments: TextSegment[] = [];

      if (regexForEval.global) {
        let match;
        let lastIndex = -1;
        while ((match = regexForEval.exec(sampleText)) !== null) {
          if (regexForEval.lastIndex === lastIndex) {
            regexForEval.lastIndex++;
          }
          lastIndex = regexForEval.lastIndex;
          matchesList.push({
            text: match[0],
            index: match.index,
            groups: match.slice(1)
          });
        }
      } else {
        const match = regexForEval.exec(sampleText);
        if (match) {
          matchesList.push({
            text: match[0],
            index: match.index,
            groups: match.slice(1)
          });
        }
      }

      setMatches(matchesList);

      // Create highlight segments split securely
      const sortedMatches = [...matchesList].sort((a, b) => a.index - b.index);
      let cursor = 0;

      for (let i = 0; i < sortedMatches.length; i++) {
        const item = sortedMatches[i];
        if (item.index < cursor) {
          continue; // Guard overlap
        }
        if (item.index > cursor) {
          computedSegments.push({
            text: sampleText.slice(cursor, item.index),
            isMatch: false
          });
        }
        computedSegments.push({
          text: item.text,
          isMatch: true,
          matchIndex: i + 1
        });
        cursor = item.index + item.text.length;
      }

      if (cursor < sampleText.length) {
        computedSegments.push({
          text: sampleText.slice(cursor),
          isMatch: false
        });
      }

      setSegments(computedSegments);

      // Replaced string evaluate
      const replaced = sampleText.replace(regexForEval, replacePattern);
      setReplacedText(replaced);

    } catch (err) {
      setRegexError((err as Error).message || 'Invalid Regular Expression syntax.');
      // Keep displaying specimen without split marks on syntax flaws
      setSegments([{ text: sampleText, isMatch: false }]);
      setMatches([]);
      setReplacedText(sampleText);
    }
  }, [
    pattern, 
    sampleText, 
    replacePattern, 
    flagGlobal, 
    flagIgnoreCase, 
    flagMultiline, 
    flagDotAll, 
    flagUnicode
  ]);

  const loadPreset = (preset: typeof REGEX_PRESETS[0]) => {
    setPattern(preset.pattern);
    setSampleText(preset.text);
    setReplacePattern(preset.replacePattern);
    
    // Auto configure flags
    setFlagGlobal(preset.flags.includes('g'));
    setFlagIgnoreCase(preset.flags.includes('i'));
    setFlagMultiline(preset.flags.includes('m'));
    setFlagDotAll(preset.flags.includes('s'));
    setFlagUnicode(preset.flags.includes('u'));
    setRegexError('');
  };

  const handleCopy = (text: string, setFlag: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setFlag(true);
    setTimeout(() => setFlag(false), 2000);
  };

  const clearAllFields = () => {
    setPattern('');
    setSampleText('');
    setReplacePattern('');
    setMatches([]);
    setRegexError('');
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden min-h-0 bg-[#0F172A]" id="regex-workspace-main">
      
      {/* LOCAL NAV HEADER MENU */}
      <div className="bg-[#1E293B] border-b border-slate-800/80 px-6 py-3 shrink-0 flex flex-col md:flex-row gap-4 items-center justify-between" id="regex-header-menu">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-blue-600/10 rounded-lg text-blue-400 border border-blue-500/20">
            <SearchCode className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">Regular Expression Visual Sandbox</h2>
            <p className="text-[10px] text-slate-400 font-mono">Debug pattern diagnostics, capture matching groups, test string substitutions live</p>
          </div>
        </div>

        {/* Output Modes switcher */}
        <div className="flex bg-slate-950/60 p-1 rounded-xl border border-slate-805" id="regex-mode-selectors">
          <button
            onClick={() => setOutputMode('highlight')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-[11px] font-bold cursor-pointer transition ${
              outputMode === 'highlight' 
                ? 'bg-blue-600 text-white shadow' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>Interactive Match Highlight</span>
          </button>

          <button
            onClick={() => setOutputMode('replace')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-[11px] font-bold cursor-pointer transition ${
              outputMode === 'replace' 
                ? 'bg-blue-600 text-white shadow' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Replace className="w-3 h-3" />
            <span>Regex Substitution</span>
          </button>
        </div>
      </div>

      {/* DETAILED OPTIONS GRID & PRESETS ACCENT */}
      <div className="bg-slate-900 border-b border-slate-800/40 p-4 shrink-0 flex flex-wrap items-center justify-between gap-4" id="regex-config-sub-bar">
        
        {/* Toggle flag buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 text-slate-500 text-[10px] font-bold uppercase tracking-wider mr-2 select-none">
            <Sliders className="w-3 h-3 text-blue-400" />
            <span>COMPILER FLAGS:</span>
          </div>

          <button
            onClick={() => setFlagGlobal(!flagGlobal)}
            className={`px-2 py-1 rounded text-[10px] uppercase font-mono font-bold border transition cursor-pointer ${
              flagGlobal 
                ? 'bg-blue-600/10 border-blue-500/30 text-blue-300' 
                : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-400'
            }`}
            title="Global match (find all matches rather than stopping after first)"
          >
            Global (g)
          </button>

          <button
            onClick={() => setFlagIgnoreCase(!flagIgnoreCase)}
            className={`px-2 py-1 rounded text-[10px] uppercase font-mono font-bold border transition cursor-pointer ${
              flagIgnoreCase 
                ? 'bg-blue-600/10 border-blue-500/30 text-blue-300' 
                : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-400'
            }`}
            title="Ignore case (case-insensitive matching)"
          >
            IgnoreCase (i)
          </button>

          <button
            onClick={() => setFlagMultiline(!flagMultiline)}
            className={`px-2 py-1 rounded text-[10px] uppercase font-mono font-bold border transition cursor-pointer ${
              flagMultiline 
                ? 'bg-blue-600/10 border-blue-500/30 text-blue-300' 
                : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-400'
            }`}
            title="Multiline (treat beginning and end characters ^ and $ as matching each individual line)"
          >
            Multiline (m)
          </button>

          <button
            onClick={() => setFlagDotAll(!flagDotAll)}
            className={`px-2 py-1 rounded text-[10px] uppercase font-mono font-bold border transition cursor-pointer ${
              flagDotAll 
                ? 'bg-blue-600/10 border-blue-500/30 text-blue-300' 
                : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-400'
            }`}
            title="Single Line / DotAll (allow . to match newline characters)"
          >
            DotAll (s)
          </button>

          <button
            onClick={() => setFlagUnicode(!flagUnicode)}
            className={`px-2 py-1 rounded text-[10px] uppercase font-mono font-bold border transition cursor-pointer ${
              flagUnicode 
                ? 'bg-blue-600/10 border-blue-500/30 text-blue-300' 
                : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-400'
            }`}
            title="Unicode (treat pattern as a sequence of unicode code points)"
          >
            Unicode (u)
          </button>
        </div>

        {/* Predefined presets buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest select-none whitespace-nowrap">PRESETS:</span>
          {REGEX_PRESETS.map((preset, index) => (
            <button
              key={index}
              onClick={() => loadPreset(preset)}
              className="text-[10px] bg-slate-800 hover:bg-slate-750 border border-slate-750 px-2.5 py-0.5 rounded text-slate-350 hover:text-white transition cursor-pointer whitespace-nowrap"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* WORKSPACE CONTENT GRID */}
      <div className="flex-1 overflow-y-auto px-6 pb-6 min-h-0 select-text" id="regex-canvas">
        
        {/* Mid-Content Ad Slot Banner */}
        <div className="mb-4">
          <AdsenseBanner type="midContent" />
        </div>

        {regexError && (
          <div className="p-3.5 bg-rose-950/20 border border-rose-500/20 rounded-xl text-rose-300 font-mono text-[10.5px] mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse shrink-0"></span>
            <span className="font-bold">Regex Parser Error:</span>
            <span>{regexError}</span>
          </div>
        )}

        {/* Pattern & Replace Input Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4 select-none">
          
          {/* Pattern Regex Text Box */}
          <div className="lg:col-span-7 bg-[#1B253B] p-4 rounded-xl border border-slate-800 flex flex-col gap-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
              <div className="flex items-center gap-1.5">
                <Braces className="w-3.5 h-3.5 text-blue-400" />
                <span>REGULAR EXPRESSION PATTERN</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-slate-500">
                  /{pattern || '...'}/{getFlagsString()}
                </span>
                <button
                  onClick={() => handleCopy(pattern, setCopiedPattern)}
                  className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 transition"
                >
                  {copiedPattern ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedPattern ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-850 px-3 py-2 rounded-lg">
              <span className="text-slate-500 font-mono text-xs select-none">/</span>
              <input
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                className="flex-1 bg-transparent text-[11px] font-mono text-blue-300 focus:outline-hidden focus:ring-0 leading-relaxed placeholder-slate-600"
                placeholder="Enter regex syntax pattern or select a preset..."
                id="regex-pattern-input"
              />
              <span className="text-slate-500 font-mono text-xs select-none">/{getFlagsString()}</span>
            </div>
          </div>

          {/* Replacement String Input Box (if in replace mode) or Stats Quick overview */}
          <div className="lg:col-span-5 bg-[#1B253B] p-4 rounded-xl border border-slate-800 flex flex-col gap-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
              <div className="flex items-center gap-1.5">
                <Replace className="w-3.5 h-3.5 text-blue-400" />
                <span>SUBSTITUTION PATTERN ({outputMode === 'replace' ? 'ACTIVE' : 'READY_IN_REPLACE_TAB'})</span>
              </div>
              <button
                onClick={() => handleCopy(replacePattern, setCopiedReplace)}
                className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 transition"
              >
                {copiedReplace ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedReplace ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-850 px-3 py-2 rounded-lg">
              <input
                type="text"
                value={replacePattern}
                onChange={(e) => setReplacePattern(e.target.value)}
                className={`flex-1 bg-transparent text-[11px] font-mono focus:outline-hidden focus:ring-0 leading-relaxed placeholder-slate-600 ${
                  outputMode === 'replace' ? 'text-emerald-300' : 'text-slate-500'
                }`}
                placeholder="Substitution tokens e.g. [$0] or key:$1..."
                id="regex-replace-input"
              />
            </div>
          </div>

        </div>

        {/* Twin Main Panels: Sample source specimen vs Interactive analyzer result */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5" id="regex-workspace-cards-grid">
          
          {/* Left Block: Target Specimen Text input Area */}
          <div className="lg:col-span-7 flex flex-col gap-4 bg-[#1B253B] border border-slate-800 rounded-xl p-4.5 min-h-[350px]">
            <div className="flex items-center justify-between pb-2 border-b border-slate-805/80 select-none">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-widest">Target Sample Text</h3>
              </div>
              <span className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded">
                {sampleText.length} characters
              </span>
            </div>

            <textarea
              value={sampleText}
              onChange={(e) => setSampleText(e.target.value)}
              className="flex-1 bg-slate-950/80 text-[11px] font-mono text-slate-205 leading-relaxed p-3.5 rounded-lg border border-slate-850 focus:border-blue-500 focus:outline-hidden shadow-inner resize-y min-h-[220px]"
              placeholder="Paste raw target log records, HTML scripts, json tokens, csv details or blocks to examine here..."
              id="regex-corpus-input"
            />

            <div className="flex justify-between items-center select-none pt-1">
              <button
                onClick={clearAllFields}
                className="text-[10.5px] font-semibold text-rose-455 hover:text-rose-400 flex items-center gap-1.5 cursor-pointer bg-slate-950/50 border border-slate-850 py-1.5 px-3 rounded-lg transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset Compiler Fields</span>
              </button>

              <div className="text-[10px] text-slate-500 font-mono">
                Matching dynamically evaluates character matrices on every keystroke
              </div>
            </div>
          </div>

          {/* Right Block: Live Highlight/Replace Visual Renderer */}
          <div className="lg:col-span-5 flex flex-col bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl h-[390px] xl:h-[420px]">
            <div className="h-10 px-4.5 bg-[#111827] border-b border-slate-850 flex items-center justify-between shrink-0 select-none">
              <div className="flex items-center gap-2">
                <Workflow className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-[10px] font-bold text-slate-350 font-mono uppercase tracking-widest">
                  {outputMode === 'highlight' ? `MATCH TOKEN VISUALIZER` : `SUBSTITUTED STRING OUTCOME`}
                </span>
              </div>

              {outputMode === 'replace' && (
                <button
                  onClick={() => handleCopy(replacedText, setCopiedResult)}
                  className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1.5 font-mono transition"
                >
                  {copiedResult ? <Check className="w-3.5 h-3.5 text-emerald-400 font-bold" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy Result</span>
                </button>
              )}

              {outputMode === 'highlight' && (
                <span className="text-[10px] font-mono text-blue-400 bg-blue-950/50 border border-blue-550/20 px-2 py-0.5 rounded font-bold">
                  {matches.length} Match{matches.length !== 1 ? 'es' : ''} detected
                </span>
              )}
            </div>

            {/* Interactive display area */}
            <div className="flex-1 overflow-auto bg-[#070b14] p-4.5 font-mono text-[11px] leading-relaxed relative select-text scrollbar-thin scrollbar-thumb-slate-800">
              
              {outputMode === 'highlight' ? (
                <div className="whitespace-pre-wrap break-all text-slate-400" id="regex-highlight-view">
                  {segments.map((seg, idx) => {
                    if (seg.isMatch) {
                      return (
                        <span
                          key={idx}
                          className="bg-blue-600/35 border-b border-blue-450 text-blue-100 px-0.5 py-0.5 rounded-sm font-bold relative group hover:bg-blue-500/50 transition cursor-help"
                          title={`Match ${seg.matchIndex}\nValue: "${seg.text}"`}
                        >
                          {seg.text}
                          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block bg-slate-900 border border-slate-850 text-white text-[9px] font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap z-30">
                            Match #{seg.matchIndex}
                          </span>
                        </span>
                      );
                    } else {
                      return <span key={idx}>{seg.text}</span>;
                    }
                  })}

                  {segments.length === 0 || (segments.length === 1 && !segments[0].text) && (
                    <div className="h-full flex items-center justify-center text-slate-650 italic text-[10.5px]">
                      Enter target specimens and regular expression logic to preview highlights...
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-emerald-300 whitespace-pre-wrap break-all" id="regex-replaced-view">
                  {replacedText}
                </div>
              )}

            </div>

            {/* Bottom active group metadata analysis sheet (collapsible or miniature) */}
            {outputMode === 'highlight' && matches.length > 0 && (
              <div className="bg-[#111827] border-t border-slate-850 p-3 h-28 overflow-y-auto select-none font-mono text-[10px]" id="regex-groups-inspector">
                <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                  CAPTURED SUBGROUPS DETECTOR:
                </div>
                <div className="space-y-1.5">
                  {matches.slice(0, 15).map((match, mIdx) => (
                    <div key={mIdx} className="bg-slate-950/70 p-1.5 rounded border border-slate-900 flex flex-wrap gap-x-3 gap-y-1">
                      <span className="text-blue-400 font-bold">Match #{mIdx + 1}:</span>
                      <span className="text-slate-300">"{match.text}"</span>
                      {match.groups.length > 0 && (
                        <div className="flex gap-2 border-l border-slate-800 pl-3">
                          {match.groups.map((group, gIdx) => (
                            <span key={gIdx} className="text-slate-500">
                              g{gIdx + 1}: <span className="text-indigo-400">"{group !== undefined ? group : 'null'}"</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  {matches.length > 15 && (
                    <div className="text-slate-600 text-center text-[9px] pt-1 italic">
                      And {matches.length - 15} more matches parsed...
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* High-fidelity SEO optimization copy */}
        <div className="mt-8 select-text">
          <ToolSeoContent tool="regex" />
        </div>

        {/* Footer Ad Slot Banner */}
        <div className="mt-10">
          <AdsenseBanner type="footer" />
        </div>

      </div>

    </div>
  );
}
