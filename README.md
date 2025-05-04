# opennextjs-cloudflare-603

To reproduce https://github.com/opennextjs/opennextjs-cloudflare/issues/603 :

1. Clone this project
2. `npm install`
3. `npm run preview`

Then goto http://localhost:8787/issue603 for errors.

Goto http://localhost:8787/ for workarounds.

## How workaround works

`next dev` and `next build` doesn't error because they have real `node:http`.
`npm run preview` has error because workers runtime provides incompatible `Agent` constructor in `node:http`.

If you use package `cloudflare`, the node runtime shim get imported, where
some code fails because `node:http.Agent.options` is undefined in workers runtime.

The workaround is to force `cloudflare/_shims/auto/runtime` to be resolved to web runtime when compiling.

See [`next.config.ts`](next.config.ts) for how to apply this workaround.
