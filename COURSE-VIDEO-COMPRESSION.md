# Compressing course lesson videos for Selar upload

Written 2026-09-29 while compressing The Vlogging Course lessons. Read this
before compressing videos for the next course — it should mean no
re-deriving settings from scratch.

## The problem

DaVinci Resolve exports come out huge: 1920x1080, HEVC (H.265) 10-bit,
~15 Mbps. A 15-20 minute lesson lands at 1-2+ GB. That's too large to
comfortably upload to Selar. Target: **under 300MB per lesson, ideally
under 150MB**, without the video looking noticeably worse for a talking-head
+ screen-recording course.

## The fix: re-encode with ffmpeg

Requires `ffmpeg` (already installed via Homebrew on this Mac — check with
`which ffmpeg`; install with `brew install ffmpeg` if it's ever missing on a
different machine).

**The command** (run once per lesson file):

```bash
ffmpeg -i "INPUT.mp4" \
  -vf "scale=-2:720" -pix_fmt yuv420p \
  -c:v libx264 -preset medium -crf 23 \
  -c:a aac -b:a 128k \
  -movflags +faststart \
  "OUTPUT.mp4"
```

What each part does, in plain terms:
- `scale=-2:720` — downscales 1080p to 720p (the `-2` keeps width even and
  proportional). This is most of the size saving.
- `-pix_fmt yuv420p` — converts from the 10-bit color the camera/Resolve
  export uses down to standard 8-bit. Needed for broad compatibility and
  saves more space; invisible to viewers on a course platform.
- `-c:v libx264 -crf 23` — H.264 video at "visually near-lossless" quality.
  CRF (Constant Rate Factor) targets a *quality level*, not a fixed file
  size, so bitrate (and resulting file size) naturally scales down for
  simpler/lower-motion footage and up for busier scenes. Lower CRF number =
  higher quality = bigger file; 23 is a well-tested default for this kind of
  content. If a future course's output is landing too large, try `-crf 26`
  or `-crf 28` next (worse quality, smaller file) before touching anything
  else.
- `-preset medium` — speed/compression-efficiency tradeoff. `medium` is
  ffmpeg's own default and a good balance; `slow` would compress ~5-10%
  smaller for the same CRF at roughly double the encode time. Not worth it
  at this file size margin (see results below).
- `-c:a aac -b:a 128k` — standard AAC audio, 128kbps is plenty for spoken
  voice.
- `-movflags +faststart` — moves file metadata to the front so the video
  starts playing before it's fully downloaded. Good practice for anything
  going on the web, costs nothing.

## Why these exact settings

Reverse-engineered from the Learn Storycraft course (compressed June 2026,
files still sitting in `~/Desktop/Learn Story Craft/compressed/`), which
used the same codec/resolution/audio recipe — confirmed via `ffprobe`
(`libx264`, 1280x720, AAC 128k) — since no script or settings file survived
from that session to copy directly. CRF value specifically isn't
recoverable from a finished file's metadata (x264 doesn't embed it), so 23
was chosen fresh as a well-known safe default and verified empirically
against this course's own footage — see results below.

## Results

**Learn Storycraft** (source: `/Volumes/g vault 5/course/Learn story Craft/Export`,
output: `~/Desktop/Learn Story Craft/compressed/`) — lessons ran 4 min to
59 min long:

| Lesson (excerpt) | Before | After | Ratio |
|---|---|---|---|
| 10. How to plot your story (58.7 min) | 3.80 GB | 334 MB | 11.4x |
| 9. Creating compelling antagonism (45.3 min) | 2.86 GB | 253 MB | 11.3x |
| 21. Self Publishing (46.2 min) | 2.89 GB | 200 MB | 14.4x |
| 1. Intro (3.9 min) | 297 MB | 24 MB | 12.4x |

Note the 58-minute lesson landed at 334MB — over the 300MB target. CRF-based
encoding optimizes for quality, not a size cap, so a very long lesson can
still land over target even at CRF 23. If that happens: re-run just that
file at a higher CRF (26-28), or split the lesson if it's unusually long.

**The Vlogging Course** (source: `/Volumes/g vault 5/Vlogging course/Export`,
output: `~/Desktop/Vlogging Course/compressed/`) — lessons run 2-19 minutes,
shorter than Learn Storycraft, so results comfortably beat target:

| Lesson | Before | After | Ratio |
|---|---|---|---|
| 1. Intro to foundations (2.2 min) | 251 MB | 18.5 MB | 13.6x |
| (rest of the batch — see below, filled in after the Sept 29 2026 run) | | | |

Encode speed on this Mac (M1 Pro, software x264, `medium` preset): roughly
**3x realtime** — a 15-minute lesson takes about 5 minutes to encode. For a
full course of ~90 minutes of total footage, budget ~30 minutes of encoding
time, and run it as a background batch job rather than watching it.

## Step-by-step for the next course

1. Find the exports on the `g vault 5` drive — look for a folder named after
   the course, then an `Export` subfolder (that's where DaVinci Resolve
   output lands). `find "/Volumes/g vault 5" -iname "*coursename*"` if the
   folder name isn't obvious.
2. `mkdir -p "~/Desktop/<Course Name>/compressed"` — keep the same
   Desktop/<course>/compressed pattern as prior courses, so it's easy to
   find later and stays out of any git repo (these are large binary files
   that don't belong in version control).
3. Test on the shortest lesson first, check the resulting file size and
   watch a few seconds to confirm quality is acceptable, *then* batch the
   rest — don't commit to a setting across the whole course sight unseen.
4. Batch the remaining lessons with a simple shell loop over the file list,
   running in the background (it takes a while) rather than one at a time
   in the foreground.
5. Spot-check final file sizes are all under the target before uploading.
6. Upload each compressed file to its lesson slot on Selar manually — Selar
   doesn't have a bulk video-upload API for this, it's one file per lesson
   through the dashboard.

## If ffmpeg is ever missing

`brew install ffmpeg` (Homebrew must already be installed — it is, on this
Mac, used for other tooling too).
