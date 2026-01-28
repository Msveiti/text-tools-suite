// src/utils/textLogic.ts

export const STOP_WORDS = new Set(['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'is', 'was', 'are']);

export const getStats = (text: string) => {
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).filter(Boolean) : [];
  const wordCount = words.length;
  
  // Actual loop for sentences
  let sentenceCount = 0;
  let inSentence = false;
  
  // Loop through each character to identify sentences
  for (let i = 0; i < trimmed.length; i++) {
    const char = trimmed[i];
    if (/[a-zA-Z0-9]/.test(char)) {
      inSentence = true;
    } else if (/[.!?]/.test(char) && inSentence) {
      sentenceCount++;
      inSentence = false;
    }
  }
  // Count the last sentence if text doesn't end with punctuation
  if (inSentence) sentenceCount++;
  
  // Actual loop for paragraphs
  const lines = trimmed.split('\n');
  let paragraphCount = 0;
  let isEmptyLine = true;
  
  // Loop through lines to count paragraphs
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.length > 0 && isEmptyLine) {
      paragraphCount++;
      isEmptyLine = false;
    } else if (line.length === 0) {
      isEmptyLine = true;
    }
  }

  return {
    words: wordCount,
    characters: text.length,
    charsNoSpaces: text.replace(/\s/g, '').length,
    sentences: sentenceCount,
    paragraphs: paragraphCount,
    readingTime: Math.ceil(wordCount / 200),
    speakingTime: Math.ceil(wordCount / 125),
  };
};

export const getKeywordDensity = (text: string) => {
  if (!text.trim()) return [];
  const words = text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter((w) => w.length > 2 && !STOP_WORDS.has(w));
  const counts: Record<string, number> = {};
  
  // Loop through words to count occurrences
  words.forEach((w) => counts[w] = (counts[w] || 0) + 1);
  
  const total = words.length;
  return Object.entries(counts)
    .map(([word, count]) => ({ 
      word, 
      count, 
      percentage: total > 0 ? parseFloat(((count / total) * 100).toFixed(1)) : 0 
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
};

export const getAIInsights = (text: string) => {
  if (text.length < 50) return "Draft 50+ characters to unlock AI insights...";
  
  const stats = getStats(text);
  const insights: string[] = [];
  
  // Real logic gates for AI insights
  if (stats.words < 100) {
    insights.push("Text is brief. Consider expanding for more impact.");
  } else if (stats.words > 500) {
    insights.push("Comprehensive content detected. Good depth!");
  } else {
    insights.push("Balanced length. Suitable for most platforms.");
  }
  
  // Paragraph analysis
  if (stats.paragraphs > 1 && stats.words / stats.paragraphs > 150) {
    insights.push("Consider breaking up long paragraphs for readability.");
  } else if (stats.paragraphs === 1 && stats.words > 200) {
    insights.push("Try adding paragraph breaks to improve scannability.");
  }
  
  // Sentence length analysis
  const avgSentenceLength = stats.words / Math.max(stats.sentences, 1);
  if (avgSentenceLength > 25) {
    insights.push("Some sentences are long. Try varying sentence length.");
  } else if (avgSentenceLength < 10) {
    insights.push("Sentences are concise. Good for digital content!");
  }
  
  // Word variety analysis
  const uniqueWords = new Set(text.toLowerCase().match(/\b\w+\b/g) || []);
  const uniqueRatio = uniqueWords.size / Math.max(stats.words, 1);
  if (uniqueRatio < 0.4) {
    insights.push("Word variety could be improved for better engagement.");
  } else if (uniqueRatio > 0.7) {
    insights.push("Excellent vocabulary diversity detected.");
  }
  
  // Return concatenated insights or default message
  return insights.length > 0 
    ? insights.join(" ") 
    : "Writing pattern recognized. Keep refining your content!";
};

export const converters = {
  upper: (t: string) => t.toUpperCase(),
  lower: (t: string) => t.toLowerCase(),
  sentence: (t: string) => t.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase()),
  title: (t: string) => {
    const minor = new Set(['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'from', 'in', 'into', 'of', 'on', 'or', 'the', 'to', 'with']);
    return t.toLowerCase().split(' ').map((w, i) => 
      (i === 0 || !minor.has(w)) ? w.charAt(0).toUpperCase() + w.slice(1) : w
    ).join(' ');
  },
  alternating: (t: string) => {
    let result = '';
    // Loop through characters for alternating case
    for (let i = 0; i < t.length; i++) {
      result += i % 2 === 0 ? t[i].toLowerCase() : t[i].toUpperCase();
    }
    return result;
  },
  inverse: (t: string) => {
    let result = '';
    // Loop through characters to invert case
    for (let i = 0; i < t.length; i++) {
      const char = t[i];
      result += char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase();
    }
    return result;
  }
};

export const generateLorem = (count: number, type: 'words' | 'sentences' | 'paragraphs') => {
  const baseWords = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua'];
  
  const getSentence = () => {
    const len = Math.floor(Math.random() * 6) + 8; // 8-13 words per sentence
    const sentenceWords: string[] = [];
    // Loop to build sentence
    for (let i = 0; i < len; i++) {
      sentenceWords.push(baseWords[Math.floor(Math.random() * baseWords.length)]);
    }
    const sentence = sentenceWords.join(' ');
    return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
  };

  if (type === 'words') {
    const words: string[] = [];
    // Loop to generate words
    for (let i = 0; i < count; i++) {
      words.push(baseWords[Math.floor(Math.random() * baseWords.length)]);
    }
    return words.join(' ');
  }
  
  if (type === 'sentences') {
    const sentences: string[] = [];
    // Loop to generate sentences
    for (let i = 0; i < count; i++) {
      sentences.push(getSentence());
    }
    return sentences.join(' ');
  }

  // Paragraphs
  const paragraphs: string[] = [];
  // Loop to generate paragraphs
  for (let p = 0; p < count; p++) {
    const paraSentenceCount = Math.floor(Math.random() * 3) + 4; // 4-6 sentences per paragraph
    const paragraphSentences: string[] = [];
    // Loop to build paragraph sentences
    for (let s = 0; s < paraSentenceCount; s++) {
      paragraphSentences.push(getSentence());
    }
    paragraphs.push(paragraphSentences.join(' '));
  }
  return paragraphs.join('\n\n');
};

export const computeDiff = (oldText: string, newText: string) => {
  const oldWords = oldText.split(/(\s+)/);
  const newWords = newText.split(/(\s+)/);
  const n = oldWords.length;
  const m = newWords.length;
  const dp = Array(n + 1).fill(null).map(() => Array(m + 1).fill(0));

  // Loop for LCS calculation
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (oldWords[i - 1] === newWords[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  const diff: Array<{type: 'added' | 'removed' | 'unchanged', text: string}> = [];
  let i = n, j = m;
  
  // Loop to reconstruct the diff
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && oldWords[i - 1] === newWords[j - 1]) {
      diff.unshift({ type: 'unchanged', text: oldWords[i - 1] });
      i--; j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      diff.unshift({ type: 'added', text: newWords[j - 1] });
      j--;
    } else if (i > 0) {
      diff.unshift({ type: 'removed', text: oldWords[i - 1] });
      i--;
    }
  }
  
  return diff;
};