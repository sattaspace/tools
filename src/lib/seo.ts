import type { SiteSeoConfig } from '../seo';

export interface ToolFaqItem {
  q: string;
  a: string;
}

export interface ToolSeoConfig extends SiteSeoConfig {
  tool: 'markdown' | 'diff' | 'crypto' | 'blueprint' | 'svg' | 'regex';
  path: string;
  schema: Record<string, unknown>;
  faqSchema: Record<string, unknown>;
  breadcrumbSchema: Record<string, unknown>;
  ogImagePath: string;
  hreflang?: Record<string, string>;
}

const BASE_URL = 'https://tools.sattaspace.com';
const AUTHOR = 'Haradhan Sharma';
const SITE_NAME = 'SattaSpace Tools';

export function createSoftwareApplicationSchema(params: {
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
      url: `${BASE_URL}/`,
    },
  };
}

export function createFaqSchema(faqs: ToolFaqItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}

export function createBreadcrumbSchema(toolName: string, toolUrl: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${BASE_URL}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: toolName,
        item: toolUrl,
      },
    ],
  };
}

export const TOOL_FAQS: Record<ToolSeoConfig['tool'], ToolFaqItem[]> = {
  markdown: [
    {
      q: 'What is GitHub Flavored Markdown (GFM) and how does it differ from standard Markdown?',
      a: 'GFM is a strict superset of CommonMark, initially introduced by GitHub to accommodate technical writing requirements. It introduces several crucial additions missing from original CommonMark specification, such as tables, auto-linked URLs, strike-through styles, custom checkboxes (task lists), and precise code syntaxes.',
    },
    {
      q: 'How does the HTML to Markdown Decompiler operate, and is it secure?',
      a: 'The decompiler runs entirely locally, client-side, in your browser context. It parses the DOM structure of your raw HTML input, walks the node tree chronologically, and converts layout elements (like <strong>, <a>, <table>, <li>) back into their relative Markdown constructs (such as **, [link], table visual grids, and hyphens). No data is ever transmitted to remote databases.',
    },
    {
      q: 'Why should I use Markdown templates instead of standard Rich Text or HTML?',
      a: 'Markdown isolates your core text semantics from styling rules. It is lightweight, compact, portable across developers, acts natively in version control systems like git, and compiles instantly into optimized HTML on the server, which dramatically boosts page load performance and Core Web Vitals.',
    },
  ],
  diff: [
    {
      q: 'How does the LCS diff algorithm identify matching vs modified lines?',
      a: 'The Longest Common Subsequence (LCS) algorithm calculates the longest shared chain of tokens occurring in sequential order within both input variants. Once identified, items absent in the subsequent file are classified as deletions (red), and items present exclusively in the modified target are cataloged as additions (green).',
    },
    {
      q: 'What is the benefit of inline character-by-character analysis?',
      a: 'Standard difference tools only evaluate lines as monolithic blocks, forcing developers to scan lengthy text strings manually. Inline sub-diffing executes micro-level alignment checks directly across paired rows, pinpointing character-by-character replacements.',
    },
    {
      q: 'Can I use this tool to compare database records, HTML schemas, or minified scripts?',
      a: 'Yes. Our engine supports configurable parsing options including whitespace omission and case sensitivity overrides, letting you debug minified code, JSON dumps, SQL queries, or CSS sheets with zero execution latency.',
    },
  ],
  crypto: [
    {
      q: 'What is the difference between a one-way Hash and an Encoder?',
      a: 'A cryptographic hash (such as SHA-256 or MD5) is an irreversible one-way mathematical function producing a fixed-size digest; you cannot revert the resulting hash into its original payload. Conversely, encoders (like Base64 or Hex) are bidirectional representations designed for data transport, easily reversible without cryptographic keys.',
    },
    {
      q: 'Is MD5 secure for password encryption in production?',
      a: 'No. MD5 is cryptographically broken and prone to collision attacks. It is retained strictly for legacy verification, checksum comparisons, and non-security hash tables. Use SHA-256, SHA-512, or bcrypt/argon2 for password hashing.',
    },
    {
      q: 'What are URL-Safe Base64 character modifications?',
      a: 'Standard Base64 uses characters `+` and `/`, which hold reserved meanings within web URLs and query strings. URL-safe Base64 substitutes `+` with `-` and `/` with `_`, optionally stripping trailing `=` padding.',
    },
  ],
  blueprint: [
    {
      q: 'When should I use structured synthetic mock data databases?',
      a: 'Synthetic data generation is essential for database stress testing, load benchmarking, frontend prototyping, and API testing without risking real user PII (Personally Identifiable Information) or violating GDPR regulations.',
    },
    {
      q: 'What is the difference between exporting CSV vs JSON dummy databases?',
      a: 'CSV is optimal for tabular ingestion, spreadsheet applications, data warehouse bulk copies, and SQL table seeding. JSON is suited for NoSQL document stores (MongoDB, Firestore), REST/GraphQL API mocking, and frontend component states.',
    },
    {
      q: 'Can I generate deterministic data for mock databases?',
      a: 'Yes. By assigning a deterministic random seed in the Blueprint builder, pseudo-random algorithms will consistently yield identical rows and values across subsequent runs, ensuring reproducible test suites.',
    },
  ],
  svg: [
    {
      q: 'What metadata parameters are stripped from optimized SVGs?',
      a: 'The optimizer strips editor namespaces (Adobe Illustrator, Inkscape, Sketch, Figma), XML headers, DOCTYPE declarations, HTML/XML comments, and empty `<g>` groupings, eliminating useless bytes while preserving geometry.',
    },
    {
      q: 'Why is preserving the SVG viewBox property recommended?',
      a: 'The `viewBox` attribute establishes internal coordinate bounds relative to the viewport. Preserving it ensures the SVG remains fully responsive and scales cleanly across different screen resolutions and CSS containers.',
    },
    {
      q: 'Does SVG optimization degrade visual render accuracy or scale resolution?',
      a: 'No. Unlike raster images (JPEG/PNG) which lose pixel fidelity during compression, SVGs are mathematical vector paths. Precision trimming rounds excessive decimal points without changing visual rendering.',
    },
  ],
  regex: [
    {
      q: 'What do regular expression flags like g, i, m, s, and u mean?',
      a: 'Flags alter pattern matching behavior: `g` (global: finds all matches rather than stopping at the first), `i` (case-insensitive matching), `m` (multiline: `^` and `$` match start/end of lines), `s` (dotAll: `.` matches newlines), and `u` (unicode: enables full Unicode code point support).',
    },
    {
      q: 'What is regex catastrophic backtracking and how do I prevent it?',
      a: 'Catastrophic backtracking occurs when nested quantifiers (like `(a+)+`) cause exponential time complexity when attempting to match non-matching strings, freezing the engine. Prevent it by making quantifiers mutually exclusive, using atomic groups, or setting execution boundaries.',
    },
    {
      q: 'How do capture groups work in regex substitution?',
      a: 'Parentheses in a pattern define capture groups. During replacement, reference these groups sequentially: `$1` references the first group, `$2` the second, or `$<name>` for named capture groups, enabling concise string reorganization.',
    },
  ],
};

