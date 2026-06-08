# Push Rox UI to GitHub

This repo is fully committed locally (branch `main`). I couldn't create/push it
from the build environment because there's no GitHub auth here (`gh` not
installed, no token). Run **one** of the options below from your machine.

## Option A — with GitHub CLI (easiest)
```bash
cd rox-ui
gh repo create rox-ui --public --source=. --remote=origin --push
```
That creates `github.com/<you>/rox-ui` and pushes `main` in one shot.
Use `--private` instead of `--public` if you prefer.

## Option B — plain git
1. Create an empty repo named `rox-ui` on GitHub (no README/license — this repo has them).
2. Then:
```bash
cd rox-ui
git remote add origin git@github.com:<you>/rox-ui.git   # or https://github.com/<you>/rox-ui.git
git push -u origin main
```

## Option C — from the git bundle (full history, no working copy needed)
If you were handed `rox-ui.bundle`:
```bash
git clone rox-ui.bundle rox-ui
cd rox-ui
git remote set-url origin git@github.com:<you>/rox-ui.git   # add if missing
git push -u origin main
```

## After pushing
```bash
cd rox-ui
bun install        # or npm install
bun run typecheck  # tsc --noEmit  → clean
bun run test       # vitest run    → 19 passing
```
