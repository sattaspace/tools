import type { HtmlTheme, MarkdownTemplate } from '../types';

export const HTML_THEMES: HtmlTheme[] = [
  {
    id: 'clean_modern',
    name: 'Clean Modern',
    description: 'Clean sans-serif typography, elegant slate greys, perfect for modern SaaS, documentation, and web content.',
    previewBg: 'bg-white',
    previewText: 'text-slate-800',
    css: `/* Clean Modern CSS Preset */
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  color: #1e293b;
  line-height: 1.625;
  max-width: 800px;
  margin: 40px auto;
  padding: 0 24px;
}
h1, h2, h3, h4 {
  color: #0f172a;
  font-weight: 700;
  margin-top: 1.75em;
  margin-bottom: 0.5em;
  line-height: 1.25;
}
h1 { font-size: 2.25rem; font-weight: 800; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.3em; margin-top: 0; }
h2 { font-size: 1.75rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.2em; }
h3 { font-size: 1.35rem; }
p { margin-top: 0; margin-bottom: 1.25em; }
a { color: #2563eb; text-decoration: none; border-bottom: 1px solid transparent; transition: border 0.15s; }
a:hover { border-bottom-color: #2563eb; }
blockquote {
  margin: 1.5em 0;
  padding: 0.5em 1.5em;
  color: #475569;
  border-left: 4px solid #cbd5e1;
  background: #f8fafc;
  border-radius: 0 4px 4px 0;
}
code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.875em;
  background: #f1f5f9;
  padding: 0.2em 0.4em;
  border-radius: 4px;
  color: #b91c1c;
}
pre {
  background: #1e293b;
  color: #f8fafc;
  padding: 1.25em;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1.5em 0;
}
pre code {
  background: transparent;
  padding: 0;
  color: inherit;
  font-size: 0.9em;
}
ul, ol { margin-top: 0; margin-bottom: 1.25em; padding-left: 1.75em; }
li { margin-top: 0.3em; margin-bottom: 0.3em; }
hr { height: 1px; border: 0; background: #e2e8f0; margin: 2.5em 0; }
table { width: 100%; border-collapse: collapse; margin: 1.75em 0; }
th, td { border: 1px solid #cbd5e1; padding: 0.75em 1em; text-align: left; }
th { background: #f8fafc; font-weight: 600; }
tr:nth-child(even) td { background: #fafafa; }
img { max-width: 100%; height: auto; border-radius: 6px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05); }`
  },
  {
    id: 'classic_editorial',
    name: 'Classic Editorial',
    description: 'Polished serif typography, refined lines, ideal for lengthy articles, newsletters, essays, and stories.',
    previewBg: 'bg-[#fafaf9]',
    previewText: 'text-stone-900',
    css: `/* Classic Editorial CSS Preset */
body {
  font-family: "Georgia", serif;
  color: #292524;
  line-height: 1.75;
  max-width: 760px;
  margin: 60px auto;
  padding: 0 28px;
}
h1, h2, h3, h4 {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: #1c1917;
  font-weight: 700;
  margin-top: 1.6em;
  margin-bottom: 0.5em;
  line-height: 1.2;
}
h1 { font-size: 2.5rem; font-weight: 800; border-bottom: 2px solid #78716c; padding-bottom: 0.4em; margin-top: 0; }
h2 { font-size: 1.85rem; border-bottom: 1px solid #e7e5e4; padding-bottom: 0.2em; }
h3 { font-size: 1.4rem; font-style: italic; font-weight: 500; }
p { margin-top: 0; margin-bottom: 1.4em; }
a { color: #b45309; text-decoration: underline; text-underline-offset: 3px; }
a:hover { color: #78350f; }
blockquote {
  margin: 2em 0;
  padding: 0.2em 0 0.2em 1.5em;
  color: #57534e;
  border-left: 3px solid #78716c;
  font-style: italic;
  font-size: 1.1em;
}
code {
  font-family: Menlo, Monaco, Consolas, monospace;
  font-size: 0.85em;
  background: #f5f5f4;
  padding: 0.15em 0.3em;
  border-radius: 2px;
  color: #9a3412;
}
pre {
  background: #292524;
  color: #f5f5f4;
  padding: 1.5em;
  border: 1px solid #d6d3d1;
  overflow-x: auto;
  margin: 2em 0;
  font-size: 0.85em;
}
pre code {
  background: transparent;
  padding: 0;
  color: inherit;
}
ul, ol { margin-top: 0; margin-bottom: 1.4em; padding-left: 2em; }
li { margin-top: 0.4em; margin-bottom: 0.4em; }
hr { height: 1px; border: 0; border-top: 1px dashed #78716c; margin: 3em 0; }
table { width: 100%; border-collapse: collapse; margin: 2em 0; }
th, td { border-bottom: 1px solid #d6d3d1; padding: 0.8em 1em; text-align: left; }
th { font-family: -apple-system, sans-serif; font-weight: 600; text-transform: uppercase; font-size: 0.8em; letter-spacing: 0.05em; }
img { max-width: 100%; height: auto; border: 1px solid #e7e5e4; padding: 6px; background: #fff; }`
  },
  {
    id: 'dark_slate',
    name: 'Dark Slate',
    description: 'Ultra-cool graphite dark palette, clean code tags, indigo/violet focus, designed for tech documentation.',
    previewBg: 'bg-[#0f172a]',
    previewText: 'text-slate-300',
    css: `/* Dark Slate CSS Preset */
body {
  font-family: system-ui, -apple-system, sans-serif;
  background-color: #0f172a;
  color: #cbd5e1;
  line-height: 1.65;
  max-width: 800px;
  margin: 40px auto;
  padding: 0 24px;
}
h1, h2, h3, h4 {
  color: #f8fafc;
  font-weight: 700;
  margin-top: 1.75em;
  margin-bottom: 0.5em;
}
h1 { font-size: 2.25rem; border-bottom: 1px solid #334155; padding-bottom: 0.3em; margin-top: 0; color: #f8fafc; }
h2 { font-size: 1.75rem; border-bottom: 1px solid #1e293b; padding-bottom: 0.2em; color: #f1f5f9; }
h3 { font-size: 1.35rem; color: #e2e8f0; }
p { margin-top: 0; margin-bottom: 1.25em; }
a { color: #60a5fa; text-decoration: none; border-bottom: 1px solid transparent; }
a:hover { border-bottom-color: #60a5fa; }
blockquote {
  margin: 1.5em 0;
  padding: 0.5em 1.5em;
  color: #94a3b8;
  border-left: 4px solid #6366f1;
  background: #1e293b;
}
code {
  font-family: ui-monospace, monospace;
  font-size: 0.9em;
  background: #1e293b;
  padding: 0.25em 0.4em;
  border-radius: 4px;
  color: #f472b6;
}
pre {
  background: #020617;
  color: #f1f5f9;
  padding: 1.25em;
  border-radius: 8px;
  overflow-x: auto;
  border: 1px solid #1e293b;
  margin: 1.5em 0;
}
pre code {
  background: transparent;
  padding: 0;
  color: inherit;
}
ul, ol { margin-top: 0; margin-bottom: 1.25em; padding-left: 1.75em; }
hr { height: 1px; border: 0; background: #334155; margin: 2.5em 0; }
table { width: 100%; border-collapse: collapse; margin: 1.75em 0; }
th, td { border: 1px solid #334155; padding: 0.75em 1em; text-align: left; }
th { background: #1e293b; color: #f8fafc; font-weight: 600; }
tr:nth-child(even) td { background: #0b0f19; }
img { max-width: 100%; height: auto; border: 1px solid #334155; border-radius: 6px; }`
  },
  {
    id: 'minimal_tech',
    name: 'Minimal Tech',
    description: 'High-contrast monospace highlights, layout grids, flat solid lines, brutalist-technical layout style.',
    previewBg: 'bg-white',
    previewText: 'text-neutral-900',
    css: `/* Minimal Tech CSS Preset */
body {
  font-family: "SF Mono", "Fira Code", Consolas, Menlo, monospace;
  color: #000000;
  line-height: 1.5;
  max-width: 800px;
  margin: 40px auto;
  padding: 0 24px;
}
h1, h2, h3, h4 {
  color: #000000;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  margin-top: 1.8em;
  margin-bottom: 0.6em;
}
h1 { font-size: 1.8rem; border: 2px solid #000000; padding: 0.5em; background: #f5f5f5; margin-top: 0; }
h2 { font-size: 1.4rem; border-bottom: 2px solid #000000; padding-bottom: 0.1em; }
h3 { font-size: 1.15rem; }
p { margin-top: 0; margin-bottom: 1.2em; }
a { color: #000000; text-decoration: underline; font-weight: 600; }
a:hover { background: #000000; color: #ffffff; }
blockquote {
  margin: 1.5em 0;
  padding: 0.8em 1.2em;
  color: #555555;
  border: 1px solid #000000;
  background: #fafaf9;
}
code {
  font-weight: 600;
  background: #e5e5e5;
  padding: 0.1em 0.3em;
  border-radius: 0;
}
pre {
  background: #000000;
  color: #00ff00;
  padding: 1.25em;
  border-radius: 0;
  overflow-x: auto;
  margin: 1.5em 0;
}
pre code {
  font-weight: 400;
  background: transparent;
  color: inherit;
}
ul { list-style-type: square; }
ul, ol { margin-top: 0; margin-bottom: 1.2em; padding-left: 1.5em; }
hr { height: 3px; background: #000000; border: 0; margin: 2.5em 0; }
table { width: 100%; border: 2px solid #000000; border-collapse: collapse; margin: 1.8em 0; }
th, td { border: 1px solid #000000; padding: 0.6em 0.8em; }
th { background: #e5e5e5; font-weight: 700; text-transform: uppercase; font-size: 0.9em; }
img { max-width: 100%; border: 2px solid #000000; }`
  },
  {
    id: 'warm_sand',
    name: 'Warm Sand',
    description: 'Elegant cream background, sepia accents, serif typography, soft paper aesthetic for creative writers.',
    previewBg: 'bg-[#fcfbf7]',
    previewText: 'text-[#3c342c]',
    css: `/* Warm Sand CSS Preset */
body {
  font-family: "Georgia", serif;
  background-color: #faf6ef;
  color: #3c342c;
  line-height: 1.72;
  max-width: 740px;
  margin: 50px auto;
  padding: 0 24px;
}
h1, h2, h3, h4 {
  font-family: "Trebuchet MS", sans-serif;
  color: #2b231c;
  font-weight: 700;
  margin-top: 1.6em;
  margin-bottom: 0.5em;
  letter-spacing: -0.01em;
}
h1 { font-size: 2.35rem; border-bottom: 2px solid #d4c5b3; padding-bottom: 0.3em; margin-top: 0; }
h2 { font-size: 1.75rem; border-bottom: 1px solid #ebdccb; padding-bottom: 0.2em; }
h3 { font-size: 1.3rem; color: #6e5f52; }
p { margin-top: 0; margin-bottom: 1.3em; }
a { color: #b25e14; text-decoration: none; border-bottom: 1px solid #b25e14; }
a:hover { border-bottom-width: 2px; }
blockquote {
  margin: 1.8em 0;
  padding: 0.4em 1.2em;
  color: #6e5f52;
  border-left: 4px solid #b25e14;
  background: #fdfbf7;
  border-radius: 2px;
}
code {
  font-family: Consolas, monospace;
  font-size: 0.88em;
  background: #ebdccb;
  padding: 0.15em 0.35em;
  border-radius: 3px;
  color: #6e2e0a;
}
pre {
  background: #2b231c;
  color: #fcfbf7;
  padding: 1.3em;
  border-radius: 6px;
  overflow-x: auto;
  margin: 1.8em 0;
  font-size: 0.88em;
}
pre code {
  background: transparent;
  padding: 0;
  color: inherit;
}
ul, ol { margin-top: 0; margin-bottom: 1.3em; padding-left: 2em; }
hr { height: 1px; border: 0; background: #d4c5b3; margin: 2.8em 0; }
table { width: 100%; border-collapse: collapse; margin: 1.8em 0; }
th, td { border: 1px solid #cbd5e1; border-color: #ebdccb; padding: 0.7em 0.9em; }
th { background: #eedfcb; font-weight: 600; color: #2b231c; }
tr:nth-child(even) td { background: #fdfbf7; }
img { max-width: 100%; border-radius: 4px; box-shadow: 0 4px 10px rgb(60 30 0 / 0.08); }`
  }
];