export const TOOL_SEO_CONFIGS: Record<ToolSeoConfig['tool'], ToolSeoConfig> = {
  markdown: {
    tool: 'markdown',
    path: '/markdown/',
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
      'copy markdown text',
      'export styled html',
    ],
    canonicalUrl: `${BASE_URL}/markdown/`,
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
        'Live Split-Pane Preview (GFM)',
        'HTML to Markdown Reverse Decompiler',
        'Export HTML with Custom CSS Themes',
        'Starter Blueprints & Templates',
        'Auto-Generated Table of Contents',
        'Reading Time & Word Counters',
        'Copy HTML and Copy Plain Text',
        '100% Client-Side Privacy',
      ],
      screenshot: `${BASE_URL}/og-image/markdown`,
      url: `${BASE_URL}/markdown/`,
    }),
    faqSchema: createFaqSchema(TOOL_FAQS.markdown),
    breadcrumbSchema: createBreadcrumbSchema('Markdown Workspace', `${BASE_URL}/markdown/`),
    ogImagePath: '/og-image/markdown',
    hreflang: {
      'en-US': `${BASE_URL}/markdown/`,
      'x-default': `${BASE_URL}/markdown/`,
    },
  },

  diff: {
    tool: 'diff',
    path: '/diff/',
    title: 'Visual Diff Checker & Inline Character Comparator — SattaSpace Tools',
    shortTitle: 'Diff Checker',
    subtitle: 'Side-by-side & unified text comparison with LCS algorithm and character-level highlighting',
    description:
      'Professional visual difference checker: compare code, configs, documents with line-level and inline character-level highlighting. Longest Common Subsequence (LCS) algorithm, side-by-side and unified views, whitespace toggle, instant statistics.',
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
      'json diff online',
      'side by side diff',
    ],
    canonicalUrl: `${BASE_URL}/diff/`,
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
        'Professional visual difference checker: compare code, configs, documents with line-level and inline character-level highlighting using the LCS algorithm.',
      features: [
        'LCS (Longest Common Subsequence) Algorithm',
        'Side-by-Side & Unified View Modes',
        'Inline Character-Level Highlighting',
        'Whitespace & Case-Sensitivity Toggles',
        'Additions, Deletions, and Modification Counters',
        'Preloaded Samples (Code, JSON, Text)',
        'Zero-Latency Client-Side Comparison',
      ],
      screenshot: `${BASE_URL}/og-image/diff`,
      url: `${BASE_URL}/diff/`,
    }),
    faqSchema: createFaqSchema(TOOL_FAQS.diff),
    breadcrumbSchema: createBreadcrumbSchema('Visual Diff Checker', `${BASE_URL}/diff/`),
    ogImagePath: '/og-image/diff',
    hreflang: {
      'en-US': `${BASE_URL}/diff/`,
      'x-default': `${BASE_URL}/diff/`,
    },
  },

  crypto: {
    tool: 'crypto',
    path: '/crypto/',
    title: 'Cryptographic Helper & Encoders Suite — SattaSpace Tools',
    shortTitle: 'Crypt & Encoders',
    subtitle: 'SHA-256, SHA-512, MD5 hashes, Base64, Hex, URL-Safe encoders, HMAC signer, JWT inspector',
    description:
      'Comprehensive local cryptographic toolkit: generate SHA-256, SHA-512, SHA-384, SHA-1, MD5 hashes; encode/decode Base64, Hex, URL strings; generate HMAC signatures; decode and inspect JWT tokens. 100% in-browser Web Crypto API.',
    keywords: [
      'sha256 hash generator',
      'sha512 generator online',
      'md5 hash generator',
      'base64 encoder decoder',
      'jwt decoder online',
      'hmac sha256 generator',
      'hex encoder decoder',
      'url safe base64',
      'web crypto api tools',
      'cryptographic hashing online',
    ],
    canonicalUrl: `${BASE_URL}/crypto/`,
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
        'Local cryptographic toolkit: SHA-256, SHA-512, SHA-384, SHA-1, MD5 hashes; Base64/Hex/URL encoders; HMAC signer; JWT inspector. 100% in-browser.',
      features: [
        'Cryptographic Hashes: SHA-256, SHA-512, SHA-384, SHA-1, MD5',
        'Base64 & URL-Safe Base64 Encoders',
        'Hexadecimal Encoders & Decoders',
        'HMAC SHA-256 Signature Signer',
        'JWT Token Inspector & Expiry Checker',
        'Zero Network Requests (Web Crypto API)',
      ],
      screenshot: `${BASE_URL}/og-image/crypto`,
      url: `${BASE_URL}/crypto/`,
    }),
    faqSchema: createFaqSchema(TOOL_FAQS.crypto),
    breadcrumbSchema: createBreadcrumbSchema('Crypt & Encoders', `${BASE_URL}/crypto/`),
    ogImagePath: '/og-image/crypto',
    hreflang: {
      'en-US': `${BASE_URL}/crypto/`,
      'x-default': `${BASE_URL}/crypto/`,
    },
  },

  blueprint: {
    tool: 'blueprint',
    path: '/blueprint/',
    title: 'Mock Database Generator & Schema Blueprint Builder — SattaSpace Tools',
    shortTitle: 'Blueprint Generator',
    subtitle: 'Generate synthetic relational database datasets, JSON APIs, and CSV tables client-side',
    description:
      'Enterprise synthetic data generator for database benchmarking, UI prototyping, and API testing. Define relational schemas with 15+ custom field types. Export nested JSON or RFC-4180 CSV with deterministic seeds.',
    keywords: [
      'mock data generator',
      'fake json generator',
      'csv data generator',
      'database seed data',
      'synthetic test data',
      'mock api response generator',
      'json placeholder alternative',
      'faker alternative',
      'test data factory',
    ],
    canonicalUrl: `${BASE_URL}/blueprint/`,
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
        'Enterprise synthetic data generator for database benchmarking, UI prototyping, and API testing. Export JSON or CSV client-side.',
      features: [
        'Visual Schema Builder',
        '15+ Field Types (UUID, Auto-Inc, Name, Email, Price, Date, Coordinates)',
        'Relational References & Foreign Keys',
        'Nested JSON and RFC-4180 CSV Export',
        'Deterministic Seed for Reproducibility',
        'Instant Table Preview',
        '100% Client-Side Privacy',
      ],
      screenshot: `${BASE_URL}/og-image/blueprint`,
      url: `${BASE_URL}/blueprint/`,
    }),
    faqSchema: createFaqSchema(TOOL_FAQS.blueprint),
    breadcrumbSchema: createBreadcrumbSchema('Blueprint Generator', `${BASE_URL}/blueprint/`),
    ogImagePath: '/og-image/blueprint',
    hreflang: {
      'en-US': `${BASE_URL}/blueprint/`,
      'x-default': `${BASE_URL}/blueprint/`,
    },
  },

  svg: {
    tool: 'svg',
    path: '/svg/',
    title: 'SVG Optimizer & XML Metadata Sanitizer — SattaSpace Tools',
    shortTitle: 'SVG Optimizer',
    subtitle: 'Remove Illustrator/Inkscape metadata, minify paths, reduce file size — visual before/after',
    description:
      'Professional SVG optimizer: strips editor metadata (Adobe Illustrator, Inkscape, Figma namespaces), removes empty groups, unused defs, comments, minifies path decimals, preserves viewBox. Side-by-side visual comparison.',
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
    ],
    canonicalUrl: `${BASE_URL}/svg/`,
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
        'Professional SVG optimizer: strips editor metadata (Illustrator, Inkscape, Figma), removes empty groups, unused defs, comments, minifies paths, preserves viewBox.',
      features: [
        'Metadata Stripping: Illustrator, Inkscape, Figma, Sketch Namespaces',
        'Remove Comments, DOCTYPE, XML Declarations',
        'Collapse Empty Groups & Unused defs',
        'Minify Path Decimal Precision',
        'Preserve viewBox & Responsive Scaling',
        'Visual Before/After Comparison Canvas',
        'Byte Savings & Compression Metrics',
      ],
      screenshot: `${BASE_URL}/og-image/svg`,
      url: `${BASE_URL}/svg/`,
    }),
    faqSchema: createFaqSchema(TOOL_FAQS.svg),
    breadcrumbSchema: createBreadcrumbSchema('SVG Optimizer', `${BASE_URL}/svg/`),
    ogImagePath: '/og-image/svg',
    hreflang: {
      'en-US': `${BASE_URL}/svg/`,
      'x-default': `${BASE_URL}/svg/`,
    },
  },

  regex: {
    tool: 'regex',
    path: '/regex/',
    title: 'Regex Sandbox & Visual Debugger — SattaSpace Tools',
    shortTitle: 'Regex Sandbox',
    subtitle: 'Test, debug, visualize regex with live matches, capture groups, substitution — JS/PCRE flavor',
    description:
      'Advanced regular expression sandbox: write patterns with real-time match highlighting, capture group inspection, substitution preview, flag toggles (g, i, m, s, u), regex explanation, catastrophic backtracking detection.',
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
    ],
    canonicalUrl: `${BASE_URL}/regex/`,
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
        'Advanced regular expression sandbox: real-time match highlighting, capture group inspection, substitution preview, flag toggles (g,i,m,s,u), regex explanation.',
      features: [
        'Real-Time Match Highlighting',
        'Capture Group Visualization ($1, $2, named)',
        'Substitution/Replace Live Preview',
        'Flag Toggles: g, i, m, s, u',
        'Catastrophic Backtracking Warning',
        'Token Breakdown & Explanation',
        '100% Client-Side Privacy',
      ],
      screenshot: `${BASE_URL}/og-image/regex`,
      url: `${BASE_URL}/regex/`,
    }),
    faqSchema: createFaqSchema(TOOL_FAQS.regex),
    breadcrumbSchema: createBreadcrumbSchema('Regex Sandbox', `${BASE_URL}/regex/`),
    ogImagePath: '/og-image/regex',
    hreflang: {
      'en-US': `${BASE_URL}/regex/`,
      'x-default': `${BASE_URL}/regex/`,
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

export function getHomeSchemas(): Record<string, unknown>[] {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: `${BASE_URL}/`,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BASE_URL}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'SattaSpace Developer Utilities Suite',
    description: 'Comprehensive collection of client-side developer sandboxes and productivity tools.',
    itemListElement: Object.values(TOOL_SEO_CONFIGS).map((cfg, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: cfg.shortTitle,
      url: cfg.canonicalUrl,
      description: cfg.description,
    })),
  };

  const suiteFaqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What developer utilities are included in SattaSpace Tools?',
        a: 'SattaSpace Tools features six specialized sandboxes: Markdown Workspace & HTML Converter, Visual LCS Diff Checker, Cryptographic Encoders & Hasher, Blueprint Relational Mock Database Generator, Vector SVG Optimizer, and an interactive Regex Sandbox.',
      },
      {
        '@type': 'Question',
        name: 'Are my code, documents, or data uploaded to a server?',
        a: 'No. All operations, cryptographic computations, diffing, data generation, and regex evaluations run 100% locally client-side in your web browser. Zero telemetry or user data is ever transmitted.',
      },
      {
        '@type': 'Question',
        name: 'Is SattaSpace Tools free for commercial and personal use?',
        a: 'Yes. All tools in the SattaSpace Tools suite are completely free with zero usage limits or registration requirements.',
      },
    ].map((faq) => ({
      '@type': 'Question',
      name: faq.name,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return [websiteSchema, itemListSchema, suiteFaqSchema, ...getAllToolSchemas()];
}