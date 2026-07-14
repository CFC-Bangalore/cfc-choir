# CFC Choir PWA - AI Project Guide

## Project Goal

This project is an offline-first Progressive Web App (PWA) for the CFC Bangalore Choir.

Primary features:
- Song lyrics
- Chords
- Chord transposition
- YouTube links
- Search
- Favourites
- Offline support
- Fast performance
- Mobile-first UI

---

# Primary Files

Current main application:

index somewhat working 3.html

Future goal:

index.html
css/
js/
data/

---

# Data Files

songs-data.json
Contains the complete song database.

song-links-1.json
Contains YouTube links.

manifest-1.json
PWA configuration.

sw.js
Service Worker.

---

# Coding Rules

Always make the smallest possible change.

Never rewrite unrelated code.

Never reformat the entire file.

Never rename JSON properties unless requested.

Never change song IDs.

Preserve backwards compatibility.

Return only modified code unless asked otherwise.

---

# When Adding Features

Before editing:

1. Determine the minimum files required.
2. Read only those files.
3. Ignore everything else.

Examples:

Search feature
→ Read search-related code only.

Transpose feature
→ Read transpose-related code only.

YouTube feature
→ Read YouTube-related code only.

Never load the whole project if unnecessary.

---

# UI Rules

Maintain the current visual design.

Do not redesign screens unless requested.

Prefer reusable functions.

Keep JavaScript modular.

---

# Performance Rules

Prefer incremental updates.

Avoid duplicate logic.

Avoid large inline scripts.

Do not increase initial page load unnecessarily.

---

# Long-term Goal

Gradually migrate the large HTML file into:

css/
js/
components/
data/

without changing functionality.

This migration should happen in small, safe steps.
