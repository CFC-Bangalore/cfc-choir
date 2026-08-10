# CLAUDE.md

> AI Operating Manual for the \*\*CFC Choir PWA\*\*

## 1\. Purpose

This document is the primary onboarding guide for any AI assistant working on this repository.

Read this file **before** reading or modifying any source files.

The objective is to preserve the product vision, architecture, coding philosophy and user experience while implementing new features.

\---

# 2\. Product Mission

The CFC Choir PWA is a Progressive Web App built for church worship teams.

Its purpose is to help choir members, worship leaders and musicians quickly:

* Find songs
* View lyrics
* View chords
* Build setlists
* Randomly select songs
* Edit lyrics and chords
* Export Lyrics PDF
* Export Chords PDF
* Work offline
* Install as a PWA

Every enhancement should make rehearsals and worship services easier.

\---

# 3\. Primary Users (Priority)

1. Choir Members
2. Worship Leaders
3. Musicians
4. Projection Operators

\---

# 4\. Core Principles

* Preserve all existing functionality.
* Never change JSON structures unless explicitly requested.
* Never break offline support.
* Never break transpose.
* Never break the parser.
* Never break PDF export.
* Never remove accessibility.
* Prefer fewer clicks over more features.
* Prefer inline editing over extra dialogs.
* Desktop and Mobile are intentionally different experiences.

\---

# 5\. Design Philosophy

The application should feel like a premium commercial product.

It should NOT resemble:

* Bootstrap templates
* Generic admin dashboards
* Material Design clones

Characteristics:

* Elegant
* Minimal
* Musician-first
* Responsive
* Clearly clickable controls
* Fast
* Highly readable

\---

# 6\. UX Principles

Always optimize for:

* Fewer taps
* Less scrolling
* One-handed mobile usage
* Fast rehearsal workflow
* Clear chord readability
* Consistent navigation

\---

# 7\. Responsive Rules

Support:

* Desktop
* Laptop
* Tablet
* Android
* iPhone
* Portrait
* Landscape

Desktop should maximize productivity.

Mobile should maximize usability.

\---

# 8\. Feature Inventory

Current capabilities include:

* Song Library
* Search
* Favorites
* Commonly Sung
* Manual Pick
* Random Pick
* Pin Songs
* Setlists
* Lyrics View
* Chords View
* Lyrics Editor
* Chord Editor
* Visual Chord Editor
* Universal Chord Import
* Transpose
* Lyrics PDF
* Chords PDF
* Offline Mode
* Local Storage
* PWA Installation

\---

# 9\. Chord Handling

Internally normalize imported chord sheets before parsing.

Support:

* Chords Above Lyrics
* ChordPro
* Inline Chords
* Plain Lyrics

Section headings such as:

Verse
Chorus
Bridge
Intro
Outro

must NEVER be interpreted as chords, even if enclosed in square brackets.

\---

# 10\. Song Viewer

Preferred structure:

1. Song Header
2. Mode Selector
3. Sticky Reading Toolbar
4. Scrollable Reading Area

The toolbar must never overlap lyrics.

\---

# 11\. PDF Rules

Lyrics PDF and Chords PDF are independent features.

Chord PDFs should:

* Keep chord line tightly coupled to lyric line.
* Keep chord/lyric pairs together across page breaks.
* Use readable spacing.
* Preserve horizontal alignment.

\---

# 12\. Coding Standards

* Reuse existing components.
* Remove dead CSS only when safe.
* Avoid duplicate logic.
* Use semantic HTML.
* Prefer CSS variables.
* Avoid unrelated refactoring.

\---

# 13\. AI Decision Framework

When several solutions exist:

1. Preserve functionality.
2. Preserve compatibility.
3. Reduce clicks.
4. Reduce scrolling.
5. Improve readability.
6. Improve maintainability.
7. Avoid regressions.

\---

# 14\. What AI Must Never Change

Without explicit approval, do not change:

* JSON schema
* Business logic
* Offline architecture
* Local Storage format
* Parser pipeline
* Transpose engine
* Existing exports
* PWA behaviour

\---

# 15\. Regression Checklist

Before completing any task verify:

* Song Library
* Search
* Favorites
* Commonly Sung
* Manual Pick
* Random Pick
* Pinning
* Song Viewer
* Lyrics View
* Chords View
* Editors
* Visual Editor
* PDF Export
* Offline Mode
* PWA Install
* Android
* iPhone
* Desktop

\---

# 16\. Long-Term Vision

Transform the application into the best worship song management platform for church choirs while preserving simplicity.

Future themes:

* Presentation Mode
* Practice Mode
* Cloud Sync
* Team Collaboration
* Rich Setlists
* Advanced Printing
* Modern Design System

\---

# 17\. Working Method

For every enhancement:

1. Read only the files required.
2. Understand the affected feature.
3. Avoid unrelated edits.
4. Implement the smallest safe change.
5. Test for regressions.
6. Deliver production-ready code.



## File Ownership

To avoid unnecessary repository analysis, use these rules:

* Song Viewer changes → Read only the Song Viewer implementation files.
* Song Library changes → Read only the Song Library implementation files.
* Build Setlist changes → Read only the Setlist implementation files.
* PDF Export changes → Read only the PDF export implementation files.
* Universal Chord Import changes → Read only the parser/import engine files.
* Visual Editor changes → Read only the Visual Editor files.

Never analyse the full repository unless explicitly requested.



End of CLAUDE.md

