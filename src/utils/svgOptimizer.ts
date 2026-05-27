/**
 * Pure TypeScript SVG cleaning and optimization subroutines.
 */

export interface SvgOptimizationOptions {
  stripComments: boolean;
  stripMetadata: boolean;
  stripNamespaces: boolean;
  roundDecimals: boolean;
  decimalPlaces: number;
  minify: boolean;
}

export function optimizeSvg(
  rawSvg: string,
  options: SvgOptimizationOptions
): string {
  let result = rawSvg.trim();

  // 1. Strip standard XML statements and DocType headers
  result = result.replace(/<\?xml[\s\S]*?\?>/i, '');
  result = result.replace(/<!DOCTYPE[\s\S]*?>/i, '');

  // 2. Strip comments
  if (options.stripComments) {
    result = result.replace(/<!--[\s\S]*?-->/g, '');
  }

  // 3. Strip metadata elements (contains RDF, licenses, edit history)
  if (options.stripMetadata) {
    result = result.replace(/<metadata[\s\S]*?<\/metadata>/gi, '');
    result = result.replace(/<desc[\s\S]*?<\/desc>/gi, '');
    result = result.replace(/<title[\s\S]*?<\/title>/gi, '');
  }

  // 4. Strip Sodipodi, Inkscape namespaces & properties
  if (options.stripNamespaces) {
    // Strip attributes like sodipodi:docname, inkscape:connector-curvature
    result = result.replace(/\s*(?:inkscape|sodipodi|sketch|illustrator):[a-z0-9-]+="[^"]*"/gi, '');
    // Strip namespace declarations
    result = result.replace(/\s*xmlns:(?:inkscape|sodipodi|sketch|illustrator)="[^"]*"/gi, '');
  }

  // 5. Round fractional decimals in coords to reduce coordinate strings
  if (options.roundDecimals) {
    // Matches float decimals with 3 or more numbers after period
    const decimalPattern = /(\d+\.\d{3,})/g;
    result = result.replace(decimalPattern, (match) => {
      const parsed = parseFloat(match);
      if (isNaN(parsed)) return match;
      // Convert to specified decimal places and convert back to string to drop trailing zeros
      return Number(parsed.toFixed(options.decimalPlaces)).toString();
    });
  }

  // 6. Spacer Compress Format (Minified vs Pretty formatting)
  if (options.minify) {
    // Remove syntax indent spaces between adjacent tags
    result = result.replace(/>\s+</g, '><');
    // Remove extra whitespaces inside tags
    result = result.replace(/\s{2,}/g, ' ');
  } else {
    // High-fidelity safe pretty-print indenter
    let formatted = '';
    let indent = '';
    const pad = '  ';
    
    // Safely structure lines on brackets
    const tempResult = result.replace(/>\s*</g, '><');
    const nodes = tempResult.replace(/(>)(<)(\/*)/g, '$1\r\n$2$3').split('\r\n');

    nodes.forEach((node) => {
      if (node.match(/.+<\/\w[^>]*>$/)) {
        // Tag with inline text/close
        formatted += indent + node + '\r\n';
      } else if (node.match(/^<\/\w/)) {
        // Tag closure
        if (indent.length >= pad.length) {
          indent = indent.slice(pad.length);
        }
        formatted += indent + node + '\r\n';
      } else if (node.match(/^<\w[^>]*[^\/]>$/)) {
        // Tag start
        formatted += indent + node + '\r\n';
        indent += pad;
      } else {
        // Single closed tags or text
        formatted += indent + node + '\r\n';
      }
    });
    result = formatted.trim();
  }

  return result;
}

/**
 * Beautiful default preset SVG illustration for initial preview
 */
export const DEFAULT_SVG_PRESET = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <!-- Created with DevHub vector compiler presets -->
  <defs>
    <linearGradient id="cyberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4F46E5" />
      <stop offset="50%" stop-color="#8B5CF6" />
      <stop offset="100%" stop-color="#10B981" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
  
  <!-- Sleek Cybernetic Tech Badge Geometry -->
  <rect width="100%" height="100%" fill="#0a0f1d" rx="24" />
  
  <!-- Outer Matrix Grid Rings -->
  <circle cx="200" cy="200" r="140" fill="none" stroke="#1f293d" stroke-width="2" stroke-dasharray="4 8" />
  <circle cx="200" cy="200" r="110" fill="none" stroke="url(#cyberGrad)" stroke-width="1.5" stroke-opacity="0.3" />
  
  <!-- Neon Triangle Orbitals -->
  <polygon points="200,85 295,255 105,255" fill="none" stroke="url(#cyberGrad)" stroke-width="3" filter="url(#glow)" />
  
  <!-- Center Core Atom Sphere -->
  <circle cx="200" cy="200" r="45" fill="#141c2f" stroke="url(#cyberGrad)" stroke-width="3.5" />
  <circle cx="200" cy="200" r="16" fill="#10B981" filter="url(#glow)" />

  <!-- Code Metrics Orbit dashes -->
  <path d="M 120,200 A 80,80 0 0,1 280,200" fill="none" stroke="#10B981" stroke-width="2.5" stroke-dasharray="10 12" />
</svg>`;
