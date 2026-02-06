import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WordCounter from './pages/WordCounter';
import CaseConverter from './pages/CaseConverter';
import Contact from './pages/Contact';
import LegalPage from './pages/LegalPage';
import BlogPost from './pages/BlogPosts';
import LoremIpsum from './pages/LoremIpsum';
import TextDiff from './pages/TextDiff';
import BlogIndex from './pages/BlogIndex';

// --- ADD THIS COMPONENT ---
const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if ((window as any).gtag) {
      (window as any).gtag('config', 'G-P2JWKFVB39', {
        page_path: location.pathname,
      });
    }
  }, [location]);

  return null;
};

// --- FULL BLOG CONTENT ---
// Character Counter Guide content
const blogCharacterGuide = `
  <p>In today's digital world, character limits are everywhere. Whether you're crafting the perfect tweet, writing an Instagram caption, optimizing a meta description for SEO, or simply trying to stay within a text message limit, knowing how to count characters accurately is essential. A <strong>character counter</strong> is a simple yet powerful tool that helps you track every letter, number, space, and symbol in your text.</p>

  <p>This comprehensive guide covers everything you need to know about character counters in 2026, including how to use them effectively, character limits for all major platforms, and practical tips for writers, marketers, and social media managers.</p>

  <!-- CTA Box -->
  <div class="my-12 p-10 bg-indigo-50 rounded-[40px] border border-indigo-100 text-center">
    <h4 class="text-indigo-900 font-black text-2xl mb-4">Need to check social media character limits instantly?</h4>
    <p class="text-indigo-600 mb-8 font-medium">Our free character counter checks your text against all major platform limits in real-time.</p>
    <a href="/" class="inline-block bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200">
      Open VerboMetrics Character Counter
    </a>
  </div>

  <h2>What is a Character Counter?</h2>
  
  <p>A character counter is an online tool that automatically counts every character in your text, including letters, numbers, punctuation marks, spaces, and special symbols. Unlike a <a href="/">word counter</a> which counts words separated by spaces, a character counter provides a precise count of every single element in your text.</p>

  <p>Character counters are essential for:</p>
  <ul>
    <li><strong>Social media posts</strong> - Twitter, Instagram, Facebook, and LinkedIn all have character limits</li>
    <li><strong>SEO optimization</strong> - Meta descriptions and title tags have strict character limits</li>
    <li><strong>Text messaging</strong> - SMS messages are limited to 160 characters per message</li>
    <li><strong>Form inputs</strong> - Many online forms restrict character counts for usernames, descriptions, and comments</li>
    <li><strong>Professional writing</strong> - Bios, abstracts, and summaries often require specific character counts</li>
    <li><strong>Character-based billing</strong> - Translation and transcription services often charge per character</li>
  </ul>

  <h2>Character Counter vs Word Counter: What's the Difference?</h2>

  <p>While both tools measure text length, they serve different purposes:</p>

  <h3>Character Counter</h3>
  <p>A character counter counts <strong>every single element</strong> in your text:</p>
  <ul>
    <li>Letters (A, B, C, etc.)</li>
    <li>Numbers (1, 2, 3, etc.)</li>
    <li>Punctuation marks (., !, ?, etc.)</li>
    <li>Spaces between words</li>
    <li>Special symbols (@, #, $, etc.)</li>
    <li>Line breaks and tabs</li>
  </ul>

  <p><strong>Example:</strong> The text "Hello World!" contains 12 characters (including the space and exclamation mark).</p>

  <h3>Word Counter</h3>
  <p>A <a href="/">word counter</a> counts <strong>words separated by spaces</strong>:</p>
  <ul>
    <li>Groups of characters separated by spaces count as one word</li>
    <li>Punctuation is typically ignored</li>
    <li>Hyphenated words may count as one or two words depending on the tool</li>
  </ul>

  <p><strong>Example:</strong> The text "Hello World!" contains 2 words.</p>

  <div class="my-6 p-6 bg-yellow-50 rounded-2xl border border-yellow-200">
    <strong>Pro Tip:</strong> Use character counters for platforms with character limits (Twitter, meta descriptions) and word counters for platforms with word limits (academic essays, blog posts).
  </div>

  <h2>Social Media Character Limits: Complete 2026 Guide</h2>

  <p>Every social media platform has different character limits. Here's a comprehensive table of all major platforms and their restrictions in 2026:</p>

  <table class="w-full border-collapse border border-gray-300">
    <thead>
      <tr class="bg-gray-100">
        <th class="border border-gray-300 p-3 text-left">Platform</th>
        <th class="border border-gray-300 p-3 text-left">Content Type</th>
        <th class="border border-gray-300 p-3 text-left">Character Limit</th>
        <th class="border border-gray-300 p-3 text-left">Recommended Length</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="border border-gray-300 p-3"><strong>Twitter / X</strong></td>
        <td class="border border-gray-300 p-3">Tweet</td>
        <td class="border border-gray-300 p-3">280 characters</td>
        <td class="border border-gray-300 p-3">120-180 characters (best engagement)</td>
      </tr>
      <tr>
        <td class="border border-gray-300 p-3"><strong>Twitter / X</strong></td>
        <td class="border border-gray-300 p-3">Username</td>
        <td class="border border-gray-300 p-3">15 characters</td>
        <td class="border border-gray-300 p-3">6-12 characters</td>
      </tr>
      <tr>
        <td class="border border-gray-300 p-3"><strong>Twitter / X</strong></td>
        <td class="border border-gray-300 p-3">Bio</td>
        <td class="border border-gray-300 p-3">160 characters</td>
        <td class="border border-gray-300 p-3">120-160 characters</td>
      </tr>
      <tr>
        <td class="border border-gray-300 p-3"><strong>Instagram</strong></td>
        <td class="border border-gray-300 p-3">Caption</td>
        <td class="border border-gray-300 p-3">2,200 characters</td>
        <td class="border border-gray-300 p-3">138-150 characters (before "more")</td>
      </tr>
      <tr>
        <td class="border border-gray-300 p-3"><strong>Instagram</strong></td>
        <td class="border border-gray-300 p-3">Bio</td>
        <td class="border border-gray-300 p-3">150 characters</td>
        <td class="border border-gray-300 p-3">130-150 characters</td>
      </tr>
      <tr>
        <td class="border border-gray-300 p-3"><strong>Instagram</strong></td>
        <td class="border border-gray-300 p-3">Username</td>
        <td class="border border-gray-300 p-3">30 characters</td>
        <td class="border border-gray-300 p-3">6-20 characters</td>
      </tr>
      <tr>
        <td class="border border-gray-300 p-3"><strong>Facebook</strong></td>
        <td class="border border-gray-300 p-3">Post</td>
        <td class="border border-gray-300 p-3">63,206 characters</td>
        <td class="border border-gray-300 p-3">40-80 characters (best engagement)</td>
      </tr>
      <tr>
        <td class="border border-gray-300 p-3"><strong>Facebook</strong></td>
        <td class="border border-gray-300 p-3">About Section</td>
        <td class="border border-gray-300 p-3">255 characters</td>
        <td class="border border-gray-300 p-3">200-255 characters</td>
      </tr>
      <tr>
        <td class="border border-gray-300 p-3"><strong>LinkedIn</strong></td>
        <td class="border border-gray-300 p-3">Post</td>
        <td class="border border-gray-300 p-3">3,000 characters</td>
        <td class="border border-gray-300 p-3">1,300 characters (before "see more")</td>
      </tr>
      <tr>
        <td class="border border-gray-300 p-3"><strong>LinkedIn</strong></td>
        <td class="border border-gray-300 p-3">Headline</td>
        <td class="border border-gray-300 p-3">220 characters</td>
        <td class="border border-gray-300 p-3">120-180 characters</td>
      </tr>
      <tr>
        <td class="border border-gray-300 p-3"><strong>LinkedIn</strong></td>
        <td class="border border-gray-300 p-3">Summary</td>
        <td class="border border-gray-300 p-3">2,600 characters</td>
        <td class="border border-gray-300 p-3">1,000-2,000 characters</td>
      </tr>
      <tr>
        <td class="border border-gray-300 p-3"><strong>YouTube</strong></td>
        <td class="border border-gray-300 p-3">Title</td>
        <td class="border border-gray-300 p-3">100 characters</td>
        <td class="border border-gray-300 p-3">60-70 characters (fully visible)</td>
      </tr>
      <tr>
        <td class="border border-gray-300 p-3"><strong>YouTube</strong></td>
        <td class="border border-gray-300 p-3">Description</td>
        <td class="border border-gray-300 p-3">5,000 characters</td>
        <td class="border border-gray-300 p-3">150-200 characters (above fold)</td>
      </tr>
      <tr>
        <td class="border border-gray-300 p-3"><strong>TikTok</strong></td>
        <td class="border border-gray-300 p-3">Caption</td>
        <td class="border border-gray-300 p-3">2,200 characters</td>
        <td class="border border-gray-300 p-3">100-150 characters</td>
      </tr>
      <tr>
        <td class="border border-gray-300 p-3"><strong>TikTok</strong></td>
        <td class="border border-gray-300 p-3">Bio</td>
        <td class="border border-gray-300 p-3">80 characters</td>
        <td class="border border-gray-300 p-3">60-80 characters</td>
      </tr>
      <tr>
        <td class="border border-gray-300 p-3"><strong>Pinterest</strong></td>
        <td class="border border-gray-300 p-3">Pin Description</td>
        <td class="border border-gray-300 p-3">500 characters</td>
        <td class="border border-gray-300 p-3">100-200 characters</td>
      </tr>
      <tr>
        <td class="border border-gray-300 p-3"><strong>Reddit</strong></td>
        <td class="border border-gray-300 p-3">Title</td>
        <td class="border border-gray-300 p-3">300 characters</td>
        <td class="border border-gray-300 p-3">50-150 characters</td>
      </tr>
      <tr>
        <td class="border border-gray-300 p-3"><strong>Snapchat</strong></td>
        <td class="border border-gray-300 p-3">Caption</td>
        <td class="border border-gray-300 p-3">250 characters</td>
        <td class="border border-gray-300 p-3">80-150 characters</td>
      </tr>
      <tr>
        <td class="border border-gray-300 p-3"><strong>WhatsApp</strong></td>
        <td class="border border-gray-300 p-3">Status</td>
        <td class="border border-gray-300 p-3">700 characters</td>
        <td class="border border-gray-300 p-3">200-400 characters</td>
      </tr>
      <tr>
        <td class="border border-gray-300 p-3"><strong>SMS</strong></td>
        <td class="border border-gray-300 p-3">Text Message</td>
        <td class="border border-gray-300 p-3">160 characters (single)</td>
        <td class="border border-gray-300 p-3">120-160 characters</td>
      </tr>
      <tr>
        <td class="border border-gray-300 p-3"><strong>Email</strong></td>
        <td class="border border-gray-300 p-3">Subject Line</td>
        <td class="border border-gray-300 p-3">No hard limit</td>
        <td class="border border-gray-300 p-3">40-60 characters (mobile friendly)</td>
      </tr>
    </tbody>
  </table>

  <div class="my-6 p-6 bg-yellow-50 rounded-2xl border border-yellow-200">
    <strong>Important Note:</strong> Character limits can change! Social media platforms occasionally update their limits. Always check the current limit on the platform before posting, or use our <a href="/">free character counter</a> which includes real-time limit checking.
  </div>

  <h2>How to Count Characters in Different Applications</h2>

  <p>Depending on what you're working on, there are several ways to count characters. Here's how to do it in the most popular applications:</p>

  <h3>How to Count Characters in Google Docs</h3>
  <ol>
    <li><strong>Method 1 - Word Count Tool:</strong>
      <ul>
        <li>Click on "Tools" in the menu bar</li>
        <li>Select "Word count" or press Ctrl+Shift+C (Windows) or Cmd+Shift+C (Mac)</li>
        <li>A popup will show words, characters (with spaces), and characters (without spaces)</li>
      </ul>
    </li>
    <li><strong>Method 2 - Display Word Count:</strong>
      <ul>
        <li>Go to Tools → Word count</li>
        <li>Check "Display word count while typing"</li>
        <li>Character count will appear at the bottom left of your document</li>
      </ul>
    </li>
    <li><strong>Method 3 - Highlight Text:</strong>
      <ul>
        <li>Highlight specific text you want to count</li>
        <li>Use Ctrl+Shift+C to see character count for just that selection</li>
      </ul>
    </li>
  </ol>

  <h3>How to Count Characters in Microsoft Word</h3>
  <ol>
    <li>Click "Review" tab in the ribbon</li>
    <li>Click "Word Count" in the Proofing group</li>
    <li>View "Characters (with spaces)" and "Characters (no spaces)"</li>
    <li><strong>Keyboard shortcut:</strong> Ctrl+Shift+G (Windows) or Cmd+Shift+G (Mac)</li>
  </ol>

  <p><strong>Pro Tip:</strong> Enable "Show word count in status bar" to see live character counts as you type.</p>

  <h3>How to Count Characters on iPhone</h3>
  <ol>
    <li>Type your text in Notes app or any text field</li>
    <li>Select all text (tap and hold, then choose "Select All")</li>
    <li>Tap "Copy" or look for character count in the selection menu</li>
    <li><strong>Alternative:</strong> Use our <a href="/">VerboMetrics character counter</a> in Safari - it's mobile-optimized!</li>
  </ol>

  <h3>How to Count Characters on Android</h3>
  <ol>
    <li>Open your text in any app</li>
    <li>Long-press to select text</li>
    <li>Some keyboards (like Gboard) show character count when text is selected</li>
    <li><strong>Alternative:</strong> Use our web-based <a href="/">character counter</a> in Chrome</li>
  </ol>

  <!-- CTA Box -->
  <div class="my-12 p-10 bg-indigo-50 rounded-[40px] border border-indigo-100 text-center">
    <h4 class="text-indigo-900 font-black text-2xl mb-4">Skip the manual counting!</h4>
    <p class="text-indigo-600 mb-8 font-medium">Get instant character counts for any text, anywhere. Works on all devices.</p>
    <a href="/" class="inline-block bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200">
      Use Free Character Counter
    </a>
  </div>

  <h3>How to Count Characters Online (Easiest Method)</h3>
  <ol>
    <li>Visit <a href="/">VerboMetrics.com</a></li>
    <li>Type or paste your text into the text area</li>
    <li>See instant character count (with and without spaces)</li>
    <li>Check if your text fits social media limits</li>
    <li>No installation or signup required!</li>
  </ol>

  <h2>Why Character Limits Matter for SEO</h2>

  <p>Character limits aren't just for social media - they're crucial for search engine optimization (SEO) too. Here's why:</p>

  <h3>Meta Description Character Limit</h3>
  <p>Meta descriptions should be <strong>150-160 characters</strong> to display fully in Google search results. Longer descriptions get truncated with "..." which can reduce click-through rates.</p>

  <p><strong>Example of a good meta description:</strong></p>
  <div class="my-6 p-6 bg-gray-100 rounded-2xl">
    "Free online character counter. Count characters, words, and sentences instantly. Check social media limits for Twitter, Instagram, and more. No signup required."
    <br><br>
    <em>Length: 159 characters ✓</em>
  </div>

  <h3>Title Tag Character Limit</h3>
  <p>Title tags should be <strong>50-60 characters</strong> to display fully in search results. Google typically displays the first 50-60 characters of a title tag.</p>

  <p><strong>Example of a good title tag:</strong></p>
  <div class="my-6 p-6 bg-gray-100 rounded-2xl">
    "Free Character Counter - Count Characters Online"
    <br><br>
    <em>Length: 49 characters ✓</em>
  </div>

  <h3>URL Length</h3>
  <p>While there's no hard character limit for URLs, shorter is better for SEO. Keep URLs under <strong>60-80 characters</strong> for optimal results.</p>

  <h2>Best Practices for Using Character Counters</h2>

  <h3>1. Count Before You Post</h3>
  <p>Always check character count before posting on social media. Going over the limit can result in cut-off text or failed posts.</p>

  <h3>2. Optimize for "Above the Fold"</h3>
  <p>Even if platforms allow longer text, users often only see the first 100-150 characters before clicking "see more." Make those first characters count!</p>

  <h3>3. Include Spaces in Your Count</h3>
  <p>Most platforms count spaces as characters. Always use "characters with spaces" when checking limits.</p>

  <h3>4. Test Your Text</h3>
  <p>Different character counters might count emojis and special characters differently. Test your actual post on the platform to be sure.</p>

  <h3>5. Leave Room for Hashtags</h3>
  <p>If you're adding hashtags, account for them in your character count. Instagram hashtags count toward the 2,200 character limit.</p>

  <h3>6. Use Line Breaks Wisely</h3>
  <p>Line breaks and paragraph spacing count as characters. Use them strategically to improve readability without wasting character space.</p>

  <h2>Common Character Counting Mistakes to Avoid</h2>

  <ul>
    <li><strong>Forgetting to count spaces:</strong> Spaces are characters! "Hello World" is 11 characters, not 10.</li>
    <li><strong>Ignoring special characters:</strong> Emojis, symbols, and punctuation all count as characters.</li>
    <li><strong>Not checking platform-specific limits:</strong> What works on Facebook won't work on Twitter.</li>
    <li><strong>Writing to the exact limit:</strong> Leave a few characters as buffer in case of formatting differences.</li>
    <li><strong>Copying from formatted documents:</strong> Hidden formatting characters may increase your count.</li>
    <li><strong>Not testing mobile view:</strong> Character limits may display differently on mobile devices.</li>
  </ul>

  <h2>Character Counter Tools: Free vs Paid</h2>

  <h3>Free Character Counters (Like VerboMetrics)</h3>
  <p><strong>Pros:</strong></p>
  <ul>
    <li>No cost - use as much as you want</li>
    <li>No signup or registration required</li>
    <li>Instant results</li>
    <li>Works in any web browser</li>
    <li>Often include extra features (word count, reading time)</li>
    <li>Privacy-focused (text processed in browser)</li>
  </ul>

  <p><strong>Cons:</strong></p>
  <ul>
    <li>May include ads (to keep service free)</li>
    <li>Limited features compared to paid tools</li>
    <li>No cloud storage for your counts</li>
  </ul>

  <h3>Paid Character Counters</h3>
  <p><strong>Pros:</strong></p>
  <ul>
    <li>No ads</li>
    <li>Advanced features (historical tracking, API access)</li>
    <li>Priority support</li>
    <li>Integration with other tools</li>
  </ul>

  <p><strong>Cons:</strong></p>
  <ul>
    <li>Monthly or yearly subscription costs</li>
    <li>Often overkill for basic character counting needs</li>
    <li>Require account creation</li>
  </ul>

  <p><strong>Verdict:</strong> For most users, a free character counter like VerboMetrics is more than sufficient. You get accurate counting, platform limit checking, and additional text analysis tools at zero cost.</p>

  <!-- CTA Box -->
  <div class="my-12 p-10 bg-indigo-50 rounded-[40px] border border-indigo-100 text-center">
    <h4 class="text-indigo-900 font-black text-2xl mb-4">Ready to optimize your content?</h4>
    <p class="text-indigo-600 mb-8 font-medium">Get instant character counts plus word count, reading time, and more.</p>
    <a href="/" class="inline-block bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200">
      Try VerboMetrics Now - Free
    </a>
  </div>

  <h2>Frequently Asked Questions (FAQ)</h2>

  <div class="my-6 p-6 bg-blue-50 rounded-2xl border border-blue-200">
    <h3>How many characters are allowed in a tweet in 2026?</h3>
    <p>Twitter (now called X) allows 280 characters per tweet in 2026. This limit was increased from 140 characters in 2017. However, engagement is often best for tweets between 120-180 characters, as they're more likely to be read fully and retweeted.</p>
  </div>

  <div class="my-6 p-6 bg-blue-50 rounded-2xl border border-blue-200">
    <h3>Do spaces count as characters?</h3>
    <p>Yes, spaces count as characters in all character counting tools and on all social media platforms. For example, "Hello World" contains 11 characters (5 + 1 space + 5). Some tools show both "characters with spaces" and "characters without spaces" for flexibility.</p>
  </div>

  <div class="my-6 p-6 bg-blue-50 rounded-2xl border border-blue-200">
    <h3>What's the difference between character count and word count?</h3>
    <p>Character count includes every letter, number, space, and punctuation mark. Word count only counts groups of characters separated by spaces. For example, "Hello World!" is 12 characters but only 2 words. Use character count for social media and SEO; use word count for essays and articles.</p>
  </div>

  <div class="my-6 p-6 bg-blue-50 rounded-2xl border border-blue-200">
    <h3>How do I count characters in an Instagram caption?</h3>
    <p>Instagram captions can be up to 2,200 characters long. To count characters: copy your caption, paste it into a character counter tool like VerboMetrics, and check the count. Remember that only the first 125-150 characters show before the "more" button, so front-load important information.</p>
  </div>

  <div class="my-6 p-6 bg-blue-50 rounded-2xl border border-blue-200">
    <h3>Do emojis count as one character?</h3>
    <p>It depends on the platform! On Twitter, most emojis count as 2 characters. On Instagram, emojis typically count as 1-2 characters. In SMS, emojis can count as multiple characters or even force your message into a different encoding that reduces the total limit. Always test with a character counter before posting.</p>
  </div>

  <div class="my-6 p-6 bg-blue-50 rounded-2xl border border-blue-200">
    <h3>What is the ideal length for a meta description?</h3>
    <p>The ideal meta description length is 150-160 characters. Google typically displays up to 160 characters in search results on desktop and about 120 characters on mobile. Longer meta descriptions will be cut off with "..." which can reduce click-through rates.</p>
  </div>

  <div class="my-6 p-6 bg-blue-50 rounded-2xl border border-blue-200">
    <h3>How many characters fit in a single SMS text message?</h3>
    <p>A single SMS text message can contain 160 characters using standard GSM encoding. If you include special characters or emojis, the limit drops to 70 characters. Messages longer than these limits are automatically split into multiple texts. Modern smartphones usually combine these for you, but recipients may still receive them separately.</p>
  </div>

  <h2>Conclusion: Why Every Writer Needs a Character Counter</h2>

  <p>Whether you're a social media manager, content writer, SEO specialist, or student, a reliable character counter is an essential tool in your digital toolkit. Understanding character limits helps you:</p>

  <ul>
    <li>Create platform-appropriate content that doesn't get cut off</li>
    <li>Optimize posts for maximum engagement and visibility</li>
    <li>Stay within SEO best practices for meta descriptions and title tags</li>
    <li>Save time by checking character counts before posting</li>
    <li>Avoid the frustration of rewriting content that's too long</li>
    <li>Professional polish to your writing and social media presence</li>
  </ul>

  <p>With character limits constantly evolving across platforms, having quick access to an accurate character counter has never been more important. VerboMetrics provides a free, reliable solution that helps you count characters instantly, check platform limits, and optimize your content - all without leaving your browser.</p>

  <!-- CTA Box -->
  <div class="my-12 p-10 bg-indigo-50 rounded-[40px] border border-indigo-100 text-center">
    <h4 class="text-indigo-900 font-black text-2xl mb-4">Stop guessing, start counting!</h4>
    <p class="text-indigo-600 mb-8 font-medium">Join thousands of writers who use VerboMetrics to perfect their content.</p>
    <a href="/" class="inline-block bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200">
      Open Free Character Counter
    </a>
  </div>

  <hr class="my-12 border-t border-gray-300">

  <h3>Related Tools & Articles</h3>
  <ul>
    <li><a href="/">Free Word Counter Tool</a> - Count words, sentences, and paragraphs</li>
    <li><a href="/case-converter.html">Case Converter</a> - Change text to uppercase, lowercase, title case</li>
    <li><a href="/lorem-ipsum.html">Lorem Ipsum Generator</a> - Generate placeholder text</li>
  </ul>

  <p><em>Last updated: January 14, 2026</em></p>
`;

