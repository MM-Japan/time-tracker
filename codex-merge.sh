#!/bin/bash

# Script to automatically fetch and merge Codex changes.
# Usage: ./codex-merge.sh <codex-branch-name>
set -e

BRANCH="$1"
if [ -z "$BRANCH" ]; then
  echo "Usage: $0 <codex-branch-name>" >&2
  exit 1
fi

git fetch origin "$BRANCH"
if ! git merge -X theirs "origin/$BRANCH" --no-edit; then
  git checkout --theirs .
  git add .
  git commit -m "Auto-resolve using Codex changes"
fi

