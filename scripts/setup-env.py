"""Run in your own terminal. Collect credentials without echoing them."""
import getpass
import os
from pathlib import Path
import sys
import warnings

ROOT = Path(__file__).resolve().parents[1]
NAMES = """BITGET_QWEN_API_KEY NEXT_PUBLIC_PRIVY_APP_ID PRIVY_APP_SECRET
NEXT_PUBLIC_SUPABASE_URL NEXT_PUBLIC_SUPABASE_ANON_KEY SUPABASE_SERVICE_ROLE_KEY
FINNHUB_API_KEY BITGET_WALLET_API_KEY BITGET_WALLET_API_SECRET SEC_USER_AGENT
NEXT_PUBLIC_BITGET_REDIRECT_URL""".split()


def main():
    if not sys.stdin.isatty():
        raise SystemExit("Run this script in an interactive terminal.")
    target = ROOT / ".env.local"
    if target.exists():
        raise SystemExit(".env.local already exists; leaving it unchanged.")
    warnings.simplefilter("error", getpass.GetPassWarning)
    values = {}
    for name in NAMES:
        value = os.environ.get(name, "").strip()
        while not value:
            value = getpass.getpass(name + " (hidden): ").strip()
        if any(c in value for c in '\n\r\x00'):
            raise SystemExit("Invalid multiline input for " + name)
        values[name] = value
    values.update(
        QWEN_BASE_URL=os.environ.get("QWEN_BASE_URL") or "https://hackathon.bitgetops.com/v1",
        QWEN_MODEL=os.environ.get("QWEN_MODEL") or "qwen3.8-max",
        NEXT_PUBLIC_APP_URL=os.environ.get("NEXT_PUBLIC_APP_URL") or "http://localhost:3000",
    )
    def quote(value):
        return '"' + value.replace('\\', '\\\\').replace('"', '\\"').replace('$', '\\$') + '"'
    fd = os.open(target, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
    with os.fdopen(fd, "w") as output:
        for name, value in values.items():
            output.write(name + "=" + quote(value) + "\n")
    os.chmod(target, 0o600)
    present = set()
    for line in target.read_text().splitlines():
        name, sep, value = line.partition("=")
        if sep and value.strip().strip('"'):
            present.add(name)
    for name in NAMES:
        print(name + (": configured" if name in present else ": missing"))


if __name__ == "__main__":
    try:
        main()
    except (KeyboardInterrupt, EOFError):
        raise SystemExit("\nSetup cancelled.")
