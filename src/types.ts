export interface HtmlTheme {
  id: string;
  name: string;
  description: string;
  css: string;
  previewBg: string;
  previewText: string;
}

export interface MarkdownTemplate {
  name: string;
  category: string;
  description: string;
  content: string;
}

export interface TableOfContentsItem {
  text: string;
  level: number;
  id: string;
}
