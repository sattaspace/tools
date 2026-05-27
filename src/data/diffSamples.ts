export interface DiffSample {
  name: string;
  category: string;
  description: string;
  original: string;
  modified: string;
}

export const DIFF_SAMPLES: DiffSample[] = [
  {
    name: "JSON Configuration Audit",
    category: "Developer Configs",
    description: "Compare structure variations, updated ports, API environment URLs, and feature flags in a config document.",
    original: `{
  "name": "developer-utility-hub",
  "version": "1.4.2",
  "private": true,
  "engines": {
    "node": ">=18.0.0"
  },
  "config": {
    "port": 3000,
    "host": "localhost",
    "theme": "dark_slate",
    "features": {
      "ssr": true,
      "metrics": false,
      "cacheControl": "max-age=3600"
    },
    "allowedOrigins": [
      "https://dev.local",
      "https://staging.internal"
    ]
  }
}`,
    modified: `{
  "name": "developer-utility-hub-prod",
  "version": "1.5.0",
  "private": true,
  "engines": {
    "node": ">=20.0.0"
  },
  "config": {
    "port": 8080,
    "host": "0.0.0.0",
    "theme": "nebula_dark",
    "features": {
      "ssr": true,
      "metrics": true,
      "cacheControl": "max-age=86400"
    },
    "allowedOrigins": [
      "https://dev.local",
      "https://app.production.live",
      "https://admin.production.live"
    ]
  }
}`
  },
  {
    name: "TypeScript Factorial Refactor",
    category: "Source Code",
    description: "Compare safe recursive function vs optimized iterative loop computation with safety clamps.",
    original: `/**
 * Calculates the factorial of a given integer.
 * Recursive approach.
 */
function calculateFactorial(val: number): number {
  if (val < 0) {
    throw new Error("Negatives are unsupported.");
  }
  if (val === 0 || val === 1) {
    return 1;
  }
  return val * calculateFactorial(val - 1);
}

// Example invocation
const term = 7;
console.log(\`Factorial of \${term} is \${calculateFactorial(term)}\`);`,
    modified: `/**
 * Calculates the factorial of a given integer.
 * Highly optimized iterative loop with guard checks.
 */
export function calculateFactorial(val: number): number {
  if (val < 0) {
    throw new RangeError("Factorial inputs must be non-negative integers.");
  }
  if (val > 170) {
    // Avoid floating point infinity
    return Infinity;
  }
  
  let accumulator = 1;
  for (let idx = 2; idx <= val; idx++) {
    accumulator *= idx;
  }
  return accumulator;
}

// Optimized production call
const targetValue = 8;
try {
  const result = calculateFactorial(targetValue);
  console.log(\`Result: \${result}\`);
} catch (error) {
  console.error("Computation failure:", error);
}`
  },
  {
    name: "Marketing Copy Comparison",
    category: "Creative Phrasing",
    description: "Analyze editorial rewrites, wording refinements, sentence updates, and brand typography adjustments.",
    original: `Welcome aboard the initial release of DevHub Toolkit!
This software contains standard, helpful everyday tools that creators need.
Our tools include a responsive markdown renderer to preview web elements fast.
Simply copy your markdown blocks and convert it with one key press.
It features inline outline navigation and raw styling adaptations too.`,
    modified: `Welcome to the all-new, high-performance Developer Tool Hub!
This responsive workspace provides an elite collection of modular utilities for builders.
Our flagship suite features an advanced real-time Markdown Compiler & Decompiler.
Simply input your content blocks to preview and format with a single click.
It includes instant semantic outline navigation, custom rendering themes, and structural insights!`
  }
];
