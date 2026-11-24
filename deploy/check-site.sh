#!/bin/sh
set -eu

for page in index.html pages/setup.html pages/test.html pages/writer.html; do
  grep -Fq '<meta name="viewport" content="width=1680">' "$page"
done
test -s css/style.css
test -s js/script.js
test -s assets/logo.png
