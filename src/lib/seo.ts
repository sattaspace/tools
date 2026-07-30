import type { SiteSeoConfig, AdsenseSlotConfig } from '../seo';

export interface ToolSeoConfig extends SiteSeoConfig {
  tool: 'markdown' | 'diff' | 'crypto' | 'blueprint' | 'svg' | 'regex';
  path: string;
  schema: Record<string, unknown>;
  ogImagePath: string;
  hreflang?: Record<string, string>;
}

const BASE_URL = 'https://tools.sattaspace.com';
const AUTHOR = 'Haradhan Sharma';
const SITE_NAME = 'SattaSpace Tools';

function createSoftwareApplicationSchema(params: {
  name: string;
  description: string;
  features: string[];
  screenshot: string;
  url: string;
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: params.name,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Cloud/Web',
    url: params.url,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    featureList: params.features,
    screenshot: params.screenshot,
    description: params.description,
    author: {
      '@type': 'Person',
      name: AUTHOR,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: BASE_URL,
    },
  };
}

export const TOOL_SEO_CONFIGS: Record<ToolSeoConfig['tool'], ToolSeoConfig> = {
  markdown: {
    tool: 'markdown',
    path: '/markdown',
    title: 'Advanced Markdown Editor & HTML Converter — SattaSpace Tools',
    shortTitle: 'Markdown Workspace',
    subtitle: 'Live GFM editor with split preview, HTML export, reverse conversion, themes & templates',
    description:
      'Professional GitHub-Flavored Markdown editor with live split preview, HTML export with custom themes, HTML-to-Markdown reverse conversion, table of contents, cheatsheet, and starter templates. 100% client-side, privacy-first.',
    keywords: [
      'markdown editor online',
      'markdown to html converter',
      'html to markdown',
      'github flavored markdown',
      'gfm live preview',
      'markdown workspace',
      'markdown compiler',
      'markdown templates',
      'markdown cheatsheet',
      'markdown outline generator',
      'markdown reading time',
      'markdown export html',
    ],
    canonicalUrl: `${BASE_URL}/markdown`,
    author: AUTHOR,
    language: 'en-US',
    ogType: 'website',
    ogImage: `${BASE_URL}/og-image/markdown`,
    twitterCard: 'summary_large_image',
    twitterCreator: '@astro_dev_hub',
    adsense: {
      enabled: false,
      client: 'ca-pub-1234567890123456',
      testMode: true,
      slots: {
        sidebar: {
          slotId: '8472910531',
          format: 'auto',
          responsive: true,
          style: { minHeight: '150px' },
          label: 'Premium Sidebar Display',
        },
        footer: {
          slotId: '9312847502',
          format: 'horizontal',
          responsive: true,
          style: { minHeight: '90px' },
          label: 'Leaderboard Workspace Footer',
        },
        midContent: {
          slotId: '1057391823',
          format: 'fluid',
          responsive: true,
          style: { minHeight: '120px' },
          label: 'In-Feed Inline Sponsor',
        },
      },
    },
    schema: createSoftwareApplicationSchema({
      name: 'SattaSpace Markdown Workspace',
      description:
        'Professional GitHub-Flavored Markdown editor with live split preview, HTML export with custom themes, HTML-to-Markdown reverse conversion, table of contents, cheatsheet, and starter templates.',
      features: [
        'Live GFM Preview',
        'Split / Editor / Preview / HTML Modes',
        'HTML Export with Custom Themes (8 presets)',
        'HTML to Markdown Reverse Conversion',
        'Table of Contents Generator',
        'Markdown Cheatsheet with One-Click Insert',
        'Starter Templates (README, Changelog, API Docs, Blog Post)',
        'Reading Time & Word/Char Statistics',
        'GFM Options: Tables, Strikethrough, Task Lists, Auto-links',
        'Syntax Highlighting via Shiki',
        'Privacy-First: 100% Client-Side Execution',
      ],
      screenshot: `${BASE_URL}/og-image/markdown`,
      url: `${BASE_URL}/markdown`,
    }),
    ogImagePath: '/og-image/markdown',
    hreflang: {
      'en-US': `${BASE_URL}/markdown`,
      'x-default': `${BASE_URL}/markdown`,
    },
  },

  diff: {
    tool: 'diff',
    path: '/diff',
    title: 'Visual Diff Checker & Code Comparison Tool — SattaSpace Tools',
    shortTitle: 'Diff Checker',
    subtitle: 'High-performance LCS-based visual diff with inline character-level highlighting',
    description:
      'Professional visual difference checker using Longest Common Subsequence algorithm. Compare code, configs, docs, or any text with line-level and inline character-level highlighting. Side-by-side unified view, syntax awareness, privacy-first client-side execution.',
    keywords: [
      'diff checker online',
      'code comparison tool',
      'text diff tool',
      'visual diff viewer',
      'lcs diff algorithm',
      'inline diff highlighter',
      'code review diff',
      'file comparison tool',
      'unified diff viewer',
      'character level diff',
      'merge conflict resolver',
      'git diff online',
    ],
    canonicalUrl: `${BASE_URL}/diff`,
    author: AUTHOR,
    language: 'en-US',
    ogType: 'website',
    ogImage: `${BASE_URL}/og-image/diff`,
    twitterCard: 'summary_large_image',
    twitterCreator: '@astro_dev_hub',
    adsense: {
      enabled: false,
      client: 'ca-pub-1234567890123456',
      testMode: true,
      slots: {
        sidebar: {
          slotId: '8472910531',
          format: 'auto',
          responsive: true,
          style: { minHeight: '150px' },
          label: 'Premium Sidebar Display',
        },
        footer: {
          slotId: '9312847502',
          format: 'horizontal',
          responsive: true,
          style: { minHeight: '90px' },
          label: 'Leaderboard Workspace Footer',
        },
        midContent: {
          slotId: '1057391823',
          format: 'fluid',
          responsive: true,
          style: { minHeight: '120px' },
          label: 'In-Feed Inline Sponsor',
        },
      },
    },
    schema: createSoftwareApplicationSchema({
      name: 'SattaSpace Diff Checker',
      description:
        'Professional visual difference checker using Longest Common Subsequence algorithm. Compare code, configs, docs with line-level and inline character-level highlighting.',
      features: [
        'Longest Common Subsequence (LCS) Algorithm',
        'Line-Level Diff: Added/Removed/Modified',
        'Inline Character-Level Highlighting',
        'Side-by-Side & Unified View Modes',
        'Syntax-Aware Comparison',
        'Large File Handling (100KB+ tested)',
        'Keyboard Navigation Between Changes',
        'Copy Diff Results as Markdown/HTML',
        'Privacy-First: 100% Client-Side',
        'No Server Upload — Zero Data Leaves Browser',
      ],
      screenshot: `${BASE_URL}/og-image/diff`,
      url: `${BASE_URL}/diff`,
    }),
    ogImagePath: '/og-image/diff',
    hreflang: {
      'en-US': `${BASE_URL}/diff`,
      'x-default': `${BASE_URL}/diff`,
    },
  },

  crypto: {
    tool: 'crypto',
    path: '/crypto',
    title: 'Cryptographic Hash Generator & Encoder/Decoder — SattaSpace Tools',
    shortTitle: 'Crypt & Encoders',
    subtitle: 'SHA-256/512, MD5, SHA-1, Base64, URL-Safe, ROT13/47 — all client-side',
    description:
      'Secure local cryptographic toolkit: generate SHA-256, SHA-512, MD5, SHA-1 hashes; encode/decode Base64, URL-Safe Base64; apply ROT13/ROT47 ciphers. Zero-server architecture — all operations run in your browser. Ideal for developers, CTF players, and security audits.',
    keywords: [
      'sha256 generator online',
      'sha512 hash generator',
      'md5 hash generator',
      'sha1 hash tool',
      'base64 encoder decoder',
      'url safe base64',
      'rot13 cipher tool',
      'rot47 encoder',
      'cryptographic hash calculator',
      'hash generator online',
      'password hashing tool',
      'checksum calculator',
      'encoding decoding tool',
    ],
    canonicalUrl: `${BASE_URL}/crypto`,
    author: AUTHOR,
    language: 'en-US',
    ogType: 'website',
    ogImage: `${BASE_URL}/og-image/crypto`,
    twitterCard: 'summary_large_image',
    twitterCreator: '@astro_dev_hub',
    adsense: {
      enabled: false,
      client: 'ca-pub-1234567890123456',
      testMode: true,
      slots: {
        sidebar: {
          slotId: '8472910531',
          format: 'auto',
          responsive: true,
          style: { minHeight: '150px' },
          label: 'Premium Sidebar Display',
        },
        footer: {
          slotId: '9312847502',
          format: 'horizontal',
          responsive: true,
          style: { minHeight: '90px' },
          label: 'Leaderboard Workspace Footer',
        },
        midContent: {
          slotId: '1057391823',
          format: 'fluid',
          responsive: true,
          style: { minHeight: '120px' },
          label: 'In-Feed Inline Sponsor',
        },
      },
    },
    schema: createSoftwareApplicationSchema({
      name: 'SattaSpace Crypt & Encoders',
      description:
        'Secure local cryptographic toolkit: SHA-256/512, MD5, SHA-1 hashes; Base64, URL-Safe Base64 encode/decode; ROT13/ROT47 ciphers. Zero-server, all in-browser.',
      features: [
        'SHA-256, SHA-512, MD5, SHA-1 Hash Generation',
        'Base64 Encode / Decode',
        'URL-Safe Base64 (RFC 4648 §5)',
        'ROT13 Cipher (Caesar +13)',
        'ROT47 Cipher (ASCII 33-126 rotation)',
        'HMAC Support (SHA-256/512)',
        'Batch/Multi-line Input Processing',
        'Copy-to-Clipboard One-Click',
        'Input/Output Character & Byte Counts',
        'Privacy-First: Zero Server Communication',
      ],
      screenshot: `${BASE_URL}/og-image/crypto`,
      url: `${BASE_URL}/crypto`,
    }),
    ogImagePath: '/og-image/crypto',
    hreflang: {
      'en-US': `${BASE_URL}/crypto`,
      'x-default': `${BASE_URL}/crypto`,
    },
  },

  blueprint: {
    tool: 'blueprint',
    path: '/blueprint',
    title: 'Mock Database Generator & Schema Blueprint Builder — SattaSpace Tools',
    shortTitle: 'Blueprint Builder',
    subtitle: 'Generate synthetic JSON/CSV datasets with custom schemas — UUIDs, names, emails, prices, timestamps',
    description:
      'Enterprise synthetic data generator for database benchmarking, UI prototyping, and API testing. Define relational schemas with custom field types (UUID, auto-increment, names, emails, phones, prices, dates, coordinates). Export JSON or CSV. Millions of rows, client-side, instant.',
    keywords: [
      'mock data generator',
      'fake json generator',
      'csv data generator',
      'database seed data',
      'synthetic test data',
      'mock api response generator',
      'json placeholder alternative',
      'faker.js alternative',
      'test data factory',
      'database benchmarking data',
      'relational schema mock',
      'data generation tool',
    ],
    canonicalUrl: `${BASE_URL}/blueprint`,
    author: AUTHOR,
    language: 'en-US',
    ogType: 'website',
    ogImage: `${BASE_URL}/og-image/blueprint`,
    twitterCard: 'summary_large_image',
    twitterCreator: '@astro_dev_hub',
    adsense: {
      enabled: false,
      client: 'ca-pub-1234567890123456',
      testMode: true,
      slots: {
        sidebar: {
          slotId: '8472910531',
          format: 'auto',
          responsive: true,
          style: { minHeight: '150px' },
          label: 'Premium Sidebar Display',
        },
        footer: {
          slotId: '9312847502',
          format: 'horizontal',
          responsive: true,
          style: { minHeight: '90px' },
          label: 'Leaderboard Workspace Footer',
        },
        midContent: {
          slotId: '1057391823',
          format: 'fluid',
          responsive: true,
          style: { minHeight: '120px' },
          label: 'In-Feed Inline Sponsor',
        },
      },
    },
    schema: createSoftwareApplicationSchema({
      name: 'SattaSpace Blueprint Generator',
      description:
        'Enterprise synthetic data generator for database benchmarking, UI prototyping, and API testing. Define relational schemas with custom field types. Export JSON or CSV. Millions of rows, client-side, instant.',
      features: [
        'Visual Schema Builder (Drag-and-Drop)',
        '15+ Field Types: UUID, Auto-Inc, Name, Email, Phone, Price, Date, Coordinates, Lorem, Enum, Boolean, etc.',
        'Relational References (Foreign Keys)',
        'Row Count: 1 to 1,000,000+',
        'JSON Export (Nested/Array)',
        'CSV Export (Headers, Quoting, Delimiters)',
        'Deterministic Seed for Reproducible Data',
        'Preview First N Rows Instantly',
        'Schema Save/Load (LocalStorage)',
        '100% Client-Side — No Data Leaves Browser',
      ],
      screenshot: `${BASE_URL}/og-image/blueprint`,
      url: `${BASE_URL}/blueprint`,
    }),
    ogImagePath: '/og-image/blueprint',
    hreflang: {
      'en-US': `${BASE_URL}/blueprint`,
      'x-default': `${BASE_URL}/blueprint`,
    },
  },

  svg: {
    tool: 'svg',
    path: '/svg',
    title: 'SVG Optimizer & XML Metadata Sanitizer — SattaSpace Tools',
    shortTitle: 'SVG Optimizer',
    subtitle: 'Remove Illustrator/Inkscape metadata, minify paths, reduce file size up to 80% — visual before/after',
    description:
      'Professional SVG optimizer: strips editor metadata (Adobe Illustrator, Inkscape, Figma namespaces), removes empty groups, unused defs, comments, doctype, minifies path decimals, preserves viewBox. Side-by-side visual comparison with byte savings. Essential for web performance and Core Web Vitals.',
    keywords: [
      'svg optimizer online',
      'svg minifier',
      'svg compressor',
      'remove svg metadata',
      'inkscape metadata remover',
      'illustrator svg cleanup',
      'svg file size reducer',
      'svg path minifier',
      'vector graphics optimization',
      'core web vitals svg',
      'svg sanitizer',
      'svg clean up tool',
    ],
    canonicalUrl: `${BASE_URL}/svg`,
    author: AUTHOR,
    language: 'en-US',
    ogType: 'website',
    ogImage: `${BASE_URL}/og-image/svg`,
    twitterCard: 'summary_large_image',
    twitterCreator: '@astro_dev_hub',
    adsense: {
      enabled: false,
      client: 'ca-pub-1234567890123456',
      testMode: true,
      slots: {
        sidebar: {
          slotId: '8472910531',
          format: 'auto',
          responsive: true,
          style: { minHeight: '150px' },
          label: 'Premium Sidebar Display',
        },
        footer: {
          slotId: '9312847502',
          format: 'horizontal',
          responsive: true,
          style: { minHeight: '90px' },
          label: 'Leaderboard Workspace Footer',
        },
        midContent: {
          slotId: '1057391823',
          format: 'fluid',
          responsive: true,
          style: { minHeight: '120px' },
          label: 'In-Feed Inline Sponsor',
        },
      },
    },
    schema: createSoftwareApplicationSchema({
      name: 'SattaSpace SVG Optimizer',
      description:
        'Professional SVG optimizer: strips editor metadata (Illustrator, Inkscape, Figma), removes empty groups, unused defs, comments, minifies paths, preserves viewBox. Side-by-side visual comparison with byte savings.',
      features: [
        'Metadata Stripping: Illustrator, Inkscape, Figma, Sketch Namespaces',
        'Remove: Comments, DOCTYPE, XML Declarations',
        'Collapse Empty Groups & Unused `<defs>`',
        'Minify Path Decimals (Configurable Precision)',
        'Preserve `viewBox` & Responsive Scaling',
        'Remove Redundant Attributes (x="0", y="0", etc.)',
        'Visual Before/After Comparison',
        'Byte Savings & Compression Ratio Display',
        'Download Optimized SVG',
        'Privacy-First: 100% Client-Side (SVGO-based)',
      ],
      screenshot: `${BASE_URL}/og-image/svg`,
      url: `${BASE_URL}/svg`,
    }),
    ogImagePath: '/og-image/svg',
    hreflang: {
      'en-US': `${BASE_URL}/svg`,
      'x-default': `${BASE_URL}/svg`,
    },
  },

  regex: {
    tool: 'regex',
    path: '/regex',
    title: 'Regex Sandbox & Visual Debugger — SattaSpace Tools',
    shortTitle: 'Regex Sandbox',
    subtitle: 'Test, debug, visualize regex with live matches, capture groups, substitution — JS/PCRE flavor',
    description:
      'Advanced regular expression sandbox: write patterns with real-time match highlighting, capture group inspection, substitution preview, flag toggles (g, i, m, s, u), regex explanation, catastrophic backtracking detection. Supports JavaScript/PCRE flavor. Privacy-first, fully client-side.',
    keywords: [
      'regex tester online',
      'regex debugger',
      'regular expression visualizer',
      'regex capture groups',
      'regex replace tool',
      'regex flags explained',
      'javascript regex tester',
      'pcre regex tester',
      'regex catastrophic backtracking',
      'regex substitution preview',
      'pattern matching tool',
      'regex cheatsheet',
    ],
    canonicalUrl: `${BASE_URL}/regex`,
    author: AUTHOR,
    language: 'en-US',
    ogType: 'website',
    ogImage: `${BASE_URL}/og-image/regex`,
    twitterCard: 'summary_large_image',
    twitterCreator: '@astro_dev_hub',
    adsense: {
      enabled: false,
      client: 'ca-pub-1234567890123456',
      testMode: true,
      slots: {
        sidebar: {
          slotId: '8472910531',
          format: 'auto',
          responsive: true,
          style: { minHeight: '150px' },
          label: 'Premium Sidebar Display',
        },
        footer: {
          slotId: '9312847502',
          format: 'horizontal',
          responsive: true,
          style: { minHeight: '90px' },
          label: 'Leaderboard Workspace Footer',
        },
        midContent: {
          slotId: '1057391823',
          format: 'fluid',
          responsive: true,
          style: { minHeight: '120px' },
          label: 'In-Feed Inline Sponsor',
        },
      },
    },
    schema: createSoftwareApplicationSchema({
      name: 'SattaSpace Regex Sandbox',
      description:
        'Advanced regular expression sandbox: real-time match highlighting, capture group inspection, substitution preview, flag toggles (g,i,m,s,u), regex explanation, catastrophic backtracking detection. JavaScript/PCRE flavor.',
      features: [
        'Real-Time Match Highlighting in Test String',
        'Capture Group Visualization ($1, $2, ...)',
        'Named Capture Group Support (?<name>)',
        'Substitution/Replace Preview ($&, $`, $1, $<name>)',
        'Flag Toggles: Global (g), Insensitive (i), Multiline (m), DotAll (s), Unicode (u)',
        'Regex Explanation / Token Breakdown',
        'Catastrophic Backtracking Warning',
        'Pattern Library / Snippets',
        'Copy Pattern, Test String, Replacement',
        'Privacy-First: Zero Server Execution',
      ],
      screenshot: `${BASE_URL}/og-image/regex`,
      url: `${BASE_URL}/regex`,
    }),
    ogImagePath: '/og-image/regex',
    hreflang: {
      'en-US': `${BASE_URL}/regex`,
      'x-default': `${BASE_URL}/regex`,
    },
  },
};

export function getToolSeoConfig(tool: ToolSeoConfig['tool']): ToolSeoConfig {
  return TOOL_SEO_CONFIGS[tool];
}

export function getAllToolPaths(): string[] {
  return Object.values(TOOL_SEO_CONFIGS).map((c) => c.path);
}

export function getAllToolSchemas(): Record<string, unknown>[] {
  return Object.values(TOOL_SEO_CONFIGS).map((c) => c.schema);
}