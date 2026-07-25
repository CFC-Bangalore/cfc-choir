# Visual Chord Editor
## UX & Functional Specification
Version: 1.0

---

# Purpose

The Visual Chord Editor allows choir members to edit chords without editing
raw chord markup.

Users should never need to manually count spaces or move brackets.

The application should manage formatting automatically.

---

# Goals

The editor should be:

✓ Fast

✓ Mobile-first

✓ Easy for non-technical members

✓ Compatible with the existing bracket format

No database schema changes.

No renderer rewrite.

---

# Storage Format

The internal storage format remains:

[F]Amazing [Bb/F]Grace how sweet the [F]sound

The Visual Editor converts to and from this format automatically.

---

# User Flow

Open Song

↓

Edit Song

↓

Choose Editor

• Visual Chord Editor
• Paste Chord Sheet
• Raw Editor

↓

Visual Editor

↓

Preview

↓

Save

---

# Screen 1

Choose Editing Method

--------------------------------

Edit Song

Choose how you would like to edit.

🎵 Visual Chord Editor

📋 Paste Chord Sheet

📝 Raw Editor

--------------------------------

Cancel

---

# Screen 2

Visual Editor

Example

           F

Amazing Grace how sweet the sound

                 Bb/F

Amazing Grace how sweet the sound

                             F

Amazing Grace how sweet the sound

Only one lyric line is shown.

Chords float naturally above the associated words.

No monospaced formatting.

---

# Interaction

Tap an existing chord

↓

Edit Chord

Tap a word with no chord

↓

Add Chord

---

# Bottom Sheet

Example

--------------------------------

Current Chord

Bb/F

--------------------------------

Search chord

_____________

Popular

F

C

G

Am

Dm

Bb

--------------------------------

Move Left

Move Right

Delete Chord

--------------------------------

Cancel

Apply

--------------------------------

---

# Search

Typing should instantly filter chords.

Typing:

F#

Shows

F#

F#m

F#7

F#maj7

F#sus4

F#/A#

Search is case-insensitive.

---

# Popular Chords

If the current song key is known:

Show chords commonly used in that key first.

Otherwise show:

C

D

E

F

G

A

Am

Dm

Em

Bb

---

# Editing Rules

Users may:

Add chords

Edit chords

Delete chords

Move chords

Users never edit brackets manually.

---

# Chord Order

Chord order must always remain identical to the original sequence.

If multiple chords attach to one word:

[F][Bb/C]

never

[Bb/C][F]

---

# Unsaved Changes

When edits exist:

Display

● Unsaved Changes

Leaving the editor should ask:

Discard

Cancel

Keep Editing

---

# Preview

Before saving:

Show every modification.

Example

Verse 1

Amazing

F

↓

G

Verse 2

Added

Dm

Users always know what will change.

---

# Validation

Warn if:

Unknown chord

Duplicate chord

Impossible placement

Wrong-song detection from pasted import

Warnings never prevent editing.

---

# Mobile Design

Primary platform.

Bottom sheet instead of floating dialogs.

Buttons minimum 44px touch height.

Large touch targets.

No hover interactions.

---

# Desktop

Mouse support.

Keyboard shortcuts (future):

Ctrl+Z

Ctrl+Y

Delete

Arrow keys

---

# Accessibility

Readable fonts.

High contrast.

Keyboard accessible.

Screen-reader friendly labels.

---

# Internal Model

Example

[
  {
    "word":"Amazing",
    "chord":"F"
  },
  {
    "word":"Grace",
    "chord":null
  },
  {
    "word":"how",
    "chord":null
  },
  {
    "word":"sweet",
    "chord":"Bb/F"
  }
]

This model is temporary.

Before Save it is converted back into:

[F]Amazing Grace how [Bb/F]sweet the sound

---

# Phase 1 Scope

Included

✓ Display existing chords

✓ Add chord

✓ Edit chord

✓ Delete chord

✓ Move left

✓ Move right

✓ Preview

✓ Undo

✓ Redo

Not included

✗ Drag & Drop

✗ AI suggestions

✗ Community voting

✗ Version history

---

# Success Criteria

A choir member with no technical knowledge should be able to:

Open a song

↓

Change one incorrect chord

↓

Preview

↓

Save

within one minute.

No understanding of chord markup should be required.
