# for samyy — an apology, in kintsugi

A standalone site, structured but not filled in yet — the words, photos, songs, and clips are yours to add. Nothing here will break if you open it right now; every empty slot is a placeholder that quietly disappears once you drop in the real thing.

## the idea

Kintsugi is the Japanese practice of repairing broken pottery with gold, so the break becomes part of the piece, not something hidden. The whole site is built around that: a visibly cracked heart on the way in, gold seams drawn in once it's opened, and the same heart fully mended at the end. The metaphor is the apology — not erasing what happened, repairing it visibly.

The gate screen has two honest buttons: "open it" and "not right now." The second one isn't a trick — it just says okay and leaves it alone. No dodging cursor, no forced yes.

## what to replace, and exactly what to name it

Drop files into these folders with these exact names and the site updates automatically — no code changes needed.

**Photos** — `assets/photos/`
`photo1.jpg` through `photo6.jpg`. Any photo works; they're cropped to square automatically. Replace the word "caption" under each photo in `index.html` (search for `photo-cap`) with your own short caption.

**Songs** — `assets/audio/`
`song1.mp3`, `song2.mp3`, `song3.mp3`. Update the titles/artists in `index.html` by editing the `data-title` and `data-artist` attributes on each `.track` div, and swap the cover art described below.

**Cover art** — `assets/cover/`
`cover1.jpg`, `cover2.jpg`, `cover3.jpg` — small square images, one per song.

**Videos** — `assets/videos/`
`video1.mp4` / `video2.mp4`, plus `video1-poster.jpg` / `video2-poster.jpg` (a still frame shown before she presses play — any frame from the clip works, or a quick screenshot).

## what to write yourself

Search `index.html` for `write-here` — those are the dashed boxes marked "✎ write this yourself." That's deliberate: this is the part that actually needs to be your own words, not something written for you. Everything else (structure, layout, motion) is done; replace the bracketed text inside those boxes and the three `[...]` lines in the promises and sign-off sections.

## previewing locally

Just open `index.html` in a browser — no build step, no server needed. Missing songs/videos fail gracefully (you'll see a small "not added yet" note instead of a broken player).

## deploying

Same as your other two — push this folder to a new GitHub repo, enable GitHub Pages on the `main` branch, done.
