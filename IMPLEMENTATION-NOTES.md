# Implementation notes

- The installed `@bitget-wallet/api` package requires `apiKey` on the client options even when the documented `createSigningFetch` wrapper is present. Fisk supplies the key to both SDK mechanisms; signing remains exclusively inside the official wrapper and the secret remains server-only.
- Bitget Signal is installed in the Codex host as five official research skills plus its public HTTP MCP registration. The deployed Next.js runtime does not claim direct MCP access; its core path uses explicit server adapters, while the demonstrated research activity records Signal as host-assisted context only when actually invoked.
- Until `NEXT_PUBLIC_BITGET_REDIRECT_URL` is supplied, outbound links use Bitget’s public home page and do not attach user or tracking data.
- Next.js type validation is run explicitly with `npm run typecheck`; `next.config.ts` disables Next’s duplicate pass because Next 16 failed to parse TypeScript CLI output under this workspace runtime. The production app is pinned to a patched Next.js 15 release.
