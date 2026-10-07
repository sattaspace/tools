<div align="center">
  <img src="./public/logo.svg" alt="SattaSpace Tools Logo" width="96" height="96" />
  <h1>SattaSpace Tools</h1>
  <p><strong>Elite Multi-Utility Developer Suite & Workspace Sandbox</strong></p>
  <p>
    A high-performance, privacy-first developer companion featuring real-time Markdown editing, visual LCS difference scanning, cryptographic encoders, synthetic relational database generators, vector SVG optimization, and an interactive Regular Expression visual sandbox.
  </p>
  <p>
    <a href="https://tools.sattaspace.com"><img src="https://img.shields.io/badge/Production-tools.sattaspace.com-6366f1?style=flat-square" alt="Production Site" /></a>
    <img src="https://img.shields.io/badge/Astro-v7.3.6-ff5d01?style=flat-square&logo=astro&logoColor=white" alt="Astro Version" />
    <img src="https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react&logoColor=black" alt="React 18" />
    <img src="https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" />
    <img src="https://img.shields.io/badge/Cloudflare_Workers-Supported-f38020?style=flat-square&logo=cloudflare&logoColor=white" alt="Cloudflare Workers" />
    <img src="https://img.shields.io/badge/License-MIT-emerald?style=flat-square" alt="License" />
  </p>
</div>

---

## Table of Contents

