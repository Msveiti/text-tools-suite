// Case Converter Tool - JavaScript

const textInput = document.getElementById('caseTextInput');
const upperCaseBtn = document.getElementById('upperCaseBtn');
const lowerCaseBtn = document.getElementById('lowerCaseBtn');
const titleCaseBtn = document.getElementById('titleCaseBtn');
const sentenceCaseBtn = document.getElementById('sentenceCaseBtn');
const capitalizeBtn = document.getElementById('capitalizeBtn');
const alternatingBtn = document.getElementById('alternatingBtn');
const inverseBtn = document.getElementById('inverseBtn');
const copyBtn = document.getElementById('caseCopyBtn');
const clearBtn = document.getElementById('caseClearBtn');

// Conversion functions
function toUpperCase(text) {
    return text.toUpperCase();
}

function toLowerCase(text) {
    return text.toLowerCase();
}

function toTitleCase(text) {
    const minorWords = new Set(['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'from', 'in', 'into', 'of', 'on', 'or', 'the', 'to', 'with']);
    
    return text.toLowerCase().split(' ').map((word, index) => {
        if (index === 0 || !minorWords.has(word)) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return word;
    }).join(' ');
}

function toSentenceCase(text) {
    return text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
}

function toCapitalizeEachWord(text) {
    return text.toLowerCase().split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

function toAlternatingCase(text) {
    return text.split('').map((char, index) => 
        index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
    ).join('');
}

function toInverseCase(text) {
    return text.split('').map(char => {
        if (char === char.toUpperCase()) {
            return char.toLowerCase();
        }
        return char.toUpperCase();
    }).join('');
}

// Event listeners for conversion buttons
upperCaseBtn.addEventListener('click', () => {
    textInput.value = toUpperCase(textInput.value);
});

lowerCaseBtn.addEventListener('click', () => {
    textInput.value = toLowerCase(textInput.value);
});

titleCaseBtn.addEventListener('click', () => {
    textInput.value = toTitleCase(textInput.value);
});

sentenceCaseBtn.addEventListener('click', () => {
    textInput.value = toSentenceCase(textInput.value);
});

capitalizeBtn.addEventListener('click', () => {
    textInput.value = toCapitalizeEachWord(textInput.value);
});

alternatingBtn.addEventListener('click', () => {
    textInput.value = toAlternatingCase(textInput.value);
});

inverseBtn.addEventListener('click', () => {
    textInput.value = toInverseCase(textInput.value);
});

// Copy functionality
copyBtn.addEventListener('click', async () => {
    const text = textInput.value;
    
    if (text.trim().length === 0) {
        alert('Nothing to copy! Please enter some text first.');
        return;
    }
    
    try {
        await navigator.clipboard.writeText(text);
        
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
        alert('Failed to copy text.');
    }
});

// Clear functionality
clearBtn.addEventListener('click', () => {
    if (textInput.value.trim().length > 0) {
        if (confirm('Clear all text?')) {
            textInput.value = '';
            textInput.focus();
        }
    }
});

// Focus on load
window.addEventListener('load', () => {
    textInput.focus();
});
