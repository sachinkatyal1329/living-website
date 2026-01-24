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
- Add new sections or elements (between `</main>` and `#phone-display`)
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

Commit your changes directly to main with a brief, descriptive commit message about what was changed.
