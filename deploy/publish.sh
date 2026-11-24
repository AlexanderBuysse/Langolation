#!/bin/sh
set -eu

slug=langolation
site=langolation
root="$HOME/domains/alexanderbuysse.be/public_html"
checkout="$HOME/repositories/$slug"
lock="$HOME/.deploy-$slug.lock"

test -z "${SSH_ORIGINAL_COMMAND:-}"
mkdir "$lock"
trap 'rmdir "$lock"' EXIT
trap 'exit 1' HUP INT TERM

mkdir -p "$HOME/repositories"
if [ ! -d "$checkout/.git" ]; then
  git clone -b main "github-$slug:AlexanderBuysse/Langolation.git" "$checkout"
fi
cd "$checkout"
git fetch origin main
git reset --hard FETCH_HEAD
sh deploy/check-site.sh

mkdir -p "$root/$site"
rsync -a --delete --exclude='.*' --exclude='/deploy/' --exclude='/README.md' \
  "$checkout/" "$root/$site/"

rule='RewriteRule ^langolation(?:/|$) - [L]'
if ! grep -Fxq "$rule" "$root/.htaccess"; then
  backup="$HOME/.htaccess.before-$site-$(date +%s)"
  cp -p "$root/.htaccess" "$backup"
  next=$(mktemp "$root/.htaccess.$site.XXXXXX")
  { printf 'RewriteEngine On\n%s\n' "$rule"; cat "$backup"; } > "$next"
  chmod --reference="$backup" "$next"
  mv -f "$next" "$root/.htaccess"
fi

printf 'Published %s at ' "$site"
git rev-parse HEAD
