// Text Diff Tool - VerboMetrics
// Word-by-word comparison with highlighting

document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const text1Input = document.getElementById('text1');
    const text2Input = document.getElementById('text2');
    const compareBtn = document.getElementById('compareBtn');
    const clearBtn = document.getElementById('clearBtn');
    const swapBtn = document.getElementById('swapBtn');
    const resultsSection = document.getElementById('resultsSection');
    const diffDisplay = document.getElementById('diffDisplay');
    const noDifferences = document.getElementById('noDifferences');
    const text1Words = document.getElementById('text1Words');
    const text2Words = document.getElementById('text2Words');

    // Stat elements
    const totalChangesEl = document.getElementById('totalChanges');
    const additionsEl = document.getElementById('additions');
    const deletionsEl = document.getElementById('deletions');
    const similarityEl = document.getElementById('similarity');
    const diff1El = document.getElementById('diff1');
    const diff2El = document.getElementById('diff2');

    // Update word counts on input
    text1Input.addEventListener('input', updateWordCounts);
    text2Input.addEventListener('input', updateWordCounts);

    function updateWordCounts() {
        const words1 = countWords(text1Input.value);
        const words2 = countWords(text2Input.value);
        text1Words.textContent = `${words1} word${words1 !== 1 ? 's' : ''}`;
        text2Words.textContent = `${words2} word${words2 !== 1 ? 's' : ''}`;
    }

    function countWords(text) {
        const trimmed = text.trim();
        if (!trimmed) return 0;
        return trimmed.split(/\s+/).length;
    }

    // Compare button
    compareBtn.addEventListener('click', function() {
        const text1 = text1Input.value.trim();
        const text2 = text2Input.value.trim();

        if (!text1 || !text2) {
            alert('Please enter text in both panels to compare.');
            return;
        }

        compareTexts(text1, text2);
    });

    // Clear button
    clearBtn.addEventListener('click', function() {
        text1Input.value = '';
        text2Input.value = '';
        resultsSection.classList.add('hidden');
        updateWordCounts();
    });

    // Swap button
    swapBtn.addEventListener('click', function() {
        const temp = text1Input.value;
        text1Input.value = text2Input.value;
        text2Input.value = temp;
        updateWordCounts();
        
        // If results are showing, re-compare
        if (!resultsSection.classList.contains('hidden')) {
            compareTexts(text1Input.value.trim(), text2Input.value.trim());
        }
    });

    function compareTexts(text1, text2) {
        // Split texts into words
        const words1 = text1.split(/(\s+)/);
        const words2 = text2.split(/(\s+)/);

        // Compute diff
        const diff = computeDiff(words1, words2);

        // Calculate statistics
        const stats = calculateStats(diff);

        // Display results
        displayResults(diff, stats);

        // Show results section
        resultsSection.classList.remove('hidden');
        
        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function computeDiff(words1, words2) {
        const n = words1.length;
        const m = words2.length;

        // Create DP table for LCS (Longest Common Subsequence)
        const dp = Array(n + 1).fill(null).map(() => Array(m + 1).fill(0));

        for (let i = 1; i <= n; i++) {
            for (let j = 1; j <= m; j++) {
                if (words1[i - 1] === words2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }

        // Backtrack to find diff
        const diff = [];
        let i = n, j = m;

        while (i > 0 || j > 0) {
            if (i > 0 && j > 0 && words1[i - 1] === words2[j - 1]) {
                diff.unshift({ type: 'unchanged', text: words1[i - 1] });
                i--;
                j--;
            } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
                diff.unshift({ type: 'added', text: words2[j - 1] });
                j--;
            } else if (i > 0) {
                diff.unshift({ type: 'removed', text: words1[i - 1] });
                i--;
            }
        }

        return diff;
    }

    function calculateStats(diff) {
        let additions = 0;
        let deletions = 0;
        let unchanged = 0;

        diff.forEach(item => {
            if (item.type === 'added') additions++;
            else if (item.type === 'removed') deletions++;
            else if (!item.text.match(/^\s+$/)) unchanged++; // Don't count whitespace
        });

        const totalChanges = additions + deletions;
        const totalWords = unchanged + Math.max(additions, deletions);
        const similarity = totalWords > 0 ? Math.round((unchanged / totalWords) * 100) : 100;

        return { additions, deletions, totalChanges, similarity };
    }

    function displayResults(diff, stats) {
        // Update stats
        totalChangesEl.textContent = stats.totalChanges;
        additionsEl.textContent = stats.additions;
        deletionsEl.textContent = stats.deletions;
        similarityEl.textContent = stats.similarity + '%';

        // Check if there are any differences
        if (stats.totalChanges === 0) {
            noDifferences.classList.remove('hidden');
            diffDisplay.classList.add('hidden');
        } else {
            noDifferences.classList.add('hidden');
            diffDisplay.classList.remove('hidden');

            // Render diff for Text 1 (showing what was removed/unchanged)
            const diff1Html = diff.map(item => {
                if (item.type === 'removed') {
                    return `<span class="diff-removed">${escapeHtml(item.text)}</span>`;
                } else if (item.type === 'unchanged') {
                    return `<span class="diff-unchanged">${escapeHtml(item.text)}</span>`;
                }
                return ''; // Don't show additions in Text 1 view
            }).join('');

            // Render diff for Text 2 (showing what was added/unchanged)
            const diff2Html = diff.map(item => {
                if (item.type === 'added') {
                    return `<span class="diff-added">${escapeHtml(item.text)}</span>`;
                } else if (item.type === 'unchanged') {
                    return `<span class="diff-unchanged">${escapeHtml(item.text)}</span>`;
                }
                return ''; // Don't show removals in Text 2 view
            }).join('');

            diff1El.innerHTML = diff1Html;
            diff2El.innerHTML = diff2Html;
        }
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter to compare
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            compareBtn.click();
        }
        
        // Ctrl/Cmd + K to clear
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            clearBtn.click();
        }
    });

    // Initialize word counts
    updateWordCounts();
});
