#!/bin/sh
set -eu

for page in index.html pages/setup.html pages/test.html pages/writer.html; do
  grep -Fq '<meta name="viewport" content="width=device-width, initial-scale=1">' "$page"
  grep -Eq 'src="(\.\./)?js/viewport\.js"' "$page"
done
test -s js/viewport.js
test -s css/style.css
test -s js/script.js
test -s assets/logo.png
