# Transcribing course lessons for content mining + Selar descriptions

Written 2026-09-29 after transcribing all 8 Vlogging Course lessons and all
21 Learn Storycraft lessons in one session. Read before setting up
transcription again — but treat the specifics below as "what worked in this
session's setup," not permanent facts about the machine or the tools. Verify
before assuming any of it still holds; software updates, and so does the
environment a future session runs in.

## The setup (reusable — don't reinstall)

Transcription runs on **mlx-whisper**, Apple's MLX-optimized build of
OpenAI's Whisper. Chosen over the cloud API because it's free, keeps
everything on this Mac, and runs fast on Apple Silicon.

Installed in its own virtual environment so it doesn't touch system Python:

```bash
source ~/.venvs/whisper/bin/activate
```

If that environment doesn't exist yet (new machine, or it got removed):

```bash
python3 -m venv ~/.venvs/whisper
source ~/.venvs/whisper/bin/activate
pip install -U pip mlx-whisper
```

## The command

```bash
mlx_whisper --model mlx-community/whisper-large-v3-turbo \
  --output-format all \
  --output-dir "./transcripts" \
  "path/to/lesson.mp4"
```

`--output-format all` writes `.txt` (plain reading), `.srt`/`.vtt`
(captions, good if these ever get repurposed for a social clip), and
`.json`/`.tsv` (word-level timestamps, useful only if something programmatic
ever needs them). `large-v3-turbo` was chosen as the accuracy/speed
tradeoff — noticeably cleaner than the smaller models (fixed things like
"Vlogger out of the year" → "Vlogger of the Year" between a `tiny`-model
test and the `large-v3-turbo` re-run), while still fast enough on an M1 Pro
to not be a bottleneck. A future session should feel free to reconsider this
if quality or speed needs turn out different next time.

**Feed it the compressed video files, not the raw masters.** Audio quality
survives the 128kbps AAC compression fine for speech-to-text, and it's much
less to read off disk. mlx-whisper can decode audio straight out of an mp4
(it shells out to ffmpeg internally) — no separate audio-extraction step
needed.

## Quirk: output filenames truncate at the first "."

mlx-whisper names its output files by taking everything in the input
filename before the *first* period, not by stripping the file extension.
So `5. Vlogger Mindset.mp4` produces `5.txt`, `5.srt`, etc. — not
`5. Vlogger Mindset.txt`. For lesson files that start with a number and a
period (the pattern used across these courses), this conveniently means
transcripts land named by lesson number. But it means the transcript
filename alone won't tell you the lesson title if you're looking at the
folder later — cross-reference against the video filenames, or pass
`--output-name "lesson-5"` explicitly per file if that ambiguity becomes a
problem. This was true of the mlx-whisper version installed 2026-09-29;
worth a quick sanity check if it's been a while and the package has updated.

## Gotcha: source files can get renamed mid-batch

While the Vlogging Course batch was running, lesson titles were being
polished in Finder in parallel (e.g. `5. Vlogger Mindset.mp4` became
`5. the vlogger's mindset.mp4`). The already-queued batch job for that file
failed with a "No such file or directory" error — but the wrapper script
still logged `--- Done ---` for it, because the script only tracked
"the command finished running," not "the command succeeded." The batch
completion notification does not mean every file transcribed. **Always grep
the log for `Skipping` or `Error` after a "complete" batch before trusting
it**, and re-run any file that failed under its current, correct filename.

## A note on network access during this session (probably not permanent)

The very first attempt to download `large-v3-turbo`'s weights failed:
`huggingface.co` itself resolved fine, but the model-weight CDN host
(`cdn-lfs.huggingface.co`) failed to resolve at all inside this session's
sandboxed Bash tool — a DNS-level block, not a slow connection. Retrying
with Hugging Face's newer "Xet" transfer backend disabled didn't help
either; it was specifically that CDN hostname being unreachable from inside
the sandbox.

**What worked**: running the download with the sandbox network restriction
lifted for that one call, after which the model weights are cached at
`~/.cache/huggingface/` and every subsequent transcription — including in
a fresh session — runs from cache with no network access needed at all,
sandboxed or not.

This is almost certainly specific to how this particular tool session was
sandboxed, not a fact about this Mac or about Hugging Face. **A future
session should just try the plain download first.** Only reach for a
sandbox-network-bypass option if the exact same symptom shows up (DNS
resolution failing specifically for a CDN/weight-download host, ordinary
web domains resolving fine) — don't assume it's needed by default, and
don't assume the same bypass mechanism will even be the right one if the
tooling has changed.

## Speed

On this Mac (M1 Pro), once the model is cached, transcription runs at
roughly **10-15x realtime** for `large-v3-turbo` — a 20-minute lesson takes
under 2 minutes. Running two transcriptions concurrently (which happened
here, transcribing both courses' batches at once) slows each down somewhat
from resource contention, but both still finished well within one working
session. For reference: this session transcribed ~90 minutes of Vlogging
Course audio and several hours of Learn Storycraft audio, both courses done
inside about half an hour of actual processing time, run in parallel.

## Where output landed (2026-09-29 run)

- `~/Desktop/Vlogging Course/transcripts/` — 8 lessons
- `~/Desktop/Learn Story Craft/transcripts/` — 21 lessons

Same `Desktop/<Course Name>/` pattern as the compressed video output (see
`COURSE-VIDEO-COMPRESSION.md` in this repo) — kept as siblings, out of any
git repo, since these are working files rather than anything that needs
version control.

## Step-by-step for the next course

1. Compress the lessons first (see `COURSE-VIDEO-COMPRESSION.md`) — do this
   before transcribing, not after, so there's no chance of transcribing a
   file that's about to be replaced or renamed.
2. Confirm final filenames are locked in before starting a transcription
   batch, if there's any chance titles are still being edited in parallel.
3. `mkdir -p "~/Desktop/<Course Name>/transcripts"`.
4. Loop the same `mlx_whisper` command over every file in `compressed/`,
   logging to a file rather than watching it live, and run it in the
   background — it's not fast enough to sit and wait for with more than a
   couple of lessons.
5. After it reports done, grep the log for `Skipping`/`Error` before
   trusting the batch actually got everything.
6. From the `.txt` transcripts: write Selar lesson descriptions (a short
   paragraph per lesson summarizing what it teaches, not a dump of the
   transcript), and set the raw transcripts aside as raw material for
   future repurposing — blog posts, social clips, a written companion guide,
   whatever the content plan calls for later.
