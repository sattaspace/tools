export interface DiffItem {
  type: 'added' | 'removed' | 'unchanged';
  value: string;
  leftLineNum?: number;
  rightLineNum?: number;
}

export interface WordDiffSegment {
  type: 'added' | 'removed' | 'unchanged';
  text: string;
}

/**
 * Computes the Longest Common Subsequence (LCS) line-level diff between two sets of strings.
 */
export function computeLineDiff(
  linesA: string[],
  linesB: string[],
  ignoreWhitespace = false,
  ignoreCase = false
): DiffItem[] {
  const m = linesA.length;
  const n = linesB.length;

  const normalize = (s: string) => {
    let key = s;
    if (ignoreWhitespace) {
      key = key.trim().replace(/\s+/g, ' ');
    }
    if (ignoreCase) {
      key = key.toLowerCase();
    }
    return key;
  };

  const keysA = linesA.map(normalize);
  const keysB = linesB.map(normalize);

  // Safety cap to avoid freezing browser on giant files (e.g. > 2000 lines)
  // If exceeding, fall back to simple line-by-line comparison or quick window diff to stay responsive
  if (m * n > 1200000) {
    // Quick linear comparison fallback
    const result: DiffItem[] = [];
    const maxLen = Math.max(m, n);
    for (let idx = 0; idx < maxLen; idx++) {
      const liveA = linesA[idx];
      const liveB = linesB[idx];
      
      if (liveA !== undefined && liveB !== undefined) {
        if (normalize(liveA) === normalize(liveB)) {
          result.push({ type: 'unchanged', value: liveA, leftLineNum: idx + 1, rightLineNum: idx + 1 });
        } else {
          result.push({ type: 'removed', value: liveA, leftLineNum: idx + 1 });
          result.push({ type: 'added', value: liveB, rightLineNum: idx + 1 });
        }
      } else if (liveA !== undefined) {
        result.push({ type: 'removed', value: liveA, leftLineNum: idx + 1 });
      } else if (liveB !== undefined) {
        result.push({ type: 'added', value: liveB, rightLineNum: idx + 1 });
      }
    }
    return result;
  }

  // DP table initialization
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (keysA[i - 1] === keysB[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  const result: DiffItem[] = [];
  let i = m;
  let j = n;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && keysA[i - 1] === keysB[j - 1]) {
      result.unshift({
        type: 'unchanged',
        value: linesA[i - 1],
        leftLineNum: i,
        rightLineNum: j,
      });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      result.unshift({
        type: 'added',
        value: linesB[j - 1],
        rightLineNum: j,
      });
      j--;
    } else {
      result.unshift({
        type: 'removed',
        value: linesA[i - 1],
        leftLineNum: i,
      });
      i--;
    }
  }

  return result;
}

/**
 * Computes difference at a character level between two lines to generate clean inline highlights.
 */
export function computeCharacterDiff(originalLine: string, modifiedLine: string): {
  removedSegments: WordDiffSegment[];
  addedSegments: WordDiffSegment[];
} {
  // Let's implement LCS at character level to isolate modified parts.
  const m = originalLine.length;
  const n = modifiedLine.length;

  if (m === 0 || n === 0) {
    return {
      removedSegments: [{ type: 'removed', text: originalLine }],
      addedSegments: [{ type: 'added', text: modifiedLine }]
    };
  }

  // Safety check for character levels
  if (m * n > 40000) {
    return {
      removedSegments: [{ type: 'removed', text: originalLine }],
      addedSegments: [{ type: 'added', text: modifiedLine }]
    };
  }

  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (originalLine[i - 1] === modifiedLine[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  let i = m;
  let j = n;
  const removedTemp: WordDiffSegment[] = [];
  const addedTemp: WordDiffSegment[] = [];

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && originalLine[i - 1] === modifiedLine[j - 1]) {
      const char = originalLine[i - 1];
      removedTemp.unshift({ type: 'unchanged', text: char });
      addedTemp.unshift({ type: 'unchanged', text: char });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      addedTemp.unshift({ type: 'added', text: modifiedLine[j - 1] });
      j--;
    } else {
      removedTemp.unshift({ type: 'removed', text: originalLine[i - 1] });
      i--;
    }
  }

  // Package adjacent segments together for rendering performance
  const mergeSegments = (segs: WordDiffSegment[]): WordDiffSegment[] => {
    if (segs.length === 0) return [];
    const merged: WordDiffSegment[] = [];
    let current = { ...segs[0] };

    for (let idx = 1; idx < segs.length; idx++) {
      if (segs[idx].type === current.type) {
        current.text += segs[idx].text;
      } else {
        merged.push(current);
        current = { ...segs[idx] };
      }
    }
    merged.push(current);
    return merged;
  };

  return {
    removedSegments: mergeSegments(removedTemp),
    addedSegments: mergeSegments(addedTemp)
  };
}
