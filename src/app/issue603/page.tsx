import * as runtimeNodeMod from "@/../node_modules/cloudflare/_shims/auto/runtime-node";

import Link from "next/link";

export default function Issue603() {
  console.log(runtimeNodeMod);
  return (
    <div>
      If you see this text,{" "}
      <Link href="https://github.com/opennextjs/opennextjs-cloudflare/issues/603">
        issue 603
      </Link>{" "}
      is fixed
    </div>
  );
}
