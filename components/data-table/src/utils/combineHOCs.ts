import type { ComponentType } from "react";

export default function combineHOCs<Props>(
  ...hocs: Array<(comp: ComponentType<Props>) => ComponentType<Props>>
) {
  return hocs.reverse().reduceRight((h, g) => (p) => h(g(p)));
}