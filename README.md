# opennextjs-cloudflare-603

To reproduce https://github.com/opennextjs/opennextjs-cloudflare/issues/603 :

1. Clone this project
2. `npm install`
3. `npm run preview`

Then goto http://localhost:8787/issue603 for errors.

Goto http://localhost:8787/ for workarounds.

## How to workaround this issue

If package `cloudflare` caused this error,
see [`next.config.ts`](next.config.ts) for a workaround.

## How this workaround works

This error is caused by the following steps:

1. We import `cloudflare` in our app.
2. `./node_modules/cloudflare/core.mjs` imports `./node_modules/cloudflare/_shims/index.mjs`, which imports `cloudflare/_shims/auto/runtime`
3. `cloudflare/_shims/auto/runtime` get resolved to `./node_modules/cloudflare/_shims/auto/runtime-node.mjs`. (Defined by `cloudflare/package.json` when `node` condition is `true`. I don't know why nextjs compiler chooses `node` over `browser`.)
4. `./node_modules/cloudflare/_shims/auto/runtime-node.mjs` constructs `new new KeepAliveAgent.HttpsAgent(...)` at the module level as a default value, even that value might not be used when overridden.
5. The constructor of `HttpsAgent` from package `keepaliveagent` fails in workers runtime because it relies on `node:http.Agent`'s constructor to set `this.options` to an object. However, `node:http.Agent` from workers runtime doesn't align with this behavior.

This is why `npm run preview` fails on any page which imports `cloudflare`.
`next dev` and `next build` works because they have real `node:http`.

The workaround is to force `cloudflare/_shims/auto/runtime` to be resolved to web runtime when compiling.
