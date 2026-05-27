/**
 * Highly polished client-side HTML-to-Markdown converter.
 * Leverage browser DOMParser to accurately traverse elements, preserving semantics
 * and translating standard rich HTML back into beautiful compiled markdown.
 */
export function convertHtmlToMarkdown(htmlString: string): string {
  if (!htmlString || typeof window === 'undefined') return '';

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const body = doc.body;

  // Track state for list item counting
  let listDepth = 0;

  function traverse(node: Node): string {
    if (node.nodeType === Node.TEXT_NODE) {
      // Clean up multiple sequential whitespace characters but preserve simple text flow
      return node.textContent || '';
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
      return '';
    }

    const element = node as HTMLElement;
    const tagName = element.tagName.toLowerCase();

    // Compile text contents of children first for most layouts
    const getChildrenContent = () => {
      let content = '';
      node.childNodes.forEach((child) => {
        content += traverse(child);
      });
      return content;
    };

    switch (tagName) {
      case 'h1':
        return `\n# ${getChildrenContent().trim()}\n\n`;
      case 'h2':
        return `\n## ${getChildrenContent().trim()}\n\n`;
      case 'h3':
        return `\n### ${getChildrenContent().trim()}\n\n`;
      case 'h4':
        return `\n#### ${getChildrenContent().trim()}\n\n`;
      case 'p': {
        const content = getChildrenContent().trim();
        return content ? `\n${content}\n\n` : '';
      }
      case 'strong':
      case 'b': {
        const content = getChildrenContent().trim();
        return content ? `**${content}**` : '';
      }
      case 'em':
      case 'i': {
        const content = getChildrenContent().trim();
        return content ? `*${content}*` : '';
      }
      case 'br':
        return '\n';
      case 'hr':
        return '\n\n---\n\n';
      case 'a': {
        const href = element.getAttribute('href') || '#';
        const content = getChildrenContent().trim() || href;
        return `[${content}](${href})`;
      }
      case 'img': {
        const src = element.getAttribute('src') || '';
        const alt = element.getAttribute('alt') || 'Image';
        return `![${alt}](${src})`;
      }
      case 'code': {
        // If nested directly in a pre tag, pre handles it as block representation
        const parentTagName = element.parentElement?.tagName.toLowerCase();
        if (parentTagName === 'pre') {
          return element.textContent || '';
        }
        return `\`${element.textContent}\``;
      }
      case 'pre': {
        const codeElement = element.querySelector('code');
        const codeText = codeElement ? codeElement.textContent : element.textContent;
        const codeLang = codeElement?.getAttribute('class')?.replace(/lang-|language-/, '') || '';
        return `\n\`\`\`${codeLang}\n${(codeText || '').trim()}\n\`\`\`\n\n`;
      }
      case 'blockquote': {
        const content = getChildrenContent().trim();
        const lines = content.split('\n').map((line) => `> ${line}`);
        return `\n${lines.join('\n')}\n\n`;
      }
      case 'ul': {
        listDepth++;
        let content = '';
        element.childNodes.forEach((child) => {
          if (child.nodeName.toLowerCase() === 'li') {
            const spaces = '  '.repeat(listDepth - 1);
            content += `${spaces}- ${traverse(child).trim()}\n`;
          } else {
            content += traverse(child);
          }
        });
        listDepth--;
        return `\n${content}\n`;
      }
      case 'ol': {
        listDepth++;
        let content = '';
        let index = 1;
        element.childNodes.forEach((child) => {
          if (child.nodeName.toLowerCase() === 'li') {
            const spaces = '  '.repeat(listDepth - 1);
            content += `${spaces}${index}. ${traverse(child).trim()}\n`;
            index++;
          } else {
            content += traverse(child);
          }
        });
        listDepth--;
        return `\n${content}\n`;
      }
      case 'li': {
        // List items compile their inner tree and should return simple string
        return getChildrenContent();
      }
      case 'table': {
        let markdownTable = '\n';
        const rows = Array.from(element.querySelectorAll('tr'));
        
        if (rows.length === 0) return '';

        // Process first row as header if it has th, or fabricate one
        const firstRow = rows[0];
        const headers = Array.from(firstRow.querySelectorAll('th, td')).map(cell => 
          (cell.textContent || '').trim().replace(/\n/g, ' ')
        );

        if (headers.length > 0) {
          markdownTable += `| ${headers.join(' | ')} |\n`;
          markdownTable += `| ${headers.map(() => '---').join(' | ')} |\n`;
        }

        // Process remaining rows
        const startIdx = firstRow.querySelector('th') ? 1 : 0;
        for (let i = startIdx; i < rows.length; i++) {
          const cells = Array.from(rows[i].querySelectorAll('td')).map(cell => 
            (cell.textContent || '').trim().replace(/\n/g, ' ')
          );
          if (cells.length > 0) {
            // Match cell count to header count if necessary
            const filledCells = [...cells];
            while (filledCells.length < headers.length) filledCells.push('');
            markdownTable += `| ${filledCells.slice(0, headers.length).join(' | ')} |\n`;
          }
        }
        
        return markdownTable + '\n';
      }
      default:
        // For wrapping tags (div, span, section, main, article, article, body), just process children
        return getChildrenContent();
    }
  }

  // Clean the raw string and strip script/style tags style tags first to avoid cluttering output
  const tempWrap = document.createElement('div');
  tempWrap.innerHTML = htmlString;
  const scriptTags = tempWrap.querySelectorAll('script, style, iframe, head, footer');
  scriptTags.forEach((el) => el.remove());

  let result = '';
  tempWrap.childNodes.forEach((child) => {
    result += traverse(child);
  });

  // Final cleanup of extra margins/newlines
  return result
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
