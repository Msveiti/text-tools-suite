// Lorem Ipsum Generator - JavaScript

const loremOutput = document.getElementById('loremOutput');
const loremCount = document.getElementById('loremCount');
const loremType = document.getElementById('loremType');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('loremCopyBtn');
const clearBtn = document.getElementById('loremClearBtn');

// Lorem ipsum word bank
const loremWords = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'at', 'vero', 'eos',
    'accusamus', 'iusto', 'odio', 'dignissimos', 'ducimus', 'blanditiis',
    'praesentium', 'voluptatum', 'deleniti', 'atque', 'corrupti', 'quos', 'quas',
    'molestias', 'excepturi', 'obcaecati', 'similique', 'eleifend', 'option',
    'congue', 'nihil', 'imperdiet', 'doming', 'quod', 'mazim', 'placerat', 'facer'
];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateWord() {
    return loremWords[getRandomInt(0, loremWords.length - 1)];
}

function generateSentence() {
    const wordCount = getRandomInt(8, 16);
    const words = [];
    
    for (let i = 0; i < wordCount; i++) {
        words.push(generateWord());
    }
    
    // Capitalize first word
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    
    return words.join(' ') + '.';
}

function generateParagraph() {
    const sentenceCount = getRandomInt(4, 8);
    const sentences = [];
    
    for (let i = 0; i < sentenceCount; i++) {
        sentences.push(generateSentence());
    }
    
    return sentences.join(' ');
}

function generateLoremIpsum() {
    const count = parseInt(loremCount.value) || 5;
    const type = loremType.value;
    let result = '';
    
    if (count < 1 || count > 100) {
        alert('Please enter a number between 1 and 100');
        return;
    }
    
    switch (type) {
        case 'paragraphs':
            const paragraphs = [];
            for (let i = 0; i < count; i++) {
                paragraphs.push(generateParagraph());
            }
            result = paragraphs.join('\n\n');
            break;
            
        case 'sentences':
            const sentences = [];
            for (let i = 0; i < count; i++) {
                sentences.push(generateSentence());
            }
            result = sentences.join(' ');
            break;
            
        case 'words':
            const words = [];
            for (let i = 0; i < count; i++) {
                words.push(generateWord());
            }
            // Capitalize first word
            words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
            result = words.join(' ') + '.';
            break;
    }
    
    loremOutput.value = result;
}

// Event listeners
generateBtn.addEventListener('click', generateLoremIpsum);

copyBtn.addEventListener('click', async () => {
    const text = loremOutput.value;
    
    if (text.trim().length === 0) {
        alert('Nothing to copy! Generate some text first.');
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

clearBtn.addEventListener('click', () => {
    loremOutput.value = '';
});

// Generate on Enter key
loremCount.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        generateLoremIpsum();
    }
});

// Generate initial text on load
window.addEventListener('load', () => {
    generateLoremIpsum();
});
