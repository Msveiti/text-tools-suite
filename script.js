// Word Counter Tool - Main JavaScript File

// DOM Elements
const textInput = document.getElementById('textInput');
const wordCountEl = document.getElementById('wordCount');
const charCountEl = document.getElementById('charCount');
const charCountNoSpacesEl = document.getElementById('charCountNoSpaces');
const sentenceCountEl = document.getElementById('sentenceCount');
const paragraphCountEl = document.getElementById('paragraphCount');
const readingTimeEl = document.getElementById('readingTime');
const speakingTimeEl = document.getElementById('speakingTime');
const avgWordLengthEl = document.getElementById('avgWordLength');
const longestWordEl = document.getElementById('longestWord');
const topKeywordsEl = document.getElementById('topKeywords');

// Platform status elements
const platformStatuses = {
    twitter: document.getElementById('twitterStatus'),
    instagram: document.getElementById('instagramStatus'),
    facebook: document.getElementById('facebookStatus'),
    linkedin: document.getElementById('linkedinStatus'),
    youtube: document.getElementById('youtubeStatus'),
    meta: document.getElementById('metaStatus')
};

// Buttons
const clearBtn = document.getElementById('clearBtn');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');

// Platform character limits
const platformLimits = {
    twitter: 280,
    instagram: 2200,
    facebook: 63206,
    linkedin: 3000,
    youtube: 5000,
    meta: 160
};

// Main counting function
function updateCounts() {
    const text = textInput.value;
    
    // Word count
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCount = text.trim().length === 0 ? 0 : words.length;
    wordCountEl.textContent = wordCount.toLocaleString();
    
    // Character count
    const charCount = text.length;
    charCountEl.textContent = charCount.toLocaleString();
    
    // Character count without spaces
    const charCountNoSpaces = text.replace(/\s/g, '').length;
    charCountNoSpacesEl.textContent = charCountNoSpaces.toLocaleString();
    
    // Sentence count
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
    const sentenceCount = sentences.length;
    sentenceCountEl.textContent = sentenceCount.toLocaleString();
    
    // Paragraph count
    const paragraphs = text.split(/\n\n+/).filter(para => para.trim().length > 0);
    const paragraphCount = paragraphs.length;
    paragraphCountEl.textContent = paragraphCount.toLocaleString();
    
    // Reading time (average 200 words per minute)
    const readingTimeMinutes = Math.ceil(wordCount / 200);
    readingTimeEl.textContent = `${readingTimeMinutes} min`;
    
    // Speaking time (average 125 words per minute)
    const speakingTimeMinutes = Math.ceil(wordCount / 125);
    speakingTimeEl.textContent = `${speakingTimeMinutes} ${speakingTimeMinutes === 1 ? 'minute' : 'minutes'}`;
    
    // Average word length
    if (wordCount > 0) {
        const totalLength = words.reduce((sum, word) => sum + word.length, 0);
        const avgLength = (totalLength / wordCount).toFixed(1);
        avgWordLengthEl.textContent = `${avgLength} characters`;
    } else {
        avgWordLengthEl.textContent = '0';
    }
    
    // Longest word
    if (wordCount > 0) {
        const longest = words.reduce((a, b) => a.length > b.length ? a : b);
        longestWordEl.textContent = `${longest} (${longest.length} chars)`;
    } else {
        longestWordEl.textContent = '-';
    }
    
    // Top keywords (most frequent words, excluding common words)
    if (wordCount > 0) {
        const topWords = getTopKeywords(words, 3);
        topKeywordsEl.textContent = topWords.join(', ') || '-';
    } else {
        topKeywordsEl.textContent = '-';
    }
    
    // Update platform statuses
    updatePlatformStatuses(charCount);
}

// Get top keywords excluding common stop words
function getTopKeywords(words, count) {
    const stopWords = new Set([
        'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
        'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
        'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
        'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
        'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
        'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take',
        'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other',
        'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also',
        'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way',
        'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us',
        'is', 'was', 'are', 'been', 'has', 'had', 'were', 'said', 'did', 'having'
    ]);
    
    // Count word frequency
    const wordFreq = {};
    words.forEach(word => {
        const cleanWord = word.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (cleanWord.length > 2 && !stopWords.has(cleanWord)) {
            wordFreq[cleanWord] = (wordFreq[cleanWord] || 0) + 1;
        }
    });
    
    // Sort by frequency and get top words
    return Object.entries(wordFreq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, count)
        .map(([word]) => word);
}

