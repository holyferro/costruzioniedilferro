#!/usr/bin/env bash
# pnpm sync: are the local checkout, GitHub main, Vercel production and the macserver on the same commit?
# Exit 1 when any of them differs, or when the macserver gave up on the current main.
set -uo pipefail

repo=holyferro/costruzioniedilferro
git fetch -q origin main
main=$(git rev-parse origin/main)
main_checkout=$(git worktree list --porcelain | awk '/^worktree /{p=$2} /^branch refs\/heads\/main$/{print p}')
local_main=$(git rev-parse main 2>/dev/null)
vercel=$(gh api "repos/$repo/deployments?environment=Production&per_page=1" --jq '.[0].sha' 2>/dev/null)
server=$(ssh -o ConnectTimeout=8 macserver 'cat /opt/stacks/edilferro/.deployed-sha' 2>/dev/null)
failed=$(ssh -o ConnectTimeout=8 macserver 'cat /opt/stacks/edilferro/.failed-sha' 2>/dev/null)

bad=0
row() { # label sha
  if [ -z "$2" ]; then printf '%-22s unreachable\n' "$1"; bad=1
  elif [ "$2" = "$main" ]; then printf '%-22s %s ok\n' "$1" "${2:0:7}"
  else printf '%-22s %s BEHIND (main is %s)\n' "$1" "${2:0:7}" "${main:0:7}"; bad=1; fi
}
row "local main" "$local_main"
row "Vercel production" "$vercel"
row "macserver" "$server"
[ "$failed" = "$main" ] && { echo "macserver: build of ${main:0:7} FAILED, old site still online (log: /opt/stacks/edilferro/deploy.log)"; bad=1; }
[ -n "$main_checkout" ] && [ -n "$(git -C "$main_checkout" status --porcelain)" ] && echo "note: $main_checkout has uncommitted changes"
[ "$bad" = 0 ] && echo "all in sync" || echo "not in sync: server catches up within 2 min of a merge; fix local with: git -C ${main_checkout:-<main checkout>} pull --ff-only"
exit "$bad"
