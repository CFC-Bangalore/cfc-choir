# CFC Choir PWA
## PROJECT.md
Version: 3.0
Status: Active Development

---

# Vision

The CFC Choir PWA is NOT simply a song viewer.

Its goal is to become the official digital worship library for CFC Bangalore.

The application should eventually become the single trusted source for:

• Song lyrics
• Chords
• Setlists
• Practice
• Choir arrangements
• Worship knowledge
• Historical song information

Every design decision should move the project closer to that vision.

---

# Core Philosophy

The application should always favour:

✔ Simplicity
✔ Reliability
✔ Mobile-first usability
✔ Offline capability
✔ Fast searching
✔ Safe editing
✔ Community contribution
✔ Consistent formatting

over unnecessary complexity.

---

# Source of Truth

Firebase Realtime Database is the authoritative data source.

Static JSON files exist primarily as:

• bootstrap data
• offline fallback
• legacy compatibility

Never overwrite valid Firebase content with static data.

---

# Architecture Rules

## DO

Reuse existing code whenever practical.

Preserve:

- transpose engine
- chord renderer
- Firebase structure
- authentication
- search
- setlists

Build around existing architecture.

---

## DON'T

Never rewrite the application unless specifically requested.

Never perform large refactors simply because they seem cleaner.

Never rename hundreds of functions.

Never replace working systems without good reason.

Incremental improvements only.

---

# Editing Philosophy

The application should make editing easy.

The user should never be forced to:

• manually count spaces
• manually align chords
• manually format text

The software should do the difficult work.

---

# Chord System

The existing bracket format remains the internal standard.

Example:

[F]Amazing [Bb/F]Grace how sweet the [F]sound

All editing tools eventually convert into this format.

Never introduce multiple storage formats.

---

# Smart Chord Editor

Editing methods:

1. Visual Editor

2. Paste Complete Chord Sheet

3. Raw Editor

Raw Editor always remains available.

---

# Paste Chord Sheet

The importer should accept:

• Ultimate Guitar
• Word
• PDF text
• WhatsApp
• plain text
• existing bracket format

Supported formats:

Chord-above-lyrics

Inline chords

Ultimate Guitar

Section headings

Normalize everything into the CFC standard.

---

# Lyrics

Lyrics belong to the song.

Chords belong to the lyrics.

The software should always try to preserve lyric/chord relationships.

When importing chords:

Compare pasted lyrics against current lyrics.

Allow the member to choose:

• Keep current lyrics + apply chords

• Replace lyrics and chords

• Review differences

• Cancel

Never silently replace lyrics.

---

# Preview First

Nothing should ever modify Firebase immediately.

Every potentially destructive action should have a Preview.

Preview should display exactly what will be saved.

---

# Community Editing

Members are trusted contributors.

Members ARE allowed to:

✔ correct lyrics

✔ edit chords

✔ replace chords

✔ paste chord sheets

✔ improve songs

Safety comes from:

Preview

Validation

Confirmation

—not unnecessary permission restrictions.

---

# Wrong Song Protection

If imported lyrics appear unrelated:

Warn clearly.

Allow:

Cancel

Review Anyway

Never silently save.

---

# Chord Health

Each song will eventually have a status.

🟢 Verified

🟡 Community Reviewed

🟠 Needs Review

🔴 Chords Missing

Status should assist users.

It should never block editing.

---

# Version History (Future)

Every saved edit should eventually record:

Date

User

Change summary

Rollback capability

No permanent data loss.

---

# Mobile First

The majority of choir members use phones.

Every new feature must work well on:

Android

iPhone

Desktop

No desktop-only workflows.

---

# Performance

Large song libraries must remain fast.

Avoid expensive rendering.

Avoid unnecessary Firebase reads.

Lazy load where practical.

Reuse cached data.

---

# UI Principles

The application should feel:

Clean

Fast

Calm

Modern

Never cluttered.

Animations should be subtle.

Music should remain the focus.

---

# Error Handling

Always explain errors.

Never silently fail.

If a save fails:

Tell the user why.

Provide Retry.

Do not lose work.

---

# Chord Parser Principles

Always preserve:

Chord order

Section headings

Chord quality

Slash chords

Never reorder chords.

If placement is uncertain:

Flag uncertainty.

Do not guess silently.

---

# AI Philosophy

AI assists.

Humans decide.

The application should never automatically rewrite songs.

AI may suggest.

Members approve.

---

# Development Workflow

Every feature follows:

Design

↓

Architecture review

↓

Implementation

↓

Automated tests

↓

Manual testing

↓

GitHub commit

↓

GitHub push

Never skip testing.

---

# Git Rules

Never commit automatically.

Never push automatically.

Always wait for explicit approval.

---

# Current Roadmap

## Phase 1

✅ Smart Chord Import

⬜ Visual Chord Editor

⬜ Save Integration

---

## Phase 2

⬜ Version History

⬜ Chord Health

⬜ Community Review

---

## Phase 3

⬜ Online Chord Import

⬜ AI Assistance

⬜ Practice Enhancements

---

## Phase 4

⬜ Handwritten Chord Recognition

⬜ Analytics

⬜ Choir Intelligence

---

# Long-Term Vision

One day a choir member should be able to:

Open a song

↓

See the official CFC arrangement

↓

Transpose instantly

↓

Fix a typo

↓

Paste better chords

↓

Preview

↓

Save

↓

Help every future choir member.

If this document and a proposed feature disagree,

the feature should change—

not the vision.
