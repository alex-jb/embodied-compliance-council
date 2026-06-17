#!/bin/bash
# Build Katz RFP PDFs from markdown sources.
# Pipeline: pandoc → standalone HTML with linked print CSS → Chrome headless → PDF.

set -e

HERE="$(cd "$(dirname "$0")" && pwd)"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

cd "$HERE"

for md in 01-cover-page 02-narrative-v0 03-budget-narrative 04-bios; do
  src="$md.md"
  html="$md.html"
  pdf="$md.pdf"
  if [ ! -f "$src" ]; then
    echo "skip: $src not found"
    continue
  fi
  pandoc "$src" \
    --from markdown \
    --to html5 \
    --standalone \
    --include-in-header _header.html \
    -o "$html"
  "$CHROME" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="$pdf" "file://$HERE/$html" 2>/dev/null
  echo "✓ $pdf"
done

echo ""
echo "Done. PDFs in $HERE:"
ls -lh "$HERE"/*.pdf 2>/dev/null