// Update platform status indicators
function updatePlatformStatuses(charCount) {
    Object.entries(platformLimits).forEach(([platform, limit]) => {
        const statusEl = platformStatuses[platform];
        const percentage = (charCount / limit) * 100;
        
        if (charCount === 0) {
            statusEl.textContent = '-';
            statusEl.className = 'platform-status';
        } else if (percentage <= 80) {
            statusEl.textContent = `${charCount} / ${limit} ✓`;
            statusEl.className = 'platform-status within-limit';
        } else if (percentage <= 100) {
            statusEl.textContent = `${charCount} / ${limit} ⚠️`;
            statusEl.className = 'platform-status near-limit';
        } else {
            statusEl.textContent = `${charCount} / ${limit} ✗`;
            statusEl.className = 'platform-status over-limit';
        }
    });
}

// Clear button functionality
clearBtn.addEventListener('click', () => {
    if (textInput.value.trim().length > 0) {
        if (confirm('Are you sure you want to clear all text?')) {
            textInput.value = '';
            textInput.focus();
            updateCounts();
        }
    }
});

// Copy button functionality
copyBtn.addEventListener('click', async () => {
    const text = textInput.value;
    
    if (text.trim().length === 0) {
        alert('Nothing to copy! Please enter some text first.');
        return;
    }
    
    try {
        await navigator.clipboard.writeText(text);
        
        // Visual feedback
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<span>✅</span> Copied!';
        copyBtn.style.background = '#10b981';
        copyBtn.style.color = 'white';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.style.background = '';
            copyBtn.style.color = '';
        }, 2000);
    } catch (err) {
        alert('Failed to copy text. Please try selecting and copying manually.');
    }
});

// Download button functionality
downloadBtn.addEventListener('click', () => {
    const text = textInput.value;
    
    if (text.trim().length === 0) {
        alert('Nothing to download! Please enter some text first.');
        return;
    }
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `text-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Visual feedback
    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = '<span>✅</span> Downloaded!';
    downloadBtn.style.background = '#10b981';
    downloadBtn.style.color = 'white';
    
    setTimeout(() => {
        downloadBtn.innerHTML = originalText;
        downloadBtn.style.background = '';
        downloadBtn.style.color = '';
    }, 2000);
});

// Event listener for text input
textInput.addEventListener('input', updateCounts);

// Handle paste event for better UX
textInput.addEventListener('paste', (e) => {
    setTimeout(updateCounts, 10);
});

// Load saved text from localStorage on page load (optional feature)
window.addEventListener('load', () => {
    const savedText = localStorage.getItem('wordCounterText');
    if (savedText && savedText.trim().length > 0) {
        const restore = confirm('Do you want to restore your previous text?');
        if (restore) {
            textInput.value = savedText;
            updateCounts();
        }
    }
    
    // Focus on textarea
    textInput.focus();
});

// Auto-save text to localStorage
let saveTimeout;
textInput.addEventListener('input', () => {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
        if (textInput.value.trim().length > 0) {
            localStorage.setItem('wordCounterText', textInput.value);
        } else {
            localStorage.removeItem('wordCounterText');
        }
    }, 1000);
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to clear
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        clearBtn.click();
    }
    
    // Ctrl/Cmd + Shift + C to copy
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        copyBtn.click();
    }
    
    // Ctrl/Cmd + S to download
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        downloadBtn.click();
    }
});

// Initialize counts on page load
updateCounts();

// Add smooth scroll behavior for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Console welcome message
console.log('%c📝 TextTools - Word Counter', 'font-size: 20px; font-weight: bold; color: #4f46e5;');
console.log('%cYour text is processed locally in your browser. We never store your content.', 'color: #6b7280;');
console.log('%cKeyboard shortcuts:', 'font-weight: bold; margin-top: 10px;');
console.log('  Ctrl/Cmd + K: Clear text');
console.log('  Ctrl/Cmd + Shift + C: Copy text');
console.log('  Ctrl/Cmd + S: Download text');
