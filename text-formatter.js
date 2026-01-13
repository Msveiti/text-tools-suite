// Text Formatter - VerboMetrics
// AI-powered text formatting with Claude API

document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const formatBtn = document.getElementById('formatBtn');
    const clearBtn = document.getElementById('clearBtn');
    const copyBtn = document.getElementById('copyBtn');
    const inputWords = document.getElementById('inputWords');
    const outputWords = document.getElementById('outputWords');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const errorMessage = document.getElementById('errorMessage');

    // Style buttons
    const styleBtns = document.querySelectorAll('.style-btn');
    let selectedStyle = 'formal';

    // Options checkboxes
    const addPunctuation = document.getElementById('addPunctuation');
    const fixCapitalization = document.getElementById('fixCapitalization');
    const fixSpacing = document.getElementById('fixSpacing');
    const addParagraphs = document.getElementById('addParagraphs');
    const improveFlow = document.getElementById('improveFlow');
    const fixGrammar = document.getElementById('fixGrammar');

    // Update word counts
    inputText.addEventListener('input', updateWordCounts);

    function updateWordCounts() {
        const inputCount = countWords(inputText.value);
        const outputCount = countWords(outputText.value);
        inputWords.textContent = `${inputCount} word${inputCount !== 1 ? 's' : ''}`;
        outputWords.textContent = `${outputCount} word${outputCount !== 1 ? 's' : ''}`;
    }

    function countWords(text) {
        const trimmed = text.trim();
        if (!trimmed) return 0;
        return trimmed.split(/\s+/).length;
    }

    // Style selector
    styleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            styleBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedStyle = this.dataset.style;
        });
    });

    // Format button
    formatBtn.addEventListener('click', async function() {
        const text = inputText.value.trim();

        if (!text) {
            showError('Please enter some text to format.');
            return;
        }

        if (text.length < 10) {
            showError('Please enter at least 10 characters.');
            return;
        }

        if (text.length > 5000) {
            showError('Text is too long. Maximum 5000 characters.');
            return;
        }

        await formatText(text);
    });

    async function formatText(text) {
        // Show loading
        formatBtn.disabled = true;
        loadingSpinner.classList.add('active');
        errorMessage.classList.remove('active');
        outputText.value = '';

        // Build prompt based on options
        const options = getSelectedOptions();
        const prompt = buildPrompt(text, selectedStyle, options);

        try {
            const response = await fetch('https://api.anthropic.com/v1/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'claude-sonnet-4-20250514',
                    max_tokens: 2000,
                    messages: [
                        {
                            role: 'user',
                            content: prompt
                        }
                    ]
                })
            });

            if (!response.ok) {
                throw new Error('Failed to format text. Please try again.');
            }

            const data = await response.json();
            const formattedText = data.content[0].text.trim();

            // Display result
            outputText.value = formattedText;
            updateWordCounts();

        } catch (error) {
            console.error('Formatting error:', error);
            showError('Failed to format text. Please try again or check your connection.');
        } finally {
            formatBtn.disabled = false;
            loadingSpinner.classList.remove('active');
        }
    }

    function getSelectedOptions() {
        return {
            addPunctuation: addPunctuation.checked,
            fixCapitalization: fixCapitalization.checked,
            fixSpacing: fixSpacing.checked,
            addParagraphs: addParagraphs.checked,
            improveFlow: improveFlow.checked,
            fixGrammar: fixGrammar.checked
        };
    }

    function buildPrompt(text, style, options) {
        let instructions = [];

        // Style-specific instructions
        if (style === 'formal') {
            instructions.push('Use a formal, professional tone suitable for business writing.');
        } else if (style === 'casual') {
            instructions.push('Use a casual, conversational tone suitable for everyday communication.');
        } else if (style === 'social') {
            instructions.push('Use a friendly, engaging tone perfect for social media posts. Keep it natural and relatable.');
        }

        // Options-based instructions
        if (options.addPunctuation) {
            instructions.push('Add proper punctuation including periods, commas, question marks, and exclamation points where appropriate.');
        }

        if (options.fixCapitalization) {
            instructions.push('Fix capitalization: capitalize the first letter of sentences and proper nouns.');
        }

        if (options.fixSpacing) {
            instructions.push('Fix spacing issues: remove extra spaces, ensure single spaces between words.');
        }

        if (options.addParagraphs) {
            instructions.push('Add paragraph breaks where natural topic shifts occur to improve readability.');
        }

        if (options.improveFlow) {
            instructions.push('Improve flow and readability by restructuring awkward phrases while keeping the original meaning.');
        }

        if (options.fixGrammar) {
            instructions.push('Fix basic grammar errors including subject-verb agreement and common mistakes.');
        }

        const instructionText = instructions.join(' ');

        return `You are a text formatting assistant. Format the following text according to these instructions:

${instructionText}

IMPORTANT: 
- Only output the formatted text, nothing else
- Do not add any explanations, notes, or comments
- Preserve the original meaning and intent
- Do not add new content or remove important information
- Keep contractions (don't, can't, won't) if they fit the style

Text to format:
"""
${text}
"""

Formatted text:`;
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.add('active');
        setTimeout(() => {
            errorMessage.classList.remove('active');
        }, 5000);
    }

    // Clear button
    clearBtn.addEventListener('click', function() {
        inputText.value = '';
        outputText.value = '';
        updateWordCounts();
        errorMessage.classList.remove('active');
    });

    // Copy button
    copyBtn.addEventListener('click', async function() {
        if (!outputText.value) {
            showError('Nothing to copy. Format some text first!');
            return;
        }

        try {
            await navigator.clipboard.writeText(outputText.value);
            
            // Visual feedback
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '✅ Copied!';
            copyBtn.style.background = '#10b981';
            
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.background = '';
            }, 2000);
        } catch (error) {
            showError('Failed to copy. Please select and copy manually.');
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter to format
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            formatBtn.click();
        }
        
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
    });

    // Initialize word counts
    updateWordCounts();
});