// Google Docs Guide content - Cleaned up with proper HTML structure
const blogGoogleDocs = `
<div class="blog-content">
  <p>Google Docs is one of the most popular word processors in the world, used by millions of students, professionals, and writers daily. Whether you're working on an essay, report, blog post, or novel, knowing your exact word count is essential. This comprehensive guide shows you three simple methods to <strong>count words in Google Docs</strong>, including time-saving keyboard shortcuts and hidden features most users don't know about.</p>

  <p>By the end of this tutorial, you'll be able to check word counts instantly, display live word counts while you type, and count specific sections of your document - all without leaving your keyboard.</p>

  <div class="my-12 p-10 bg-indigo-50 rounded-[40px] border border-indigo-100 text-center">
    <h4 class="text-indigo-900 font-black text-2xl mb-4">Google Docs is great, but for deep analysis, you need a professional suite.</h4>
    <p class="text-indigo-600 mb-8 font-medium">Get word count, character count, reading time, and keyword density all in one place.</p>
    <a href="/" class="inline-block bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200">
      Open VerboMetrics Word Counter
    </a>
  </div>

  <h2>Why Word Count Matters in Google Docs</h2>
  
  <p>Before diving into the how-to, let's understand why word count is important:</p>
  
  <ul>
    <li><strong>Academic requirements:</strong> Essays and research papers have strict word count limits</li>
    <li><strong>Content writing:</strong> Blog posts need optimal lengths for SEO (typically 1,500-2,500 words)</li>
    <li><strong>Professional documents:</strong> Reports and proposals often have word count guidelines</li>
    <li><strong>Editing efficiency:</strong> Track your progress and stay within target lengths</li>
    <li><strong>Billing purposes:</strong> Freelance writers often charge per word</li>
    <li><strong>Reading time estimates:</strong> Calculate how long content takes to read</li>
  </ul>

  <span class="method-header">Method 1</span>
  <h3>Use the Word Count Menu (Most Common)</h3>
  
  <div class="method-card">
    <h4>📊 Tools Menu Method</h4>
    
    <p>This is the most straightforward way to check your word count in Google Docs. It works on both desktop and mobile versions.</p>
    
    <ul class="steps-list">
      <li>Open your Google Docs document</li>
      <li>Click on <strong>"Tools"</strong> in the top menu bar</li>
      <li>Select <strong>"Word count"</strong> from the dropdown menu</li>
      <li>A popup window will appear showing:
        <ul class="nested-list">
          <li>Pages</li>
          <li>Words</li>
          <li>Characters (with spaces)</li>
          <li>Characters (excluding spaces)</li>
        </ul>
      </li>
      <li>Click <strong>"OK"</strong> to close the window</li>
    </ul>
    
    <div class="pro-tip">
      <strong>💡 Pro Tip:</strong> The word count popup stays on top of your document, so you can move it aside and continue writing while monitoring your word count!
    </div>
  </div>

  <span class="method-header">Method 2</span>
  <h3>Keyboard Shortcuts (Fastest Method)</h3>
  
  <div class="method-card">
    <h4>⌨️ Keyboard Shortcut Method</h4>
    
    <p>This is the quickest way to check word count without touching your mouse. Perfect for writers who want to stay in the flow.</p>
    
    <h5>For Windows/Chromebook:</h5>
    <div class="keyboard-shortcut">
      <kbd>Ctrl</kbd>
      <span>+</span>
      <kbd>Shift</kbd>
      <span>+</span>
      <kbd>C</kbd>
    </div>
    
    <h5>For Mac:</h5>
    <div class="keyboard-shortcut">
      <kbd>Cmd</kbd>
      <span>+</span>
      <kbd>Shift</kbd>
      <span>+</span>
      <kbd>C</kbd>
    </div>
    
    <p>Simply press these keys together while your document is open, and the word count popup will appear instantly!</p>
    
    <div class="highlight-box">
      <strong>Remember:</strong> "C" stands for "Count" - an easy way to memorize this shortcut!
    </div>
  </div>

  <span class="method-header">Method 3</span>
  <h3>Enable Live Word Count Display (Most Convenient)</h3>
  
  <div class="method-card">
    <h4>📺 Live Word Count Display Method</h4>
    
    <p>This is the most convenient method for writers who need to constantly monitor their word count. Once enabled, Google Docs displays your word count at the bottom of the screen in real-time.</p>
    
    <ol>
      <li>Open the word count popup using either:
        <ul class="nested-list">
          <li>Tools → Word count, OR</li>
          <li>Keyboard shortcut (Ctrl/Cmd + Shift + C)</li>
        </ul>
      </li>
      <li>Look for the checkbox that says <strong>"Display word count while typing"</strong></li>
      <li>Check this box to enable live word count</li>
      <li>Click "OK" to close the popup</li>
      <li>You'll now see your word count in the bottom-left corner of your screen</li>
    </ol>
    
    <p>The live word count updates automatically as you type, delete, or paste text. Click on it at any time to see the full statistics popup.</p>
    
    <div class="pro-tip">
      <strong>💡 Pro Tip:</strong> The live word count display remains active even after you close and reopen the document, so you only need to enable it once!
    </div>
  </div>

  <div class="my-12 p-10 bg-indigo-50 rounded-[40px] border border-indigo-100 text-center">
    <h4 class="text-indigo-900 font-black text-2xl mb-4">Need more than just word count?</h4>
    <p class="text-indigo-600 mb-8 font-medium">Get reading time, speaking time, character count, and more with our professional tool.</p>
    <a href="/" class="inline-block bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200">
      Try Advanced Word Analysis
    </a>
  </div>

  <h2>Bonus: How to Count Words in a Specific Section</h2>

  <p>Sometimes you don't need the total word count - you just want to count a specific paragraph, page, or section. Here's how:</p>

  <ol>
    <li><strong>Select the text</strong> you want to count by clicking and dragging</li>
    <li><strong>Use the keyboard shortcut</strong> Ctrl/Cmd + Shift + C</li>
    <li>The word count popup will show statistics for <strong>only the selected text</strong></li>
  </ol>

  <p>This is incredibly useful for:</p>
  <ul>
    <li>Checking if a single paragraph is too long</li>
    <li>Counting words in a specific chapter or section</li>
    <li>Verifying quote lengths</li>
    <li>Ensuring individual sections meet requirements</li>
  </ul>

  <div class="highlight-box">
    <strong>Quick Tip:</strong> Press Ctrl/Cmd + A to select all text, then use the word count shortcut - this achieves the same result as checking the total document word count!
  </div>

  <h2>Understanding Google Docs Word Count Statistics</h2>

  <p>When you open the word count popup in Google Docs, you'll see four different metrics. Here's what each means:</p>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Metric</th>
        <th>What It Counts</th>
        <th>When to Use</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Pages</strong></td>
        <td>Total number of pages in your document</td>
        <td>Checking if you've met page length requirements</td>
      </tr>
      <tr>
        <td><strong>Words</strong></td>
        <td>Total words separated by spaces</td>
        <td>Most common metric for essays, articles, and assignments</td>
      </tr>
      <tr>
        <td><strong>Characters (with spaces)</strong></td>
        <td>Every letter, number, punctuation, and space</td>
        <td>Social media posts, SMS messages, translations</td>
      </tr>
      <tr>
        <td><strong>Characters (no spaces)</strong></td>
        <td>Only letters, numbers, and punctuation</td>
        <td>Some academic or translation requirements</td>
      </tr>
    </tbody>
  </table>

  <h2>Google Docs Word Count vs Other Word Processors</h2>

  <p>Different word processors may count words slightly differently. Here's how Google Docs compares:</p>

  <h3>Google Docs vs Microsoft Word</h3>
  <ul>
    <li><strong>Word counting method:</strong> Both count words the same way (text separated by spaces)</li>
    <li><strong>Hyphenated words:</strong> Both count "twenty-one" as one word</li>
    <li><strong>Numbers:</strong> Both count "123" as one word</li>
    <li><strong>Contractions:</strong> Both count "don't" as one word</li>
    <li><strong>Result:</strong> Word counts should match within 1-2 words</li>
  </ul>

  <h3>Google Docs vs Online Word Counters</h3>
  <p>Most online word counters (like <a href="/">VerboMetrics</a>) use the same counting logic as Google Docs and Microsoft Word, so results should be virtually identical. The advantage of online tools is you can count words from any source, not just Google Docs.</p>

  <h2>Common Google Docs Word Count Questions</h2>

  <div class="faq-item">
    <div class="faq-question">Does Google Docs count footnotes and endnotes?</div>
    <p>No, Google Docs does NOT include footnotes or endnotes in the word count. If you need to include these, you'll need to manually add them to your count or use a workaround like copying everything (including notes) into a separate document to count.</p>
  </div>

  <div class="faq-item">
    <div class="faq-question">Does Google Docs count headers and footers?</div>
    <p>No, text in headers and footers is excluded from the word count. This is standard behavior across most word processors.</p>
  </div>

  <div class="faq-item">
    <div class="faq-question">Does Google Docs count text in tables?</div>
    <p>Yes! Text inside tables IS included in the word count. This includes all cells in all tables throughout your document.</p>
  </div>

  <div class="faq-item">
    <div class="faq-question">Does Google Docs count words in comments?</div>
    <p>No, comments and suggestions are not included in the word count. Only the actual document text counts.</p>
  </div>

  <div class="faq-item">
    <div class="faq-question">Does Google Docs count text boxes?</div>
    <p>Yes, text in text boxes (inserted via Insert → Drawing → Text box) is included in the word count.</p>
  </div>

  <div class="faq-item">
    <div class="faq-question">Can I see word count on Google Docs mobile app?</div>
    <p>Yes! On the mobile app:</p>
    <ul>
      <li>Tap the three-dot menu (⋮) in the top-right corner</li>
      <li>Select "Word count"</li>
      <li>View your statistics</li>
    </ul>
  </div>

  <div class="faq-item">
    <div class="faq-question">Why is my Google Docs word count different from Microsoft Word?</div>
    <p>Small differences (1-5 words) are normal due to how each program handles:</p>
    <ul>
      <li>Em dashes vs hyphens</li>
      <li>Special characters</li>
      <li>Line breaks vs paragraph breaks</li>
      <li>Hidden formatting</li>
    </ul>
    <p>If the difference is larger than 5 words, copy your text into an online word counter to verify.</p>
  </div>

  <h2>Pro Tips for Google Docs Word Count</h2>

  <div class="tip-grid">
    <div class="tip-card">
      <h4>Tip 1: Custom Menu Shortcut</h4>
      <p>Create a custom menu shortcut by going to Tools → Preferences and adding word count to your toolbar for one-click access.</p>
    </div>
    
    <div class="tip-card">
      <h4>Tip 2: Conditional Formatting</h4>
      <p>Use Google Apps Script to automatically highlight your document when you exceed a target word count.</p>
    </div>
    
    <div class="tip-card">
      <h4>Tip 3: Refresh Shortcut</h4>
      <p>Press Ctrl/Cmd + Shift + C repeatedly to refresh the word count without closing the popup - useful when collaborating in real-time.</p>
    </div>
    
    <div class="tip-card">
      <h4>Tip 4: Verify Important Submissions</h4>
      <p>For academic papers, always copy your final version into Microsoft Word or an online word counter to verify the count matches before submission.</p>
    </div>
    
    <div class="tip-card">
      <h4>Tip 5: Exclude References</h4>
      <p>If you need to exclude certain sections from your word count (like references), copy just the sections you want to count into a temporary document.</p>
    </div>
  </div>

  <div class="my-12 p-10 bg-indigo-50 rounded-[40px] border border-indigo-100 text-center">
    <h4 class="text-indigo-900 font-black text-2xl mb-4">Save time with automatic tracking</h4>
    <p class="text-indigo-600 mb-8 font-medium">Our word counter updates in real-time as you type - no need to click anything.</p>
    <a href="/" class="inline-block bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200">
      Try Real-Time Word Counter
    </a>
  </div>

  <h2>Troubleshooting Google Docs Word Count Issues</h2>

  <h3>Word count not updating?</h3>
  <ul>
    <li>Close and reopen the word count popup</li>
    <li>Refresh your browser (F5 or Ctrl/Cmd + R)</li>
    <li>Check your internet connection - Google Docs requires connectivity</li>
    <li>Try using an incognito/private window</li>
  </ul>

  <h3>Live word count not showing?</h3>
  <ul>
    <li>Re-enable "Display word count while typing" in the word count popup</li>
    <li>Check your zoom level - word count may be cut off if zoomed in too much</li>
    <li>Try switching to a different view (Print layout vs Pageless)</li>
  </ul>

  <h3>Word count seems incorrect?</h3>
  <ul>
    <li>Check if you have hidden text or formatting</li>
    <li>Look for extra spaces or line breaks</li>
    <li>Verify text in text boxes and tables is being counted</li>
    <li>Use the <a href="/">VerboMetrics word counter</a> as a second opinion</li>
  </ul>

  <h2>Alternative Ways to Count Words</h2>

  <p>While Google Docs has excellent built-in word counting, here are alternative methods:</p>

  <h3>1. Copy to Online Word Counter</h3>
  <ol>
    <li>Select all text (Ctrl/Cmd + A)</li>
    <li>Copy (Ctrl/Cmd + C)</li>
    <li>Visit <a href="/">VerboMetrics.com</a></li>
    <li>Paste (Ctrl/Cmd + V)</li>
    <li>See instant word count plus additional statistics</li>
  </ol>
  <p><strong>Advantage:</strong> Get extra stats like reading time, speaking time, and keyword density.</p>

  <h3>2. Download as Microsoft Word</h3>
  <ol>
    <li>File → Download → Microsoft Word (.docx)</li>
    <li>Open in Microsoft Word</li>
    <li>View word count in the status bar</li>
  </ol>
  <p><strong>Advantage:</strong> Verify word count matches for important submissions.</p>

  <h3>3. Use Google Apps Script</h3>
  <p>Advanced users can create custom functions to automatically track word count over time or set up alerts when reaching targets. This requires some coding knowledge but offers powerful automation.</p>

  <div class="my-12 p-10 bg-indigo-50 rounded-[40px] border border-indigo-100 text-center">
    <h4 class="text-indigo-900 font-black text-2xl mb-4">Need More Text Analysis Tools?</h4>
    <p class="text-indigo-600 mb-8 font-medium">Check out our free suite of text tools including case converter and text diff.</p>
    <a href="/" class="inline-block bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200">
      Explore All Tools
    </a>
  </div>

  <h2>Conclusion: Master Google Docs Word Count</h2>

  <p>You now know three easy methods to count words in Google Docs:</p>

  <ol>
    <li><strong>Tools Menu:</strong> Click Tools → Word count</li>
    <li><strong>Keyboard Shortcut:</strong> Press Ctrl/Cmd + Shift + C</li>
    <li><strong>Live Display:</strong> Enable "Display word count while typing"</li>
  </ol>

  <p>For most users, enabling the live word count display (Method 3) provides the best experience - you can see your word count update in real-time without interrupting your writing flow.</p>

  <p><strong>Key takeaways:</strong></p>
  <ul>
    <li>Use Ctrl/Cmd + Shift + C for instant word counts</li>
    <li>Enable live display for real-time monitoring</li>
    <li>Select specific text to count individual sections</li>
    <li>Google Docs doesn't count headers, footers, or comments</li>
    <li>Word counts should match Microsoft Word within a few words</li>
    <li>Verify important submissions with a second tool</li>
  </ul>

  <div class="my-12 p-10 bg-indigo-50 rounded-[40px] border border-indigo-100 text-center">
    <h4 class="text-indigo-900 font-black text-2xl mb-4">Ready to supercharge your writing?</h4>
    <p class="text-indigo-600 mb-8 font-medium">Get all the tools you need to write better, faster, and smarter.</p>
    <a href="/" class="inline-block bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200">
      Start Using VerboMetrics
    </a>
  </div>

  <hr style="margin: 3rem 0; border: none; border-top: 1px solid #e5e7eb;">

  <h3>Related Articles</h3>
  <ul>
    <li><a href="/blog/character-counter-guide.html">Character Counter: Everything You Need to Know in 2026</a></li>
    <li><a href="/blog/word-count-requirements.html">Word Count Requirements: Complete Guide for Students</a></li>
    <li><a href="/">Free Word Counter Tool</a> - Count words, characters, and sentences</li>
  </ul>

  <p><em>Last updated: January 28, 2026</em></p>
</div>
`;

