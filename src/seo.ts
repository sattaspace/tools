// Site SEO & Google AdSense Configuration Sheet
// Easily customize your SEO parameters, keywords, tracking, and ad scripts here.

export interface AdsenseSlotConfig {
  slotId: string;
  format: "auto" | "fluid" | "rectangle" | "horizontal";
  responsive: boolean;
  style?: Record<string, string>;
  label?: string;
}

export interface SiteSeoConfig {
  // SEO Metadata
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  author: string;
  language: string;

  // OpenGraph / Social Share
  ogType: string;
  ogImage: string;
  twitterCard: "summary" | "summary_large_image" | "app";
  twitterCreator: string;

  // Google AdSense Integration Settings
  adsense: {
    enabled: boolean; // Set to true to inject the Google ad script tag
    client: string; // Your publisher ID, e.g. 'ca-pub-XXXXXXXXXXXXXXXX'
    testMode: boolean; // In testMode, safe fallback mock slots are shown to avoid layout shifts or empty borders
    slots: {
      sidebar: AdsenseSlotConfig;
      footer: AdsenseSlotConfig;
      midContent?: AdsenseSlotConfig;
    };
  };
}

export const SITE_SEO: SiteSeoConfig = {
  title: "Sattaspace Tools - Sleek Real-Time Markdown to HTML Converter",
  shortTitle: "Sattaspace Tools",
  subtitle: "Interactive Markdown Compiler, Outline Navigator, and Decompiler",
  description:
    "Create, compile, decompile, and format Markdown files with real-time feedback, structure visualizers, and customizable styles. Fully responsive, lightweight, and SEO optimized.",
  keywords: [
    "markdown editor",
    "markdown to html",
    "html to markdown decompiler",
    "marked text format",
    "gfm parser",
    "online markdown compiler",
    "developer blueprints",
    "shiki syntax highlighting",
  ],
  canonicalUrl: "https://tools.sattaspace.com",
  author: "Vibrant Developer Workspace",
  language: "en-US",

  ogType: "website",
  ogImage: "/logo.svg",
  twitterCard: "summary_large_image",
  twitterCreator: "@astro_dev_hub",

  // Google AdSense configurations
  // Populate the 'client' property with your AdSense ID and turn 'enabled' on to active real ads.
  adsense: {
    enabled: false, // Defaulting to false, ready for user's publisher key activation
    client: "ca-pub-1234567890123456", // REPLACE with genuine Google AdSense ID
    testMode: true, // While testMode is true, beautifully styled responsive sandbox placeholders are rendered
    slots: {
      sidebar: {
        slotId: "8472910531",
        format: "auto",
        responsive: true,
        style: { minHeight: "150px" },
        label: "Premium Sidebar Display",
      },
      footer: {
        slotId: "9312847502",
        format: "horizontal",
        responsive: true,
        style: { minHeight: "90px" },
        label: "Leaderboard Workspace Footer",
      },
      midContent: {
        slotId: "1057391823",
        format: "fluid",
        responsive: true,
        style: { minHeight: "120px" },
        label: "In-Feed Inline Sponsor",
      },
    },
  },
};
