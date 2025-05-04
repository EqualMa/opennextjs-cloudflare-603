import Link from "next/link";

import Cloudflare from "cloudflare";

export default async function Home() {
  console.log(`Cloudflare works as class ${Cloudflare.name}`);
  return (
    <div>
      This page works because we force{" "}
      <code>cloudflare/_shims/auto/runtime</code> to be resolved to{" "}
      <code>node_modules/cloudflare/_shims/auto/runtime.mjs</code>
      .
      <br />
      <br />
      Goto <Link href="/issue603">/issue603</Link> for error.
    </div>
  );
}
