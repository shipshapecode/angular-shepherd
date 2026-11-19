#!/usr/bin/env bash
# Verifies a packed angular-shepherd tarball works in a fresh Angular app.
#
# Usage: compat/check.sh <angular-version> <path-to-angular-shepherd.tgz> [work-dir]
#   e.g. compat/check.sh 18 ./angular-shepherd-22.0.0.tgz
#
# Steps: `ng new` on the requested Angular version, install the tarball
# (without --legacy-peer-deps, so our peerDependencies range is checked too),
# `ng build`, then load the build in headless Chrome and assert the tour
# step and modal overlay rendered.
#
# Set CHROME to the Chrome binary if it is not `google-chrome` on PATH.
set -euo pipefail

VERSION="$1"
TARBALL="$(cd "$(dirname "$2")" && pwd)/$(basename "$2")"
WORK_DIR="${3:-$(mktemp -d)}"
mkdir -p "$WORK_DIR"
WORK_DIR="$(cd "$WORK_DIR" && pwd)"
COMPAT_DIR="$(cd "$(dirname "$0")" && pwd)"
CHROME="${CHROME:-google-chrome}"
APP="$WORK_DIR/compat-app"
export NG_CLI_ANALYTICS=false

rm -rf "$APP"
cd "$WORK_DIR"

echo "::group::ng new (Angular $VERSION)"
npx -y "@angular/cli@$VERSION" new compat-app \
  --defaults --skip-git --skip-tests --minimal --skip-install --style=css
echo "::endgroup::"

cd "$APP"
echo "::group::npm install"
npm install --no-audit --no-fund
npm install --no-audit --no-fund "$TARBALL"
echo "::endgroup::"

cp "$COMPAT_DIR/main.ts" src/main.ts

echo "Angular $(node -p "require('@angular/core/package.json').version"), TypeScript $(node -p "require('typescript/package.json').version")"

echo "::group::ng build"
npx ng build
echo "::endgroup::"

DIST="$(dirname "$(find dist -name index.html | head -1)")"
PORT=$((20000 + RANDOM % 10000))
python3 -m http.server "$PORT" --directory "$DIST" > /dev/null 2>&1 &
SERVER_PID=$!
trap 'kill $SERVER_PID 2>/dev/null || true' EXIT
sleep 1

DOM="$("$CHROME" --headless=new --disable-gpu --no-sandbox \
  --user-data-dir="$WORK_DIR/chrome-profile" \
  --virtual-time-budget=5000 --dump-dom "http://localhost:$PORT/" 2>/dev/null)"

fail=0
for marker in 'shepherd-element' 'shepherd-modal-overlay-container' 'Compat step'; do
  if grep -q "$marker" <<< "$DOM"; then
    echo "✓ found $marker"
  else
    echo "✗ missing $marker"
    fail=1
  fi
done

if [ "$fail" -ne 0 ]; then
  echo "Rendered DOM:"
  echo "$DOM"
  exit 1
fi
echo "Angular $VERSION: angular-shepherd builds and renders a tour."