export const MARKDOWN_TEMPLATES: MarkdownTemplate[] = [
  {
    name: 'Full README Docs',
    category: 'Documentation',
    description: 'Standard multi-section README file layout for GitHub projects, including badges, features, and setup.',
    content: `# 🚀 AwesomeProject

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

A lightweight, blazing-fast, professional utility that makes it seamless to handle high-performance operations in modern web servers.

---

## ✨ Features

- ⚡ **Blazing Fast**: Optimized for speed & low overhead.
- Safe-by-default runtime checks.
- 📦 **Zero Config**: Works right out of the box with standard defaults.
- 🎨 **Theme-Ready**: Beautiful styles included natively.

---

## 🛠️ Installation

Simply copy paste this in a terminal or shell script context:

\`\`\`bash
npm install awesome-project-exporter
\`\`\`

---

## 💻 Quick Usage Diagram

Here is a short example showing how easy it is to set up a listener stream:

\`\`\`typescript
import { AwesomeProject } from 'awesome-project-exporter';

// Initialize with a port configuration
const instance = new AwesomeProject({
  port: 8080,
  enableTracing: true
});

instance.on('data', (payload) => {
  console.log('Received beautiful payload:', payload);
});

await instance.start();
\`\`\`

---

## 📊 Performance Statistics

| Database Engine | Read Operations (ops/s) | Write Operations (ops/s) |
| :--- | :---: | :---: |
| **AwesomeDB (V1)** | **125,000** | **94,000** |
| Legacy PostgreSQL | 42,000 | 18,000 |
| Standard Redis Cache | 110,000 | 85,000 |

---

> "This toolkit literally redefined our development loops. Replaced multiple brittle custom scripts with a single robust entrypoint."  
> — **Senior Engineering Lead, DevSync**
`
  },
  {
    name: 'Professional CV',
    category: 'Professional',
    description: 'An elegant personal resume structure covering Executive Summary, Experience, Skills, and Education.',
    content: `# Alex Morgan
**Full-Stack Software Architect**  
📍 San Francisco, CA | ✉️ alex.morgan@email.com | 🌐 github.com/alex-morgan

---

## 🎯 Executive Summary

Over **8+ years** of technical excellence in laying out and deploying scalable, robust cloud architectures. Proven specialist in driving architectural standards, API services design, and modern front-end application lifecycles.

---

## 🛠️ Core Capabilities & Skills

- **Backend**: NodeJS, TypeScript, Go Web Frameworks, GraphQL.
- **Frontend**: React, AstroJS, NextJS Server Actions, Tailwind CSS v4.
- **Data Engineering**: PostgreSQL, Redis Clusters, Firestore Realtime.
- **Cloud/Infra**: Cloud Run, AWS EKS, Terraform, CI/CD Actions.

---

## 💼 Professional Experience

### **Lead Systems Architect** | CloudPulse Technologies  
*Jan 2023 – Present*
- Engineered core microservices API routing, reducing overall query resolve latencies by **34%**.
- Managed a high-performing engineering group of **7 developers** to ship native cloud tooling.
- Configured real-time log ingestion processes using Google Cloud Pub/Sub and Spanner.

### **Senior Software Engineer** | WebSprint Studios  
*Sep 2020 – Dec 2022*
- Rewrote the main consumer dashboards in modular React, driving a **40% increase** in user session retentions.
- Integrated comprehensive mock and unit-testing runners, resulting in a **98.5% branch integration coverage**.

---

## 🎓 Education & Certifications

- **B.S. in Computer Science** | Stanford University (Graduated 2018)
- **Google Cloud Professional Cloud Architect** | License #941706
`
  },
  {
    name: 'Aesthetic Blog Post',
    category: 'Editorial',
    description: 'A stylish article layout featuring visual subtitles, a bold intro paragraph, quotes, tables, and summary.',
    content: `# The Quiet Revolution of CSS Variables

*Published May 27, 2026 • 5 min read • Written by **Sarah Chen***

We take dynamic runtimes for granted, but for decades, styling the web was a purely static affair. Today, the quiet revolution of native custom variables is altering how we formulate themes, animate components, and handle client layouts.

---

## Why Preprocessors Are No Longer Enough

In the old days, we relied on Sass and Less to declare dynamic colors. But preprocessors run at **build time**, whereas native variables live in the **browser**.

> "Native variables are fully reactive, responsive, and manipulable in real time. They aren't compiled away—they are interactive parts of the DOM architecture."

Let's look at the basic syntax differences:

### 1. Build-Time Static Sass
\`\`\`scss
$brand-color: #3b82f6;
.button {
  background-color: $brand-color;
}
\`\`\`

### 2. Run-Time Dynamic CSS Custom Property
\`\`\`css
:root {
  --brand-color: #3b82f6;
}
.button {
  background-color: var(--brand-color);
}
\`\`\`

---

## Responsive Custom Properties

By combining standard CSS Custom Properties with media queries, we can create incredibly clean fluid typographies without any complex math:

\`\`\`css
:root {
  --container-padding: 16px;
}

@media (min-width: 768px) {
  :root {
    --container-padding: 32px;
  }
}
\`\`\`

No need to re-override multiple page sections! Just redefine the single configuration variable, and let the browser recalculate immediately.

---

## Conclusion

The web has moved past compile-time rigidity. Moving our tokens into native runtime properties yields smaller, faster, and more versatile design systems. Why generate thousands of utility permutations when the browser can parse a handful of variables in microseconds?
`
  },
  {
    name: 'Weekly Meeting Notes',
    category: 'Productivity',
    description: 'A structural log of meeting agendas, attendee lists, key decisions, and designated action items.',
    content: `# 📝 Weekly Sync: Product & Engineering

**Date:** May 27, 2026 | **Focus:** Q2 Deliverables Check-in  
**Facilitator:** Daniel K. | **Scribe:** Emily R.

---

## 👥 Attendees

- [x] Daniel K. (Project Manager)
- [x] Emily R. (Technical Writer)
- [x] Marcus T. (Staff Engineer)
- [ ] Olivia S. (Designer - Out of Office)

---

## 📅 Agenda & Discussion Points

1. **V6 Performance Bottlenecks**: Marcus presented log visualizations highlighting server response spikes under load.
2. **Interactive UI Redesign Review**: Checked-in on the remaining screens for the onboarding workflow.
3. **Draft Documentation Completion**: Review of the API markdown files and setup templates.

---

## ⚖️ Key Decisions Made

- **Migration Path**: We will proceed with Node standalone container execution.
- **API deprecation deadline**: Rescheduled official deprecation from June 1st to **June 15th** to provide extra transition room.
- **Asset compression configuration**: Auto-compress all image assets during build workflows.

---

## 🚀 Designated Action Items

| Owner | Task Description | Deadline | Status |
| :--- | :--- | :---: | :---: |
| **Marcus T.** | Implement gzip compression middleware in server setups | June 2 | *In Progress* |
| **Emily R.** | Audit setup markdown files and create starter checklist templates | May 30 | *Pending* |
| **Daniel K.** | Distribute user feedback questionnaire summary to team slides | June 1 | *Not Started* |

---

## 📌 Next Meeting Agenda (Tentative)
- Dev cluster scale-out metrics review.
- Onboarding responsive design screens signoff.
`
  }
];
