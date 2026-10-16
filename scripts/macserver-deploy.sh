#!/usr/bin/env bash
# scripts/macserver-deploy.sh
# Auto-deploy of the macserver mirror: rebuilds the edilferro-web container whenever
# origin/main changes, so the self-hosted copy follows Vercel production by itself.
#
# Install (from the Mac):
#   scp scripts/macserver-deploy.sh macserver:/opt/stacks/edilferro/deploy.sh
#   ssh macserver 'chmod +x /opt/stacks/edilferro/deploy.sh'
#   crontab line on macserver:
#   */2 * * * * /opt/stacks/edilferro/deploy.sh >> /opt/stacks/edilferro/deploy.log 2>&1
set -euo pipefail

STACK=/opt/stacks/edilferro
REPO_URL=https://github.com/holyferro/costruzioniedilferro.git

cd "$STACK"
exec 9>.deploy.lock
flock -n 9 || exit 0 # a build is already running

[ -d repo ] || git clone -q "$REPO_URL" repo
git -C repo fetch -q origin main
sha=$(git -C repo rev-parse origin/main)

[ "$sha" = "$(cat .deployed-sha 2>/dev/null)" ] && exit 0
[ "$sha" = "$(cat .failed-sha 2>/dev/null)" ] && exit 0 # don't rebuild a broken commit every 2 minutes

echo "$(date -Is) deploy $sha"
rm -rf src.new && mkdir src.new
git -C repo archive "$sha" | tar -x -C src.new
rm -rf src.prev && mv src src.prev && mv src.new src

# compose builds before replacing the container: if the build fails the old site keeps running.
if docker compose up -d --build --quiet-pull; then
  echo "$sha" > .deployed-sha
  echo "$(date -Is) ok $sha"
else
  rm -rf src && mv src.prev src
  echo "$sha" > .failed-sha
  echo "$(date -Is) FAILED $sha, previous version still online"
fi