- [Overview](#overview)
- [Suite Features](#suite-features)
  - [1. Markdown Workspace & HTML Converter](#1-markdown-workspace--html-converter)
  - [2. Visual LCS Diff Checker](#2-visual-lcs-diff-checker)
  - [3. Cryptographic Helper & Security Suite](#3-cryptographic-helper--security-suite)
  - [4. Blueprint Relational Data Builder](#4-blueprint-relational-data-builder)
  - [5. Vector SVG Optimizer & Metadata Sanitizer](#5-vector-svg-optimizer--metadata-sanitizer)
  - [6. Regex Sandbox & Visual Debugger](#6-regex-sandbox--visual-debugger)
- [Technical Architecture](#technical-architecture)
- [Directory Structure](#directory-structure)
- [Environment Variables & Synchronization](#environment-variables--synchronization)
- [Google AdSense Integration](#google-adsense-integration)
- [SEO & Generative Engine Optimization (GEO)](#seo--generative-engine-optimization-geo)
- [Getting Started](#getting-started)
- [Build & Deployment](#build--deployment)
- [Privacy & Security](#privacy--security)
- [Author & License](#author--license)

---

## Overview

**SattaSpace Tools** (`https://tools.sattaspace.com`) is a full-featured web suite designed for software engineers, devops teams, and content developers who demand instant, reliable tools without third-party tracking, server latency, or data exposure.

All compute algorithms (parsing, diffing, crypto, data generation, regex testing) execute **100% client-side** in your web browser. Simultaneously, the application leverages **Astro SSR with Cloudflare Workers** to serve fully pre-rendered metadata, structured Schema.org JSON-LD, and search-indexed routes for each utility.

---

## Suite Features

### 1. Markdown Workspace & HTML Converter (`/markdown`)
- **Live Split-Pane Preview**: Instant GFM (GitHub-Flavored Markdown) compilation via `marked`.
- **Bidirectional Conversion**: Convert Markdown to styled HTML, and reverse-parse raw HTML back to clean Markdown.
- **Theme Presets**: Switch between styled editor aesthetics (Default Dark, Cyberpunk, High Contrast, Solarized, Nord, Dracula, Forest, Monochrome).
- **Production Starter Templates**: Preloaded templates for Technical Specs, API Reference, Changelog, and README.
- **Document Utilities**: Auto-generated Table of Contents, character/word counters, estimated reading time, and single-click HTML export.

### 2. Visual LCS Diff Checker (`/diff`)
- **Dynamic Programming LCS Algorithm**: Accurate line-level and character-level change detection.
- **Split & Unified Modes**: View changes side-by-side or in an inline unified stream.
- **Comparison Modifiers**: Toggle whitespace ignoring, case-sensitivity matching, and line trimming.
- **Change Metrics**: Live counters showing insertions (`+`), deletions (`-`), and modifications (`~`).
- **Input Presets**: Test configurations, code refactors, and text revisions with one click.

### 3. Cryptographic Helper & Security Suite (`/crypto`)
- **Web Crypto API Compute**: Fully sandboxed client-side cryptographic functions.
- **Hashing**: SHA-256, SHA-512, SHA-384, SHA-1, and MD5 hashes.
- **Encoding & Decoding**: Base64, Hexadecimal, and URL encoding/decoding.
- **HMAC Signatures**: Generate HMAC digests using secret keys with SHA algorithms.
- **JWT Inspector**: Decode JSON Web Tokens into formatted Header, Payload, and Signature components with expiration date checking.

### 4. Blueprint Relational Data Builder (`/blueprint`)
- **Visual Schema Modeler**: Define complex database schemas with 15+ rich data types (UUID, Auto-Increment, Full Name, Email, Phone, Company, Price, DateTime, Coordinates, Lorem Ipsum, Custom Enums, Relational Foreign Keys).
- **Multi-Format Export**: Generate high-density datasets in nested JSON or RFC-4180 compliant CSV.
- **Reproducible Data**: Deterministic pseudo-random seed generator ensures consistent test runs across CI environments.
- **Performance**: Capable of generating thousands of rows client-side in milliseconds with a live paginated preview table.

### 5. Vector SVG Optimizer & Metadata Sanitizer (`/svg`)
- **Editor Metadata Stripping**: Cleans proprietary bloat from Adobe Illustrator, Inkscape, Figma, and Sketch.
- **Sanitization**: Strips XML declarations, DOCTYPE tags, comments, empty groups (`<g></g>`), and unused `<defs>`.
- **Coordinate Minification**: Configurable numerical precision to reduce decimal bloat while preserving smooth paths.
- **viewBox Preservation**: Guarantees responsive scaling without clipping viewBox dimensions.
- **Live Visual Comparison**: Real-time side-by-side SVG rendering with byte savings and compression percentages.

### 6. Regex Sandbox & Visual Debugger (`/regex`)
- **Live Match Highlighting**: Instant visual feedback on matches and captured substrings.
- **Capture Groups**: Inspect numbered capture groups (`$1`, `$2`) and named groups (`(?<name>...)`).
- **Substitution Engine**: Live preview of replacement strings using tokens (`$&`, `$1`, `$<name>`).
- **Flag Controls**: Interactive toggles for Global (`g`), Insensitive (`i`), Multiline (`m`), DotAll (`s`), and Unicode (`u`).
- **Safety Indicator**: Catastrophic backtracking warning indicator to keep developers aware of hazardous expressions.

---

## Technical Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                       Astro 7 (SSR)                         │
│             Cloudflare Workers Edge Environment             │
└───────────────┬─────────────────────────────┬───────────────┘
                │                             │
    [Static Meta & SEO Head]      [Interactive React Islands]
    - OpenGraph & Twitter Cards   - ToolHub State Container
    - Schema.org JSON-LD          - 6 Sandboxed Tool Engines
    - Canonical & Hreflang Tags   - AdsenseBanner Ad Slots
    - LLM Crawlers Directives     - Zero-Reload pushState Nav
                │                             │
┌───────────────┴─────────────────────────────┴───────────────┐
│                    Tailwind CSS v4 & Lucide                 │
│               Responsive Dark-Theme Design System           │
└─────────────────────────────────────────────────────────────┘
```

- **Meta-Framework**: [Astro](https://astro.build/) v7 configured with `output: "server"`.
- **Edge Deployment**: `@astrojs/cloudflare` adapter with `nodejs_compat` runtime flag.
- **Islands Architecture**: React 18 islands loaded with `client:load` for instant interactivity.
- **Navigation Pattern**: Hybrid SSR/SPA — Direct URL hits serve full SSR HTML for complete SEO; internal tab clicks use `window.history.pushState` to switch views instantly without reloading the page.

---

## Directory Structure

```
.
├── .agentskills/                      # Agent memory, operational skills, and developer workflows
│   ├── MEMORY.md                      # Comprehensive project memory and architecture
│   └── skills/                        # Task-specific guides (build, add tool, adsense, seo)
├── public/                            # Static assets directly served
│   ├── favicon.svg                    # Application favicon
│   ├── logo.svg                       # Brand vector asset
│   ├── robots.txt                     # Crawler indexing rules (search engines + AI bots)
│   ├── llms.txt                       # Machine-readable manifest for AI search engines
│   └── llms-full.txt                  # Complete documentation dump for LLM ingest
├── src/
│   ├── components/                    # React UI components
│   │   ├── AdsenseBanner.tsx          # Google AdSense integration (sandbox & live modes)
│   │   ├── BlueprintGenerator.tsx     # Mock database & synthetic data builder
│   │   ├── CryptHelper.tsx            # Hashing, encoding, and JWT inspector
│   │   ├── DiffChecker.tsx            # Visual LCS text difference comparator
│   │   ├── MarkdownEditor.tsx         # Live dual-pane GFM editor & converter
│   │   ├── RegexSandbox.tsx           # Regular expression debugger & sandbox
│   │   ├── SvgSandbox.tsx             # Vector SVG optimizer & cleaner
│   │   ├── ToolHub.tsx                # Master workspace navigation & layout shell
│   │   └── ToolSeoContent.tsx         # In-depth SEO text, FAQ & guides for each tool
│   ├── data/                          # Seed datasets, presets, and sample configs
│   ├── lib/
│   │   └── seo.ts                     # Per-tool SEO specifications & Schema.org schemas
│   ├── pages/                         # Astro SSR route entrypoints
│   │   ├── index.astro                # Home overview & sitelinks searchbox schema
│   │   ├── markdown.astro             # Dedicated route for Markdown Workspace
│   │   ├── diff.astro                 # Dedicated route for Diff Checker
│   │   ├── crypto.astro               # Dedicated route for Crypt & Encoders
│   │   ├── blueprint.astro            # Dedicated route for Blueprint Generator
│   │   ├── svg.astro                  # Dedicated route for SVG Optimizer
│   │   └── regex.astro                # Dedicated route for Regex Sandbox
│   ├── utils/                         # Core algorithmic computation engines
│   ├── index.css                      # Tailwind CSS v4 styling sheet
│   ├── seo.ts                         # Global SEO & Google AdSense configuration
│   └── types.ts                       # Shared TypeScript definitions
├── astro.config.mjs                   # Astro configuration with Cloudflare adapter
├── package.json                       # Dependencies and project scripts
├── tsconfig.json                      # Strict TypeScript compiler options
├── worker-configuration.d.ts          # Auto-generated Cloudflare Worker environment types
└── wrangler.jsonc                     # Cloudflare Workers deployment config & env bindings
```

---

## Environment Variables & Synchronization

Environment variables are synchronized across local development (`.env`), documentation (`.env.example`), and Cloudflare Worker runtime bindings (`wrangler.jsonc`).

| Variable | Description | Default / Example |
|---|---|---|
| `SITE` | Canonical base URL | `https://tools.sattaspace.com` |
| `APP_URL` | Application host URL | `https://tools.sattaspace.com` |
| `PUBLIC_SITE_URL` | Client-accessible site URL | `https://tools.sattaspace.com` |
| `GOOGLE_ADSENSE_CLIENT` | Google AdSense Publisher ID | `ca-pub-1234567890123456` |
| `PUBLIC_ADSENSE_CLIENT` | Client-accessible AdSense Publisher ID | `ca-pub-1234567890123456` |
| `GOOGLE_ADSENSE_ENABLED` | Master switch for AdSense script tag | `false` |
| `PUBLIC_ADSENSE_ENABLED` | Client-accessible AdSense switch | `false` |
| `GOOGLE_ADSENSE_TEST_MODE` | Renders sandbox placeholders instead of ads | `true` |
| `PUBLIC_ADSENSE_TEST_MODE` | Client-accessible test mode toggle | `true` |
| `GOOGLE_ADSENSE_SLOT_SIDEBAR` | Ad slot ID for sidebar slot | `8472910531` |
| `GOOGLE_ADSENSE_SLOT_FOOTER` | Ad slot ID for footer leaderboard | `9312847502` |
| `GOOGLE_ADSENSE_SLOT_MIDCONTENT` | Ad slot ID for inline separator | `1057391823` |
| `GEMINI_API_KEY` | Optional Gemini AI Studio API key | `""` |

---

## Google AdSense Integration

The project includes a production-grade Google AdSense architecture built to satisfy Google publisher policies and Core Web Vitals guidelines:

1. **Zero Cumulative Layout Shift (CLS)**: Banners reserve vertical clearance with fixed `minHeight` bounds (`minHeight: 150px` for sidebar, `90px` for footer, `120px` for mid-content).
2. **Developer Sandbox Mode (`testMode: true`)**: While in test mode, clean styled placeholder cards are rendered. This allows testing layout behavior and responsive design without generating invalid impressions on Google's ad network.
3. **Live Ad Activation**:
   - Set `GOOGLE_ADSENSE_ENABLED="true"` and `GOOGLE_ADSENSE_TEST_MODE="false"`.
   - Provide your real Publisher ID in `GOOGLE_ADSENSE_CLIENT` (`ca-pub-XXXXXXXXXXXXXXXX`).
   - The official AdSense script is automatically injected in page `<head>` and initialized via `adsbygoogle.push({})`.

---

## SEO & Generative Engine Optimization (GEO)

SattaSpace Tools is optimized for both traditional search engines (Google, Bing) and AI search agents (Perplexity, ChatGPT, Claude):

- **Schema.org Rich Results**: Every route renders an exhaustive `SoftwareApplication` JSON-LD schema with pricing (`$0 USD`), category (`DeveloperApplication`), author metadata, and feature arrays.
- **Sitemap**: Generated automatically via `@astrojs/sitemap` at `/sitemap-index.xml` and `/sitemap-0.xml`.
- **AI Crawler Directives**: `public/robots.txt` explicitly allows `GPTBot`, `PerplexityBot`, `Claude-Web`, and `Google-Extended`.
- **LLM Manifests**: `public/llms.txt` and `public/llms-full.txt` provide concise machine-readable documentation for AI indexers.

---

## Getting Started

### Prerequisites
- **Node.js**: `v20.x` or later (tested on Node `v24.14.0`)
- **npm**: `v10.x` or later

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd "markdown-to-html-converter with-diferent-checker"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   ```bash
   cp .env.example .env
   ```

4. **Generate Cloudflare types**:
   ```bash
   npm run generate-types
   ```

5. **Start local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:4321` in your browser.

---

## Build & Deployment

### Verification Commands

- **Typecheck Codebase**:
  ```bash
  npm run lint
  # Runs: tsc --noEmit
  ```

- **Build for Production**:
  ```bash
  npm run build
  # Runs: wrangler types && astro check && astro build
  ```

- **Preview Cloudflare Edge Bundle**:
  ```bash
  npm run preview
  # Runs: astro preview (serves Cloudflare Worker bundle)
  ```

### Deploy to Cloudflare Workers

Deploy the project using Wrangler:
```bash
npx wrangler deploy
```

---

## Privacy & Security

- **Zero Remote Ingestion**: No text, code, hashes, regular expressions, or SVGs are ever uploaded to a remote server.
- **Local Web Crypto API**: Cryptographic digests, HMAC keys, and JWT signatures run exclusively on `window.crypto`.
- **No Analytics Fingerprinting**: No invasive third-party trackers or fingerprinting cookies.

---

## Author & License

- **Author**: Haradhan Sharma
- **Publisher**: SattaSpace Tools (`https://tools.sattaspace.com`)
- **License**: MIT