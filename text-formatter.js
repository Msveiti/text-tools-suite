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
        // Show loading (brief, since processing is instant)
        formatBtn.disabled = true;
        loadingSpinner.classList.add('active');
        errorMessage.classList.remove('active');
        outputText.value = '';

        // Small delay for UX (makes it feel like real processing)
        await new Promise(resolve => setTimeout(resolve, 500));

        try {
            const options = getSelectedOptions();
            const formattedText = applyFormatting(text, selectedStyle, options);

            // Display result
            outputText.value = formattedText;
            updateWordCounts();

        } catch (error) {
            console.error('Formatting error:', error);
            showError('Failed to format text. Please try again.');
        } finally {
            formatBtn.disabled = false;
            loadingSpinner.classList.remove('active');
        }
    }

    function applyFormatting(text, style, options) {
        let result = text;

        // Step 1: Clean up spacing
        if (options.fixSpacing) {
            result = result.replace(/\s+/g, ' '); // Multiple spaces to single space
            result = result.trim();
            result = result.replace(/\s+([.,!?;:])/g, '$1'); // Remove space before punctuation
            result = result.replace(/([.,!?;:])\s*/g, '$1 '); // Add space after punctuation
            result = result.replace(/\s+$/gm, ''); // Remove trailing spaces
        }

        // Step 2: Fix basic grammar and contractions
        if (options.fixGrammar) {
            // Common contractions
            result = result.replace(/\bim\b/gi, "I'm");
            result = result.replace(/\bive\b/gi, "I've");
            result = result.replace(/\bill\b/gi, "I'll");
            result = result.replace(/\bid\b/gi, "I'd");
            result = result.replace(/\bdont\b/gi, "don't");
            result = result.replace(/\bdidnt\b/gi, "didn't");
            result = result.replace(/\bwont\b/gi, "won't");
            result = result.replace(/\bcant\b/gi, "can't");
            result = result.replace(/\bcouldnt\b/gi, "couldn't");
            result = result.replace(/\bwouldnt\b/gi, "wouldn't");
            result = result.replace(/\bshouldnt\b/gi, "shouldn't");
            result = result.replace(/\bisnt\b/gi, "isn't");
            result = result.replace(/\barent\b/gi, "aren't");
            result = result.replace(/\bwasnt\b/gi, "wasn't");
            result = result.replace(/\bwerent\b/gi, "weren't");
            result = result.replace(/\bhasnt\b/gi, "hasn't");
            result = result.replace(/\bhavent\b/gi, "haven't");
            result = result.replace(/\bhadnt\b/gi, "hadn't");
            result = result.replace(/\bthats\b/gi, "that's");
            result = result.replace(/\bwhats\b/gi, "what's");
            result = result.replace(/\bwhos\b/gi, "who's");
            result = result.replace(/\bwheres\b/gi, "where's");
            result = result.replace(/\bwhens\b/gi, "when's");
            result = result.replace(/\bhows\b/gi, "how's");
            result = result.replace(/\bwhys\b/gi, "why's");
            result = result.replace(/\blets\b/gi, "let's");
            result = result.replace(/\btheres\b/gi, "there's");
            result = result.replace(/\btheyre\b/gi, "they're");
            result = result.replace(/\btheyll\b/gi, "they'll");
            result = result.replace(/\btheyd\b/gi, "they'd");
            result = result.replace(/\btheyve\b/gi, "they've");
            result = result.replace(/\bwere\b/gi, "we're");
            result = result.replace(/\bwell\b/gi, "we'll");
            result = result.replace(/\bweve\b/gi, "we've");
            result = result.replace(/\byoure\b/gi, "you're");
            result = result.replace(/\byoull\b/gi, "you'll");
            result = result.replace(/\byouve\b/gi, "you've");
            result = result.replace(/\byoud\b/gi, "you'd");
            result = result.replace(/\bhes\b/gi, "he's");
            result = result.replace(/\bhell\b/gi, "he'll");
            result = result.replace(/\bshes\b/gi, "she's");
            result = result.replace(/\bshell\b/gi, "she'll");
            result = result.replace(/\bits\b/gi, "it's");
            result = result.replace(/\bitll\b/gi, "it'll");
        }

        // Step 3: Add punctuation
        if (options.addPunctuation) {
            result = addSmartPunctuation(result, style);
        }

        // Step 4: Fix capitalization
        if (options.fixCapitalization) {
            result = fixCapitalization(result);
        }

        // Step 5: Add paragraphs
        if (options.addParagraphs) {
            result = addParagraphBreaks(result);
        }

        // Step 6: Improve flow (remove filler words, fix repetition)
        if (options.improveFlow) {
            result = improveFlow(result, style);
        }

        // Final cleanup
        result = result.replace(/\s+/g, ' '); // Clean up any double spaces
        result = result.replace(/\s+([.,!?;:])/g, '$1'); // Remove space before punctuation
        result = result.trim();

        return result;
    }

    function addSmartPunctuation(text, style) {
        // Split into sentences (rough split by common patterns)
        let sentences = text.split(/(?<=[.!?])\s+/);
        
        // If no sentence endings exist, we need to add them
        if (sentences.length === 1 && !text.match(/[.!?]$/)) {
            // Split by common sentence patterns
            sentences = text.match(/[^.!?]+/g) || [text];
        }

        let result = sentences.map((sentence, index) => {
            sentence = sentence.trim();
            if (!sentence) return '';

            // Don't add punctuation if it already has ending punctuation
            if (/[.!?]$/.test(sentence)) {
                return sentence;
            }

            // Detect questions (starts with question words or has question pattern)
            const questionWords = /^(what|when|where|who|why|how|is|are|do|does|did|can|could|would|should|will)/i;
            const hasQuestionPattern = questionWords.test(sentence);

            // Detect excitement/emphasis (based on style and certain keywords)
            const excitementWords = /(amazing|awesome|great|excited|love|wow|incredible|fantastic|congratulations|yay|finally|perfect)/i;
            const hasExcitement = excitementWords.test(sentence) && style === 'social';

            // Add appropriate punctuation
            if (hasQuestionPattern) {
                return sentence + '?';
            } else if (hasExcitement) {
                return sentence + '!';
            } else if (style === 'social' && index === sentences.length - 1) {
                // Last sentence in social media style often ends with !
                return sentence + '!';
            } else {
                return sentence + '.';
            }
        }).filter(s => s).join(' ');

        // Add commas in lists (simple heuristic)
        result = result.replace(/\b(and|or)\s+(\w+)\s+(and|or)\s+/g, ', $1 $2 $3 ');

        return result;
    }

    function fixCapitalization(text) {
        // Capitalize first letter of text
        text = text.charAt(0).toUpperCase() + text.slice(1);

        // Capitalize after sentence endings
        text = text.replace(/([.!?]\s+)([a-z])/g, (match, punctuation, letter) => {
            return punctuation + letter.toUpperCase();
        });

        // Capitalize "I"
        text = text.replace(/\bi\b/g, 'I');

        // Capitalize common proper nouns and acronyms
        const properNouns = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday',
                             'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 
                             'september', 'october', 'november', 'december'];
        
        properNouns.forEach(noun => {
            const regex = new RegExp('\\b' + noun + '\\b', 'gi');
            text = text.replace(regex, noun.charAt(0).toUpperCase() + noun.slice(1));
        });

        return text;
    }

    function addParagraphBreaks(text) {
        // Split long text into paragraphs (roughly every 3-4 sentences)
        const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
        
        if (sentences.length <= 3) return text;

        let paragraphs = [];
        let currentParagraph = [];

        sentences.forEach((sentence, index) => {
            currentParagraph.push(sentence.trim());

            // Create new paragraph every 3-4 sentences, or if there's a topic shift indicator
            const topicShiftWords = /\b(however|moreover|furthermore|additionally|meanwhile|therefore|consequently|in conclusion|first|second|third|finally)\b/i;
            
            if (currentParagraph.length >= 3 || 
                (currentParagraph.length >= 2 && topicShiftWords.test(sentence))) {
                paragraphs.push(currentParagraph.join(' '));
                currentParagraph = [];
            }
        });

        // Add remaining sentences
        if (currentParagraph.length > 0) {
            paragraphs.push(currentParagraph.join(' '));
        }

        return paragraphs.join('\n\n');
    }

    function improveFlow(text, style) {
        // Remove excessive filler words based on style
        if (style === 'formal') {
            // Remove casual fillers
            text = text.replace(/\b(like|um|uh|you know|basically|literally|actually|just|really)\b/gi, '');
            text = text.replace(/\b(i mean|i think|i guess|kind of|sort of)\b/gi, '');
        }

        if (style === 'casual' || style === 'social') {
            // Keep some natural language but reduce repetition
            text = text.replace(/\breally\s+really\b/gi, 'really');
            text = text.replace(/\bvery\s+very\b/gi, 'very');
        }

        // Remove double words
        text = text.replace(/\b(\w+)\s+\1\b/gi, '$1');

        // Clean up multiple spaces created by removal
        text = text.replace(/\s{2,}/g, ' ');

        return text;
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
