import React, { useState } from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  Lightbulb, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Sliders, 
  ShieldCheck, 
  Terminal, 
  Layers 
} from 'lucide-react';

interface ToolSeoContentProps {
  tool: 'markdown' | 'diff' | 'crypto' | 'blueprint' | 'svg' | 'regex';
}

export function ToolSeoContent({ tool }: ToolSeoContentProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // SEO Content Definitions
  const SEO_DATA = {
    markdown: {
      title: "Advanced GitHub Flavored Markdown (GFM) Live Compiler & HTML Decompiler Workspace",
      description: "An elite sandbox suite of local developer tools featuring an interactive live GFM Markdown editor and compiler, coupled with a high-fidelity real-time previewer. Includes a reverse HTML decompiler designed to translate raw HTML back into pristine, semantic Markdown syntax flawlessly.",
      guides: [
        {
          icon: <Terminal className="w-4 h-4 text-indigo-400" />,
          title: "What makes GFM unique?",
          text: "GitHub Flavored Markdown (GFM) builds upon standard Markdown by supporting tables, strike-through text, fenced code blocks with language syntax highlighting, auto-linking URLs, task lists, and precise custom line breaks. It represents the gold standard for drafting READMEs, technical documentation, and dev discussions."
        },
        {
          icon: <Sliders className="w-4 h-4 text-blue-400" />,
          title: "Bidirectional Workspace Efficiency",
          text: "Our workspace is not just a standard editor; it supports bi-directional workflow synchronization. Paste standard HTML schemas into our decompiler viewport to reverse-engineer standard layout structures like lists, tables, grids, and tags directly back into clean Markdown formatting instantly."
        },
        {
          icon: <Lightbulb className="w-4 h-4 text-emerald-400" />,
          title: "Markdown SEO Best Practices",
          text: "Using solid heading hierarchies (H1 to H6) and clean alt properties for images in Markdown helps crawlers index your technical documents. Keep your GFM clear, readable, and structured using clean semantic groupings."
        }
      ],
      faqs: [
        {
          q: "What is GitHub Flavored Markdown (GFM) and how does it differ from standard Markdown?",
          a: "GFM is a strict superset of CommonMark, initially introduced by GitHub to accommodate technical writing requirements. It introduces several crucial additions missing from original CommonMark specification, such as tables, auto-linked URLs, strike-through styles, custom checkboxes (task lists), and precise code syntaxes."
        },
        {
          q: "How does the HTML to Markdown Decompiler operate, and is it secure?",
          a: "The decompiler runs entirely locally, client-side, in your browser context. It parses the DOM structure of your raw HTML input, walks the node tree chronologically, and converts layout elements (like <strong>, <a>, <table>, <li>) back into their relative Markdown constructs (such as **, [link], table visual grids, and hyphens). No data is ever transmitted to remote databases."
        },
        {
          q: "Why should I use Markdown templates instead of standard Rich Text or HTML?",
          a: "Markdown isolates your core text semantics from styling rules. It is lightweight, compact, portable across developers, acts natively in version control systems like git, and compiles instantly into optimized HTML on the server, which dramatically boosts page load performance and Core Web Vitals."
        }
      ]
    },
    diff: {
      title: "High-Performance LCS Visual Difference Scanner & Inline Character Comparator",
      description: "A professional graphical code collision checker designed to contrast and highlight precise variations between adjacent text files. Computes line-by-line insertions, deletions, and character-by-character changes dynamically using efficient alignment algorithms.",
      guides: [
        {
          icon: <Layers className="w-4 h-4 text-indigo-400" />,
          title: "The Longest Common Subsequence (LCS) Engine",
          text: "Our diff scanner calculates line comparisons based on the Longest Common Subsequence logic. It computes the longest chain of identical tokens shared by two files, treating missing or newly introduced rows as unique insertions and deletions."
        },
        {
          icon: <Sliders className="w-4 h-4 text-blue-400" />,
          title: "Inline Character-Level Highlighting",
          text: "Where simple tools stop at line differences, our diff checker inspects individual modified lines on a character scale. It detects exact typings, spacing offsets, and punctuation corrections, highlighting them in bright high-contrast color arrays."
        },
        {
          icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
          title: "Code Merge Confidence & Sandbox Security",
          text: "Verify file configurations, env properties, CSS classes, or markdown drafts before merging. Because comparisons happen exclusively in-browser, your proprietary logic and secrets remain securely private inside local environment sandboxes."
        }
      ],
      faqs: [
        {
          q: "How does the LCS diff algorithm identify matching vs modified lines?",
          a: "The Longest Common Subsequence (LCS) algorithm finds the longest sequence of words or characters that appears in the same order in both inputs. Unmatched tokens are flagged: items only in the first file show as deletions (rose-red bounds), while items unique to the second file show as insertions (emerald-green bounds)."
        },
        {
          q: "What is the benefit of inline character-by-character analysis?",
          a: "Standard diff tools only mark whole lines as changed, forcing you to manually squint to find tiny changes in long text blocks. Inline analysis runs a secondary micro-LCS comparisons on specific matched lines, highlighting the exact coordinates (characters) that changed—saving development time."
        },
        {
          q: "Can I use this tool to compare database records, HTML schemas, or minified scripts?",
          a: "Yes, it is highly suitable for checking JSON database configurations, web schemas, CSV logs, or draft prose. It handles multi-line blocks effortlessly, maintaining fast render times on larger files."
        }
      ]
    },
    crypto: {
      title: "Advanced Local Cryptographic Encoder-Decoder & Hash Digest Matrix",
      description: "A secure, zero-dependency client-side developer workstation for generating secure cryptographic hashes (SHA-256, SHA-512, MD5, SHA-1) and encoding/decoding key tokens (Base64, URL-Safe variants, ROT13, and ROT47 ciphers) securely.",
      guides: [
        {
          icon: <ShieldCheck className="w-4 h-4 text-indigo-400" />,
          title: "Zero-Server Hashing & Privacy",
          text: "Unlike online utilities that pipe your raw credentials through backend API nodes, our cryptography toolkit executes directly inside your browser cache. Secure passwords, salts, and secret codes remain 100% private and protected from interception."
        },
        {
          icon: <Terminal className="w-4 h-4 text-blue-400" />,
          title: "Hashing vs Encoding Mechanics",
          text: "Hashing creates a deterministic, irreversible one-way message digest suited for verifying file integrity, certificates, and passwords. Encoding (like Base64) is a fully reversible translation designed to serialize binary data safely as simple text blocks."
        },
        {
          icon: <Sliders className="w-4 h-4 text-emerald-400" />,
          title: "Symmetric Ciphers (ROT13 & ROT47)",
          text: "Use Caesar-based symmetric ciphers (ROT13/ROT47) for quick code obfuscation, CTF puzzles, and basic string scrambling. It shifts alphabets or readable ASCII codes by positive rotations to mask contents instantly."
        }
      ],
      faqs: [
        {
          q: "What is the difference between a one-way Hash and an Encoder?",
          a: "A hash (e.g., SHA-256, MD5) is a one-way mathematical function. It compiles any arbitrary length input string into a fixed-length string of hexadecimal digits. You cannot recover the original text from the hash. An encoder (e.g., Base64) translates character data into an alternate format and is easily decodable back into the original input."
        },
        {
          q: "Is MD5 secure for password encryption in production?",
          a: "No. MD5 is highly vulnerable to collision attacks where two distinct strings yield the exact same hash signature. Modern security conventions mandate using SHA-256, bcrypt, or Argon2 algorithms coupled with unique salt structures for credential hashing."
        },
        {
          q: "What are URL-Safe Base64 character modifications?",
          a: "Standard Base64 contains character signs '+' and '/' which are treated as special tags in web URLs. URL-Safe Base64 substitutes '+' with '-' and '/' with '_', and strips trailing padding '=' to guarantee they transmit smoothly in API paths and URLs."
        }
      ]
    },
    blueprint: {
      title: "Enterprise Synthetic Database Blueprint Builder & Mock Schema Generator",
      description: "Generate millions of mock rows of dummy metadata for databases instantly. Visually configure relational table mock schemas, assign custom row volumes, select field structures (UUIDs, human names, phone numbers, fake emails, prices, timestamps), and export in structured JSON or CSV formats.",
      guides: [
        {
          icon: <Layers className="w-4 h-4 text-indigo-400" />,
          title: "Benchmarking Relational Speed",
          text: "Generate thousands of mock records with realistic structure types to run high-concurrency benchmarks on index structures, query aggregations, and layout rendering performance across databases like PostgreSQL, Spanner, or Firestore."
        },
        {
          icon: <Sliders className="w-4 h-4 text-blue-400" />,
          title: "Custom Field Mock Matrices",
          text: "Fully customize dummy datasets. Bind each collection to unique datatypes. We support custom IDs (nested indexes, auto-increments, timestamps), user names, email networks, financial prices, dates, and geographic locations."
        },
        {
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
          title: "Pristine Local Sandbox Execution",
          text: "Our blueprint architect creates structured, realistic mock datasets immediately within your client browser. There is no waiting for cloud API processing queues. You get immediate compilation speeds."
        }
      ],
      faqs: [
        {
          q: "When should I use structured synthetic mock data databases?",
          a: "Synthetic mock data is extremely valuable in early development stage checks, QA automation tests, offline UI mock testing, and performance benchmark trials. It allows front-end developers to work in parallel with back-end database builders by mocking table models."
        },
        {
          q: "What is the difference between exporting CSV vs JSON dummy databases?",
          a: "JSON database files are excellent for testing MongoDB, document stores, REST/GraphQL endpoints, and nested JavaScript structures. CSV exports are ideal for scanning relational schemas (PostgreSQL, SQL Server), testing spreadsheet sheets, and validating import scripts."
        },
        {
          q: "Can I generate deterministic data for mock databases?",
          a: "Yes, our mock builders use randomized logic vectors. It computes rows based on realistic structural constraints, ensuring valid patterns like email domains, sequential IDs, and proper currency limits are met."
        }
      ]
    },
    svg: {
      title: "Professional SVG Vector Optimizer & XML Metadata Sanitizer Reference",
      description: "Purge heavy Adobe Illustrator XML annotations, Inkscape metadata namespaces, unused container classes, path decimals, and empty attributes from raw SVG elements. Fast size reduction visual feedback side-by-side with code editing tools.",
      guides: [
        {
          icon: <Sliders className="w-4 h-4 text-indigo-400" />,
          title: "Why XML Metadata Bloats Vector Graphs",
          text: "Design suites like Figma, Illustrator, or Sketch embed extensive editor settings (like metadata, namespaces, custom IDs, and layout positions) directly into your SVG. These properties take up space but do not contribute to visual layout paths inside the browser."
        },
        {
          icon: <CheckCircle2 className="w-4 h-4 text-blue-400" />,
          title: "Improving Mobile Core Web Vitals",
          text: "Heavy vectors delay rendering times and increase page sizes on mobile devices. Optimizing SVGs strips away empty layout elements and redundant code tag layers, reducing scale limits up to 80% and boosting overall mobile page speed."
        },
        {
          icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
          title: "Inline Viewport Interactive Diagnostics",
          text: "Our workspace renders optimized results interactively in real time. Validate vector scales, checkerboard transparencies, custom dimensions, and inspect clean XML markup instantly side-by-side."
        }
      ],
      faqs: [
        {
          q: "What metadata parameters are stripped from optimized SVGs?",
          a: "Our optimizer strips away editor namespaces (such as inkscape: or sodipodi:), XML instructions, doctype declarations, author comments, group elements without attributes, empty <defs>, inline styling overrides, and unused attributes like 'x' or 'y' when set to default null parameters."
        },
        {
          q: "Why is preserving the SVG viewBox property recommended?",
          a: "The viewBox property establishes the responsive pixel grid coordinates of your canvas paths. Stripping 'viewBox' can cause vector images to break, lose scale flexibility, or fail to grow/shrink correctly inside responsive containers."
        },
        {
          q: "Does SVG optimization degrade visual render accuracy or scale resolution?",
          a: "No! SVG is a code-based XML representation of geometric vectors (lines, circles, bezier paths). Purging metadata annotations, empty groupings, and styling properties does not modify path coordinates, meaning your vector graphic scales cleanly with zero loss in resolution."
        }
      ]
    },
    regex: {
      title: "Visual Regular Expression Sandbox, Sandbox JS Compiler, and Pattern Debugger",
      description: "An advanced visual debugging environment for validating RegExp formulas against sample strings. Displays highlighted matches, captures subgroup indices, and tests replace/substitution logic instantaneously.",
      guides: [
        {
          icon: <Terminal className="w-4 h-4 text-indigo-400" />,
          title: "Dynamic Flag Matrix Controls",
          text: "Configure pattern compiler variables on the fly. Unlocking the global (g) flag scans full specimens instead of halting at first match. Applying case-insensitive (i) skips case boundaries. Multiline (m) changes caret anchors, and dotAll (s) allows dot segments to navigate line break barriers."
        },
        {
          icon: <Sliders className="w-4 h-4 text-blue-400" />,
          title: "Interactive Matching Subgroups Analysis",
          text: "Regex captures matched brackets (parentheses) as sub-variables. Our metadata analyzer scans and displays subgroups dynamically, enabling developers to map captured tokens like custom email usernames, domains, or date digits effortlessly."
        },
        {
          icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
          title: "Substitution Tokens Simulation",
          text: "Evaluate standard JavaScript replace tokens live. Using token '$&' represents the whole matched substring, and '$0' or '$1' parses selected capture groups. Securely see substituted outcomes before applying logic in your app's codebase."
        }
      ],
      faqs: [
        {
          q: "What do regular expression flags like g, i, m, s, and u mean?",
          a: "Flags are compiler directives that modify the matching logic of a regex pattern. 'g' (global) prevents standard processing from stopping after the first match. 'i' ignores lower/upper-case distinctions. 'm' (multiline) causes the start (^) and end ($) anchors to match individual lines of text. 's' (dotAll) allows the dot (.) character to match newlines. 'u' enables fully compliant unicode code points processing."
        },
        {
          q: "What is regex catastrophic backtracking and how do I prevent it?",
          a: "Catastrophic backtracking occurs when a pattern has nested quantifiers with overlaps (e.g., (a+)+), and is evaluated against a string that almost matches but fails near the end. The engine tries exponential paths to find a match, causing CPU freezes. You can prevent this by writing clear, non-overlapping tokens (e.g., preventing nested wildcards)."
        },
        {
          q: "How do capture groups work in regex substitution?",
          a: "Brackets in a regex pattern create capture subgroups. When running replacements, you reference these groups in order. For example, '$1' matches the first bracket group, '$2' matches the second. This lets you reorganize text cleanly (e.g., converting 'First Last' to 'Last, First' with logic '(\\w+) (\\w+)' and replacement '$2, $1')."
        }
      ]
    }
  };

  const currentData = SEO_DATA[tool];

  if (!currentData) return null;

  return (
    <section className="mt-12 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 md:p-8 text-slate-350 select-text" id={`seo-content-block-${tool}`}>
      
      {/* Header section with brand accent */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-indigo-600/10 rounded-xl text-indigo-400 border border-indigo-500/10 shrink-0">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-sm font-extrabold text-white uppercase tracking-wider font-sans leading-snug">
            {currentData.title}
          </h2>
          <p className="text-[10.5px] text-slate-500 font-mono mt-0.5 uppercase tracking-widest">
            Detailed Professional Developer Guide & Reference Insights
          </p>
        </div>
      </div>

      {/* Main introduction copy */}
      <p className="text-xs text-slate-400 leading-relaxed max-w-5xl mb-8">
        {currentData.description} This utility is fully sandboxed client-side, running directly in your web client context with high-fidelty optimization and complete standard compliance. Add competitive workflows, seed datasets, compress file weights, or debug pattern matches instantly with developer suite stability.
      </p>

      {/* Structured Guides Grid with competitive SEO texts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {currentData.guides.map((guide, idx) => (
          <div 
            key={idx} 
            className="bg-slate-950/45 p-5 rounded-xl border border-slate-805 hover:border-slate-750 transition-colors flex flex-col gap-3 group"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-slate-900 border border-slate-800 rounded-lg group-hover:scale-105 transition-transform shrink-0">
                {guide.icon}
              </div>
              <h3 className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors">
                {guide.title}
              </h3>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
              {guide.text}
            </p>
          </div>
        ))}
      </div>

      {/* Interactive FAQ Section with rich competitive answers */}
      <div className="border-t border-slate-800/70 pt-8" id="seo-frequently-asked-questions">
        <div className="flex items-center gap-2 mb-6 select-none">
          <HelpCircle className="w-4 h-4 text-emerald-400" />
          <h3 className="text-xs font-bold text-emerald-300 uppercase tracking-widest font-mono">
            Frequently Asked Questions & Diagnostics
          </h3>
        </div>

        <div className="space-y-3 max-w-5xl">
          {currentData.faqs.map((faq, idx) => {
            const isOpened = openFaq === idx;
            return (
              <div 
                key={idx} 
                className={`border rounded-xl transition duration-200 overflow-hidden ${
                  isOpened 
                    ? 'border-indigo-500/30 bg-[#161D30]/40' 
                    : 'border-slate-805 bg-slate-950/20 hover:bg-slate-950/50'
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left px-5 py-3.5 flex items-center justify-between gap-4 font-semibold text-slate-200 hover:text-white transition-colors select-none cursor-pointer"
                >
                  <span className="text-[11.5px] font-bold pr-2">{faq.q}</span>
                  <span className="text-slate-500 shrink-0">
                    {isOpened ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>
                
                {isOpened && (
                  <div className="px-5 pb-4 text-[11px] text-slate-400 leading-relaxed font-sans border-t border-slate-800/55 pt-3 select-text">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
