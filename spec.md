# Sarshiv Punjabi Lyrics

## Current State
New project, no existing code.

## Requested Changes (Diff)

### Add
- Single-page Punjabi lyrics website, entirely client-side
- Dark mode theme: near-black background, white/yellow text and accents
- Header with site title "Sarshiv Punjabi Lyrics"
- Large search box that filters song list in real-time
- List of 25+ Punjabi song titles
- Clickable song titles that reveal full lyrics (Gurmukhi script) for 5-10 songs; others show placeholder
- Mobile-responsive layout
- Footer showing "Owner: Sarshiv"

### Modify
N/A

### Remove
N/A

## Implementation Plan
1. Build a single React page (App.tsx) with all song data hardcoded as a JS array
2. Search input with controlled state filtering the songs list
3. Lyrics panel that shows when a song is selected, with Gurmukhi text
4. Dark mode styling using Tailwind CSS classes
5. Responsive layout for mobile and desktop
6. Footer with owner name