// Word Count Requirements content (truncated for brevity, add full content)
const blogRequirements = `
  <p>One of the most common questions students ask is: "How many words should my essay be?" Whether you're writing a high school essay, college admission essay, or graduate-level research paper, understanding <strong>word count requirements</strong> is essential for academic success. This comprehensive guide breaks down exact word count expectations for every type of academic writing, along with proven strategies to meet your target without padding or cutting important content.</p>

  <p>If you've ever struggled to reach a minimum word count or had to drastically cut down an essay that's too long, you're not alone. Learning to write to specific word counts is a skill that improves with practice - and this guide will help you master it.</p>

  <!-- CTA Box -->
  <div class="my-12 p-10 bg-indigo-50 rounded-[40px] border border-indigo-100 text-center">
    <h4 class="text-indigo-900 font-black text-2xl mb-4">Track your essay progress in real-time</h4>
    <p class="text-indigo-600 mb-8 font-medium">Our free word counter helps you stay on target with live word count updates.</p>
    <a href="/" class="inline-block bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200">
      Open Essay Word Counter
    </a>
  </div>

  <h2>Why Word Count Requirements Matter</h2>
  
  <p>Professors and teachers set word count requirements for important pedagogical reasons:</p>
  
  <ul>
    <li><strong>Ensures adequate depth:</strong> A 500-word essay requires you to cover a topic thoroughly, not just scratch the surface</li>
    <li><strong>Teaches conciseness:</strong> Maximum word limits force you to be precise and eliminate fluff</li>
    <li><strong>Fair grading standards:</strong> Word counts ensure all students write comparable amounts of content</li>
    <li><strong>Develops discipline:</strong> Learning to write to specific lengths is a valuable professional skill</li>
    <li><strong>Time management:</strong> Word counts help professors gauge how long assignments should take</li>
  </ul>

  <h2>Word Count Requirements by Education Level</h2>

  <h3>Elementary School (Grades 1-5)</h3>

  <table class="w-full border-collapse border border-gray-300">
    <thead>
      <tr class="bg-gray-100">
        <th class="border border-gray-300 p-3 text-left">Grade Level</th>
        <th class="border border-gray-300 p-3 text-left">Assignment Type</th>
        <th class="border border-gray-300 p-3 text-left">Typical Word Count</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="border border-gray-300 p-3">1st-2nd Grade</td>
        <td class="border border-gray-300 p-3">Simple paragraphs</td>
        <td class="border border-gray-300 p-3">50-100 words</td>
      </tr>
      <tr>
        <td class="border border-gray-300 p-3">3rd-4th Grade</td>
        <td class="border border-gray-300 p-3">Short essays</td>
        <td class="border border-gray-300 p-3">200-400 words</td>
      </tr>
      <tr>
        <td class="border border-gray-300 p-3">5th Grade</td>
        <td class="border border-gray-300 p-3">Essays and reports</td>
        <td class="border border-gray-300 p-3">300-500 words</td>
      </tr>
    </tbody>
  </table>

  <h3>Middle School (Grades 6-8)</h3>

  <table class="w-full border-collapse border border-gray-300">
    <thead>
      <tr class="bg-gray-100">
        <th class="border border-gray-300 p-3 text-left">Assignment Type</th>
        <th class="border border-gray-300 p-3 text-left">Word Count Range</th>
        <th class="border border-gray-300 p-3 text-left">Pages (Double-Spaced)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="border border-gray-300 p-3">Short essays</td>
        <td class="border border-gray-300 p-3">400-700 words</td>
        <td class="border border-gray-300 p-3">1.5-3 pages</td>
      </tr>
      <tr>
        <td class="border border-gray-300 p-3">Standard essays</td>
        <td class="border border-gray-300 p-3">700-1,000 words</td>
        <td class="border border-gray-300 p-3">3-4 pages</td>
      </tr>
      <tr>
        <td class="border border-gray-300 p-3">Extended essays</td>
        <td class="border border-gray-300 p-3">1,000-1,500 words</td>
        <td class="border border-gray-300 p-3">4-6 pages</td>
      </tr>
      <tr>
        <td class="border border-gray-300 p-3">Research papers</td>
        <td class="border border-gray-300 p-3">1,500-2,000 words</td>
        <td class="border border-gray-300 p-3">6-8 pages</td>
      </tr>
    </tbody>
  </table>

  <h3>High School (Grades 9-12)</h3>

  <table class="w-full border-collapse border border-gray-300">
    <thead>
      <tr class="bg-gray-100">
        <th class="border border-gray-300 p-3 text-left">Assignment Type</th>
        <th class="border border-gray-300 p-3 text-left">Word Count Range</th>
        <th class="border border-gray-300 p-3 text-left">Pages (Double-Spaced)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="border border-gray-300 p-3">In-class essays</td>
        <td class="border border-gray-300 p-3">500-800 words</td>
        <td class="border border-gray-300 p-3">2-3 pages</td>
      </tr>
      <tr>
        <td class="border border-gray-300 p-3">Standard essays</td>
        <td class="border border-gray-300 p-3">1,000-1,500 words</td>
        <td class="border border-gray-300 p-3">4-6 pages</td>
      </tr>
      <tr>
        <td class="border border-gray-300 p-3">Research papers</td>
        <td class="border border-gray-300 p-3">2,000-3,000 words</td>
        <td class="border border-gray-300 p-3">8-12 pages</td>
      </tr>
      <tr>
        <td class="border border-gray-300 p-3">Extended research (AP/IB)</td>
        <td class="border border-gray-300 p-3">3,500-5,000 words</td>
        <td class="border border-gray-300 p-3">14-20 pages</td>
      </tr>
      <tr>
        <td class="border border-gray-300 p-3">College application essays</td>
        <td class="border border-gray-300 p-3">250-650 words</td>
        <td class="border border-gray-300 p-3">1-2.5 pages</td>
      </tr>
    </tbody>
  </table>

  <div class="my-6 p-6 bg-yellow-50 rounded-2xl border border-yellow-200">
    <strong>College Application Essays:</strong> Most colleges set strict limits of 500-650 words for personal statements. Going even 10 words over can result in your essay being cut off in the application system. Always check the specific requirements for each school!
  </div>

  <!-- CTA Box -->
  <div class="my-12 p-10 bg-indigo-50 rounded-[40px] border border-indigo-100 text-center">
    <h4 class="text-indigo-900 font-black text-2xl mb-4">Perfecting your college essay?</h4>
    <p class="text-indigo-600 mb-8 font-medium">Our word counter shows you exactly how close you are to the limit in real-time.</p>
    <a href="/" class="inline-block bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200">
      Check College Essay Length
    </a>
  </div>

  <h3>College/University (Undergraduate)</h3>

  <table class="w-full border-collapse border border-gray-300">
    <thead>
      <tr class="bg-gray-100">
        <th class="border border-gray-300 p-3 text-left">Assignment Type</th>
        <th class="border border-gray-300 p-3 text-left">Word Count Range</th>
        <th class="border border-gray-300 p-3 text-left">Pages (Double-Spaced)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="border border-gray-300 p-3">Response papers</td>
        <td class="border border-gray-300 p-3">500-1,000 words</td>
        <td class="border border-gray-300 p-3">2-4 pages</td>
      </tr>
      <tr>
        <td class="border border-gray-300 p-3">Standard essays</td>
        <td class="border border-gray-300 p-3">1,500-2,500 words</td>
        <td class="border border-gray-300 p-3">6-10 pages</td>
      </tr>
      <tr>
        <td class="border border-gray-300 p-3">Research papers</td>
        <td class="border border-gray-300 p-3">3,000-5,000 words</td>
        <td class="border border-gray-300 p-3">12-20 pages</td>
      </tr>
      <tr>
        <td class="border border-gray-300 p-3">Extended research</td>
        <td class="border border-gray-300 p-3">5,000-8,000 words</td>
        <td class="border border-gray-300 p-3">20-32 pages</td>
      </tr>
      <tr>
        <td class="border border-gray-300 p-3">Senior thesis</td>
        <td class="border border-gray-300 p-3">10,000-15,000 words</td>
        <td class="border border-gray-300 p-3">40-60 pages</td>
      </tr>
      <tr>
        <td class="border border-gray-300 p-3">Honors thesis</td>
        <td class="border border-gray-300 p-3">15,000-25,000 words</td>
        <td class="border border-gray-300 p-3">60-100 pages</td>
      </tr>
    </tbody>
  </table>

  <h3>Graduate School (Master's & PhD)</h3>

  <table class="w-full border-collapse border border-gray-300">
    <thead>
      <tr class="bg-gray-100">
        <th class="border border-gray-300 p-3 text-left">Assignment Type</th>
        <th class="border border-gray-300 p-3 text-left">Word Count Range</th>
        <th class="border border-gray-300 p-3 text-left">Pages (Double-Spaced)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="border border-gray-300 p-3">Seminar papers</td>
        <td class="border border-gray-300 p-3">5,000-8,000 words</td>
        <td class="border border-gray-300 p-3">20-32 pages</td>
      </tr>
      <tr>
        <td class="border border-gray-300 p-3">Literature reviews</td>
        <td class="border border-gray-300 p-3">8,000-15,000 words</td>
        <td class="border border-gray-300 p-3">32-60 pages</td>
      </tr>
      <tr>
        <td class="border border-gray-300 p-3">Master's thesis</td>
        <td class="border border-gray-300 p-3">20,000-40,000 words</td>
        <td class="border border-gray-300 p-3">80-160 pages</td>
      </tr>
      <tr>
        <td class="border border-gray-300 p-3">PhD dissertation</td>
        <td class="border border-gray-300 p-3">80,000-100,000 words</td>
        <td class="border border-gray-300 p-3">320-400 pages</td>
      </tr>
      <tr>
        <td class="border border-gray-300 p-3">Journal articles</td>
        <td class="border border-gray-300 p-3">5,000-10,000 words</td>
        <td class="border border-gray-300 p-3">20-40 pages</td>
      </tr>
    </tbody>
  </table>

  <h2>Common Essay Types and Their Word Counts</h2>

  <h3>Personal Narrative Essays</h3>
  <p><strong>Typical length:</strong> 500-1,000 words</p>
  <p>Personal narratives tell a story from your life. The relatively short length requires you to focus on one specific event or moment rather than covering your entire life story.</p>

  <h3>Argumentative Essays</h3>
  <p><strong>Typical length:</strong> 1,000-2,500 words</p>
  <p>Argumentative essays present a thesis and support it with evidence. Longer lengths allow for thorough exploration of counterarguments and multiple supporting points.</p>

  <h3>Compare and Contrast Essays</h3>
  <p><strong>Typical length:</strong> 1,000-1,500 words</p>
  <p>These essays examine similarities and differences between two subjects. The word count needs to be sufficient to cover both subjects fairly.</p>

  <h3>Analytical Essays</h3>
  <p><strong>Typical length:</strong> 1,500-2,500 words</p>
  <p>Analytical essays break down a text, concept, or event into components. The longer length accommodates detailed analysis with textual evidence.</p>

  <h3>Expository Essays</h3>
  <p><strong>Typical length:</strong> 800-1,500 words</p>
  <p>Expository essays explain or inform about a topic. Word counts vary based on topic complexity.</p>

  <h3>Research Papers</h3>
  <p><strong>Typical length:</strong> 2,000-5,000 words (undergraduate), 8,000-15,000 words (graduate)</p>
  <p>Research papers present original analysis supported by scholarly sources. Longer lengths reflect deeper research and analysis expectations.</p>

  <!-- CTA Box -->
  <div class="my-12 p-10 bg-indigo-50 rounded-[40px] border border-indigo-100 text-center">
    <h4 class="text-indigo-900 font-black text-2xl mb-4">Research paper stress?</h4>
    <p class="text-indigo-600 mb-8 font-medium">Track your word count, reading time, and structure all in one place.</p>
    <a href="/" class="inline-block bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200">
      Open Research Paper Assistant
    </a>
  </div>

  <h2>How to Meet Word Count Requirements</h2>

  <h3>Strategies When You're Under the Minimum</h3>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
    <div class="p-6 bg-blue-50 rounded-2xl border border-blue-200">
      <h4 class="font-bold text-lg mb-2">1. Expand Your Analysis</h4>
      <p>Don't just state facts - explain their significance. Add "why" and "how" to your explanations.</p>
    </div>
    
    <div class="p-6 bg-blue-50 rounded-2xl border border-blue-200">
      <h4 class="font-bold text-lg mb-2">2. Add More Evidence</h4>
      <p>Include additional examples, quotes, or data points to support your arguments more thoroughly.</p>
    </div>
    
    <div class="p-6 bg-blue-50 rounded-2xl border border-blue-200">
      <h4 class="font-bold text-lg mb-2">3. Address Counterarguments</h4>
      <p>Acknowledge opposing viewpoints and explain why your position is stronger.</p>
    </div>
    
    <div class="p-6 bg-blue-50 rounded-2xl border border-blue-200">
      <h4 class="font-bold text-lg mb-2">4. Develop Transitions</h4>
      <p>Instead of jumping between ideas, use fuller transitional sentences that connect concepts.</p>
    </div>
    
    <div class="p-6 bg-blue-50 rounded-2xl border border-blue-200">
      <h4 class="font-bold text-lg mb-2">5. Strengthen Your Introduction</h4>
      <p>Add context, background information, or a hook to engage readers from the start.</p>
    </div>
    
    <div class="p-6 bg-blue-50 rounded-2xl border border-blue-200">
      <h4 class="font-bold text-lg mb-2">6. Enhance Your Conclusion</h4>
      <p>Go beyond summarizing - discuss implications, applications, or future directions.</p>
    </div>
  </div>

  <div class="my-6 p-6 bg-yellow-50 rounded-2xl border border-yellow-200">
    <strong>Warning:</strong> Never artificially inflate word count with meaningless filler, repetition, or unnecessarily complex language. Professors can spot padding instantly, and it hurts your grade more than being slightly under the minimum.
  </div>

  <h3>Strategies When You're Over the Maximum</h3>

  <ul>
    <li><strong>Cut redundancy:</strong> Look for repeated ideas or information stated multiple times</li>
    <li><strong>Eliminate wordiness:</strong> Replace phrases like "due to the fact that" with "because"</li>
    <li><strong>Remove weak examples:</strong> Keep only your strongest supporting evidence</li>
    <li><strong>Tighten your thesis:</strong> Focus on one central argument rather than multiple related points</li>
    <li><strong>Delete qualifiers:</strong> Remove unnecessary words like "very," "really," "quite," "somewhat"</li>
    <li><strong>Combine sentences:</strong> Look for short, choppy sentences that could be merged</li>
    <li><strong>Cut tangents:</strong> Remove interesting but off-topic information</li>
  </ul>

  <h2>Word Count vs. Page Count: What You Need to Know</h2>

  <p>Many assignments specify page count instead of word count. Here's how to convert:</p>

  <h3>Standard Formatting (Double-Spaced, 12pt Times New Roman, 1-inch margins)</h3>
  <ul>
    <li><strong>1 page:</strong> approximately 250-300 words</li>
    <li><strong>2 pages:</strong> approximately 500-600 words</li>
    <li><strong>3 pages:</strong> approximately 750-900 words</li>
    <li><strong>4 pages:</strong> approximately 1,000-1,200 words</li>
    <li><strong>5 pages:</strong> approximately 1,250-1,500 words</li>
    <li><strong>10 pages:</strong> approximately 2,500-3,000 words</li>
    <li><strong>20 pages:</strong> approximately 5,000-6,000 words</li>
  </ul>

  <h3>Single-Spaced Text</h3>
  <ul>
    <li><strong>1 page:</strong> approximately 500-600 words</li>
    <li><strong>2 pages:</strong> approximately 1,000-1,200 words</li>
    <li><strong>5 pages:</strong> approximately 2,500-3,000 words</li>
  </ul>

  <p><strong>Important:</strong> These are estimates. Actual word counts vary based on font choice, paragraph structure, and use of headings or lists. Always use a <a href="/">word counter tool</a> to verify your exact word count.</p>

  <h2>Common Word Count Mistakes to Avoid</h2>

  <h3>1. Ignoring the Range</h3>
  <p>If the requirement says "1,500-2,000 words," aim for the middle (around 1,750). Going significantly under or over suggests you didn't follow instructions.</p>

  <h3>2. Counting the Title and References</h3>
  <p>Unless specifically stated, word counts typically exclude:</p>
  <ul>
    <li>Title page</li>
    <li>Abstract</li>
    <li>References/Bibliography</li>
    <li>Footnotes (sometimes - check with your professor)</li>
    <li>Appendices</li>
  </ul>

  <h3>3. Using Font Tricks</h3>
  <p>Don't try to game the system with:</p>
  <ul>
    <li>Larger font sizes (13pt instead of 12pt)</li>
    <li>Wider margins (1.25" instead of 1")</li>
    <li>Increased line spacing (2.1 instead of 2.0)</li>
    <li>Extra spaces between sentences</li>
  </ul>
  <p>Professors notice these tricks immediately and may penalize you.</p>

  <h3>4. Obsessing Over Exact Numbers</h3>
  <p>If your essay is 1,492 words and the minimum is 1,500, you're fine. Don't waste time adding filler for 8 words. Most professors allow a 10% variance (±150 words for a 1,500-word essay).</p>

  <h3>5. Writing to the Count Instead of the Assignment</h3>
  <p>Focus on fully answering the prompt first. If you've thoroughly addressed all requirements and you're still under the minimum, that's when you expand. If you've answered everything and you're over the maximum, that's when you cut.</p>

  <h2>Tools to Help Track Word Count</h2>

  <h3>Online Word Counters</h3>
  <p>Use <a href="/">VerboMetrics' free word counter</a> to track your progress in real-time. Benefits include:</p>
  <ul>
    <li>Instant word, character, sentence, and paragraph counts</li>
    <li>No installation required - works in any browser</li>
    <li>Privacy-focused - your text never leaves your device</li>
    <li>Includes reading time estimates</li>
    <li>Free with no signup or limits</li>
  </ul>

  <h3>Built-in Word Processors</h3>
  <p><strong>Microsoft Word:</strong> Word count appears in bottom left corner, or press Ctrl+Shift+G (Windows) / Cmd+Shift+G (Mac)</p>
  <p><strong>Google Docs:</strong> Tools → Word count, or press Ctrl+Shift+C (Windows) / Cmd+Shift+C (Mac)</p>
  <p><strong>Pages (Mac):</strong> View → Show Word Count</p>

  <!-- CTA Box -->
  <div class="my-12 p-10 bg-indigo-50 rounded-[40px] border border-indigo-100 text-center">
    <h4 class="text-indigo-900 font-black text-2xl mb-4">Stop stressing about word counts</h4>
    <p class="text-indigo-600 mb-8 font-medium">Let our free tool handle the counting while you focus on writing.</p>
    <a href="/" class="inline-block bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200">
      Start Writing With Confidence
    </a>
  </div>

  <h2>Frequently Asked Questions</h2>

  <div class="my-6 p-6 bg-blue-50 rounded-2xl border border-blue-200">
    <h3>How strict are word count requirements?</h3>
    <p>It varies by professor. Some strictly enforce limits (especially for college applications), while others allow 10% variance. When in doubt, ask your instructor. However, consistently staying within the specified range shows you can follow directions - a crucial academic skill.</p>
  </div>

  <div class="my-6 p-6 bg-blue-50 rounded-2xl border border-blue-200">
    <h3>Do contractions count as one or two words?</h3>
    <p>Contractions like "don't," "can't," and "won't" count as ONE word. This applies in all standard word counting tools including Microsoft Word, Google Docs, and online counters.</p>
  </div>

  <div class="my-6 p-6 bg-blue-50 rounded-2xl border border-blue-200">
    <h3>How many words should I write per minute/hour?</h3>
    <p>Average writing speeds vary widely:</p>
    <ul>
      <li><strong>First draft:</strong> 300-600 words per hour</li>
      <li><strong>Research papers (with citations):</strong> 200-400 words per hour</li>
      <li><strong>Experienced writers:</strong> 800-1,200 words per hour</li>
      <li><strong>Editing/revision:</strong> 1,000-2,000 words per hour</li>
    </ul>
  </div>

  <div class="my-6 p-6 bg-blue-50 rounded-2xl border border-blue-200">
    <h3>Should I aim for the minimum or maximum?</h3>
    <p>Aim for the middle of the range. If the requirement is 1,500-2,000 words, target around 1,750. This shows you can write comprehensively without rambling.</p>
  </div>

  <div class="my-6 p-6 bg-blue-50 rounded-2xl border border-blue-200">
    <h3>What if I can't reach the minimum word count?</h3>
    <p>First, review your assignment to ensure you've fully addressed all parts of the prompt. Then expand your analysis, add more evidence, and develop your ideas more thoroughly. If you're still significantly under after thorough effort, talk to your instructor - you may have misunderstood the assignment scope.</p>
  </div>

  <div class="my-6 p-6 bg-blue-50 rounded-2xl border border-blue-200">
    <h3>Do hyphenated words count as one or two words?</h3>
    <p>Hyphenated words like "twenty-one," "well-known," and "self-esteem" count as ONE word in most word processing tools.</p>
  </div>

  <h2>Conclusion: Master Word Counts for Academic Success</h2>

  <p>Understanding and meeting word count requirements is a fundamental academic skill that extends beyond school into professional writing. Whether you're crafting a 500-word college application essay or a 10,000-word research paper, knowing the expectations for your specific assignment type and education level helps you plan your writing effectively.</p>

  <p><strong>Key takeaways:</strong></p>
  <ul>
    <li>Word count requirements exist to ensure depth, fairness, and appropriate scope</li>
    <li>Different education levels and assignment types have vastly different expectations</li>
    <li>Focus on fully answering the prompt rather than hitting an arbitrary number</li>
    <li>Use legitimate expansion and reduction strategies - never pad with filler or manipulate formatting</li>
    <li>Track your word count regularly using reliable tools</li>
    <li>When in doubt about requirements, always ask your instructor for clarification</li>
  </ul>

  <p>Remember: word counts are guidelines to help you develop appropriately detailed responses. They're not obstacles to overcome but tools to help you gauge the depth of analysis expected. With practice, writing to specific word counts becomes second nature.</p>

  <!-- CTA Box -->
  <div class="my-12 p-10 bg-indigo-50 rounded-[40px] border border-indigo-100 text-center">
    <h4 class="text-indigo-900 font-black text-2xl mb-4">Ready to ace your next assignment?</h4>
    <p class="text-indigo-600 mb-8 font-medium">Get the perfect word count every time with our free tool.</p>
    <a href="/" class="inline-block bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200">
      Get Perfect Word Counts Now
    </a>
  </div>

  <hr class="my-12 border-t border-gray-300">

  <h3>Related Articles</h3>
  <ul>
    <li><a href="/blog/character-counter-guide.html">Character Counter: Everything You Need to Know in 2026</a></li>
    <li><a href="/">Free Word Counter Tool</a> - Count words, sentences, and paragraphs</li>
    <li><a href="/case-converter.html">Case Converter</a> - Change text formatting instantly</li>
  </ul>

  <p><em>Last updated: January 21, 2026</em></p>
`;

