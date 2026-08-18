#!/usr/bin/env bash
set -euo pipefail

# Idempotent dependency setup for the Dokkani React Native app.
#
# React Native 0.57 ships Metro 0.48, whose transform worker crashes on modern
# Node ("Cannot read properties of undefined (reading 'transformFile')").
# All React Native tooling (Metro bundler / dev server) therefore runs on an
# older Node (10.x), while dependency installation uses the base image's
# default Node + Yarn.

export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  # shellcheck disable=SC1091
  . "$NVM_DIR/nvm.sh"
fi

# 1) Install JS dependencies with the default Node/Yarn from the base image.
#    Sourcing nvm above does not switch the active Node, so Yarn stays on PATH.
yarn install --frozen-lockfile

# 2) Ensure Node 10 is available for the React Native 0.57 Metro tooling.
#    This is baked into the environment build snapshot so the Metro terminal
#    can start without any per-boot download. `nvm install` is a no-op when the
#    version is already present, keeping this script idempotent.
if command -v nvm >/dev/null 2>&1; then
  nvm install 10 >/dev/null
else
  echo "warning: nvm not found at $NVM_DIR; Metro requires Node 10.x" >&2
fi
