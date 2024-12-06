import type { ScriptProps } from "next/script";

export type PrefetchCrossZoneLinksProps = ScriptProps & {
  zone?: string
  hrefs?: string[]
}