function App() {
  return (
    <Router>
      <AnalyticsTracker /> {/* --- ADDED THIS LINE HERE --- */}
      <Header />
      <main className="min-h-screen bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto py-12">
          <Routes>
            {/* Homepage */}
            <Route path="/" element={<WordCounter />} />
            
            {/* Tool Routes - Handling both Clean and Legacy URLs */}
            <Route path="/case-converter" element={
              <CaseConverter 
                seoTitle="Case Converter: Transform Text Instantly"
                seoDescription="Convert text to uppercase, lowercase, sentence case, or title case in one click. Perfect for formatting documents, code, and social media posts. No signup required."
              />
            } />
            <Route path="/case-converter.html" element={
              <CaseConverter 
                seoTitle="Case Converter: Transform Text Instantly"
                seoDescription="Convert text to uppercase, lowercase, sentence case, or title case in one click. Perfect for formatting documents, code, and social media posts. No signup required."
              />
            } />

            <Route path="/text-diff" element={<TextDiff />} />
            <Route path="/text-diff.html" element={<TextDiff />} />

            <Route path="/lorem-ipsum" element={<LoremIpsum />} />
            <Route path="/lorem-ipsum.html" element={<LoremIpsum />} />

            {/* Blog Routes - Handling both Clean and Legacy URLs */}
            <Route path="/blog" element={<BlogIndex />} />
            
            {/* Character Counter Guide */}
            <Route path="/blog/character-counter-guide" element={
              <BlogPost 
                title="Character Counter: Everything You Need to Know in 2026" 
                date="Jan 14, 2026" 
                content={blogCharacterGuide} 
                path="/blog/character-counter-guide"
                seoTitle="Current X (Twitter) Character Limit 2026 + All Social Media"
                seoDescription="Updated for 2026: Every character limit for X, Instagram, Facebook, LinkedIn. Optimize your social engagement and SEO with our free character counter tool."
              />
            } />
            <Route path="/blog/character-counter-guide.html" element={
              <BlogPost 
                title="Character Counter: Everything You Need to Know in 2026" 
                date="Jan 14, 2026" 
                content={blogCharacterGuide} 
                path="/blog/character-counter-guide"
                seoTitle="Current X (Twitter) Character Limit 2026 + All Social Media"
                seoDescription="Updated for 2026: Every character limit for X, Instagram, Facebook, LinkedIn. Optimize your social engagement and SEO with our free character counter tool."
              />
            } />

            {/* Count Words in Google Docs */}
            <Route path="/blog/count-words-google-docs" element={
              <BlogPost 
                title="How to Count Words in Google Docs (3 Easy Methods + Shortcuts)" 
                date="Jan 28, 2026" 
                content={blogGoogleDocs} 
                path="/blog/count-words-google-docs"
                seoTitle="How to Check Word Count in Google Docs: 2026 Guide"
                seoDescription="Step-by-step guide: 3 easy ways to check word count in Google Docs including hidden shortcuts for 2026. Plus free online word counter for advanced analysis."
              />
            } />
            <Route path="/blog/count-words-google-docs.html" element={
              <BlogPost 
                title="How to Count Words in Google Docs (3 Easy Methods + Shortcuts)" 
                date="Jan 28, 2026" 
                content={blogGoogleDocs} 
                path="/blog/count-words-google-docs"
                seoTitle="How to Check Word Count in Google Docs: 2026 Guide"
                seoDescription="Step-by-step guide: 3 easy ways to check word count in Google Docs including hidden shortcuts for 2026. Plus free online word counter for advanced analysis."
              />
            } />

            {/* Word Count Requirements */}
            <Route path="/blog/word-count-requirements" element={
              <BlogPost 
                title="Word Count Requirements: Complete Guide for Students 2026" 
                date="Jan 21, 2026" 
                content={blogRequirements} 
                path="/blog/word-count-requirements"
                seoTitle="Essay Word Count Requirements: 2026 Student Guide"
                seoDescription="Complete guide to essay word counts for high school, college, and graduate students. Meet requirements without padding. Free word counter included."
              />
            } />
            <Route path="/blog/word-count-requirements.html" element={
              <BlogPost 
                title="Word Count Requirements: Complete Guide for Students 2026" 
                date="Jan 21, 2026" 
                content={blogRequirements} 
                path="/blog/word-count-requirements"
                seoTitle="Essay Word Count Requirements: 2026 Student Guide"
                seoDescription="Complete guide to essay word counts for high school, college, and graduate students. Meet requirements without padding. Free word counter included."
              />
            } />

            {/* Support & Legal */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/contact.html" element={<Contact />} />
            
            <Route path="/privacy" element={
              <LegalPage 
                title="Privacy Policy" 
                lastUpdated="Jan 22, 2026" 
                path="/privacy"
              >
                <p>VerboMetrics respects your privacy. All text is processed locally in your browser and is never stored on our servers.</p>
              </LegalPage>
            } />
            <Route path="/privacy.html" element={
              <LegalPage 
                title="Privacy Policy" 
                lastUpdated="Jan 22, 2026" 
                path="/privacy"
              >
                <p>VerboMetrics respects your privacy. All text is processed locally in your browser and is never stored on our servers.</p>
              </LegalPage>
            } />
            
            <Route path="/terms" element={
              <LegalPage 
                title="Terms of Service" 
                lastUpdated="Jan 22, 2026" 
                path="/terms"
              >
                <p>By using VerboMetrics, you agree that we are not responsible for any errors in word or character counts.</p>
              </LegalPage>
            } />
            <Route path="/terms.html" element={
              <LegalPage 
                title="Terms of Service" 
                lastUpdated="Jan 22, 2026" 
                path="/terms"
              >
                <p>By using VerboMetrics, you agree that we are not responsible for any errors in word or character counts.</p>
              </LegalPage>
            } />

            {/* CATCH-ALL: This must be the LAST route */}
            <Route path="*" element={<WordCounter />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </Router>
  );
}

export default App;