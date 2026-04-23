# Logo assets

Drop the eXcelerate Learning brand files in this folder. The HTML references these paths:

| File | Where it's used | Recommended dimensions |
|---|---|---|
| `excelerate-mark.png` (or `.svg`) | Nav bar (top of every page) and footer brand block | Square — 512×512 minimum for the PNG, or SVG |
| `excelerate-logo-full.png` (or `.svg`) | Reserved for future use (e.g. social share cards, favicons, light backgrounds) | 1:1 square with wordmark + tagline |

## Paths referenced in HTML

- `assets/logos/excelerate-mark.png` — nav + footer
- `assets/logos/excelerate-logo-full.png` — not yet wired in

## Swapping in GitHub-hosted URLs

Once this repo is on GitHub, each `<img src="assets/logos/...">` in the HTML can stay as-is (relative path) OR be swapped for the raw GitHub URL:

```
https://raw.githubusercontent.com/<username>/<repo>/main/assets/logos/excelerate-mark.png
```

Look for `<!-- ✏️ EDIT: logo src -->` markers in the HTML.
