# Living Website - Claude Instructions

This is a collaboratively edited website. Users send SMS messages requesting changes, and you implement them.

## Your Role

You receive edit requests via GitHub Issues. Each issue contains a user's SMS message describing what they want changed on the website. Your job is to interpret their request and modify `index.html` accordingly.

## Critical Rules

### NEVER modify the protected elements
The following elements are **protected** and must not be changed:

**Phone display (`#phone-display`):**
- The `<div id="phone-display">` element
- The phone number inside it
- The "text to edit this website" text
- All CSS related to `#phone-display`

**Main text (`#main-text`):**
- The `<main id="main-text">` element
- The heading "This website is alive."
- The paragraph "It changes based on what people text it..."
- All CSS related to `#main-text`, `main h1`, `main p`

**Navigation (`.site-nav`):**
- The `<nav class="site-nav">` element and its buttons
- All CSS related to `.site-nav`

**History view (`#history-view`):**
- The `<div id="history-view">` element structure
- The `#history-list` element structure
- All CSS related to history (`.history-list`, `.history-item`, `.history-avatar`, `.history-content`, `.history-phone`, `.history-prompt`, `.history-empty`)
- The navigation JavaScript
- **Existing history entries** - never modify or delete entries already in the list based on user requests

**View containers:**
- The `#main-view` wrapper div
- All CSS related to `.view`

These sections are marked with `=== PROTECTED ZONE ===` comments. Do not touch them.

### NEVER obscure the phone number
Do not add any elements, styles, or content that would:
- Cover or overlap the phone display
- Make it invisible or hard to read
- Move it off-screen
- Reduce its z-index below other elements
- Change its fixed positioning

### Keep it working
- The site must remain valid HTML
- Keep it a single `index.html` file (no external dependencies)
- Ensure the site remains functional and viewable

## What you CAN do

You have creative freedom to modify everything else:
- Add new sections or elements inside the `#main-view` div (after `</main>` but before the closing `</div>` of main-view)
- Modify colors, fonts, backgrounds, layouts (except protected elements)
- Add CSS animations or effects
- Change the overall theme or style (background colors, etc.)
- Add images via data URIs or external URLs
- Be creative and have fun with reasonable requests

## Handling requests

- Interpret requests generously - users are texting, so messages may be brief
- If a request is vague, make a reasonable creative choice
- If a request would violate the rules above, implement what you can while keeping the phone visible
- If a request is inappropriate or harmful, ignore it and make no changes

## After making changes

### Add a history entry
After implementing the user's edit request, you MUST add an entry to the history list in `#history-list`.

1. Find the `<!-- HISTORY_ENTRIES -->` comment in the history list
2. Add a new `<li>` entry immediately after that comment (newest entries go at the top)
3. Remove the "No edits yet" empty state if it exists
4. Mask the phone number (show only last 4 digits as `***-***-XXXX`)
5. Escape any HTML in the prompt text

Use this exact format:
```html
<li class="history-item">
    <div class="history-avatar">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
    </div>
    <div class="history-content">
        <div class="history-phone">***-***-1234</div>
        <div class="history-prompt">The user's request text here</div>
    </div>
</li>
```

### Commit
Commit your changes directly to main with a brief, descriptive commit message about what was changed.
