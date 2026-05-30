#!/usr/bin/env bash
# Dev / ops helper for the Storybook design-kit catalog.
#
# Wraps the repetitive multi-step commands (restart, cache clear, Tailscale serve)
# behind single subcommands so they're one repeatable action each. Invoked through
# the package.json scripts (e.g. `pnpm run sb:restart`).
#
#   Storybook binds loopback :6066; Tailscale serves TLS :6006 -> :6066
#   (decoupled because `tailscale serve` reserves :6006 on the node, which would
#   block Storybook's 0.0.0.0:6006 bind).
set -uo pipefail

LOCAL_PORT=6066    # Storybook dev server (HMR), loopback
PUBLIC_PORT=6006   # Tailscale TLS for the dev server
DEMO_PORT=6100     # static demo build — loopback + Tailscale TLS (unique port)
STATIC_DIR=dist/storybook
SB="./node_modules/.bin/storybook"

# Always operate from the web/ project root, regardless of caller cwd.
cd "$(dirname "$0")/.." || exit 1

free_port() { lsof -ti "tcp:$1" 2>/dev/null | xargs kill -9 2>/dev/null || true; }

stop() {
  pkill -f "storybook dev" 2>/dev/null || true
  free_port "$LOCAL_PORT"
  echo "OK: Storybook stopped (port $LOCAL_PORT freed)"
}

start() {
  echo "--> Storybook: http://127.0.0.1:$LOCAL_PORT"
  exec "$SB" dev -p "$LOCAL_PORT" --host 127.0.0.1 --no-open
}

restart() { stop; sleep 1; start; }

clean() {
  rm -rf node_modules/.cache/storybook node_modules/.vite "$STATIC_DIR"
  echo "OK: cleared Storybook/Vite caches and build output"
}

serve_up() {
  tailscale serve --bg --https="$PUBLIC_PORT" "http://127.0.0.1:$LOCAL_PORT"
  tailscale serve status
}

serve_down() {
  tailscale serve --https="$PUBLIC_PORT" off
  echo "OK: Tailscale serve on :$PUBLIC_PORT disabled"
}

status() {
  echo "== Tailscale serve =="
  tailscale serve status || true
  echo "== local :$LOCAL_PORT =="
  curl -sS -o /dev/null -w "  HTTP %{http_code}\n" "http://127.0.0.1:$LOCAL_PORT/" || echo "  (down)"
}

# --- Static demo: a production storyboard build served on its own port,
#     independent of the HMR dev server. Public at the Tailscale DNS name :$DEMO_PORT.
demo_build() { "$SB" build -o "$STATIC_DIR"; }

demo_serve() {
  [ -d "$STATIC_DIR" ] || demo_build
  echo "--> Demo (static): http://127.0.0.1:$DEMO_PORT"
  exec python3 -m http.server "$DEMO_PORT" --bind 127.0.0.1 --directory "$STATIC_DIR"
}

demo_stop() {
  pkill -f "http.server $DEMO_PORT" 2>/dev/null || true
  free_port "$DEMO_PORT"
  echo "OK: demo static server stopped (:$DEMO_PORT)"
}

demo_up() {   # build (if needed) + Tailscale TLS + serve
  [ -d "$STATIC_DIR" ] || demo_build
  tailscale serve --bg --https="$DEMO_PORT" "http://127.0.0.1:$DEMO_PORT"
  tailscale serve status
  demo_serve
}

demo_down() {
  tailscale serve --https="$DEMO_PORT" off
  demo_stop
}

case "${1:-start}" in
  start)      start ;;
  stop)       stop ;;
  restart)    restart ;;
  clean)      clean ;;
  reset)      stop; clean; sleep 1; start ;;   # nuke caches then restart
  serve-up)   serve_up ;;
  serve-down) serve_down ;;
  status)     status ;;
  up)         serve_up; start ;;               # Tailscale proxy + Storybook (dev)
  demo-build) demo_build ;;
  demo)       demo_serve ;;                     # serve the static build (loopback)
  demo-up)    demo_up ;;                        # build + Tailscale TLS + serve (the demo service)
  demo-down)  demo_down ;;
  demo-stop)  demo_stop ;;
  *)
    echo "usage: dev.sh {start|stop|restart|clean|reset|serve-up|serve-down|status|up|demo|demo-build|demo-up|demo-down|demo-stop}"
    exit 1
    ;;
esac
