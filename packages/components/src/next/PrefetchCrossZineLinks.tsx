import type { ScriptProps } from "next/script";
import Script from "next/script";

export type PrefetchCrossZoneLinksProps = ScriptProps & {
  zone?: string;
  hrefs?: string[];
};

/**
 * Component that prefetches and prerenders cross-zone links using the
 * Speculation Rules API: https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API.
 *
 * Since it is a hard navigation when a user crosses between zones, this
 * component can reduce the performance impact of that navigation by making
 * sure that the cross-zone links on the page are prefetched and/or prerendered
 * before the user clicks on them.
 */
export default function PrefetchCrossZoneLinks({
  zone,
  hrefs = [],
  ...otherProps
}: PrefetchCrossZoneLinksProps) {
  // Prefetch links when the user hovers over them and prerender the link
  // when the pointerdown event is received.
  const speculationRules = {
    prefetch: [{ source: "list", eagerness: "moderate", urls: [...hrefs] }],
    prerender: [
      { source: "list", eagerness: "conservative", urls: [...hrefs] },
    ],
  };

  return (
    <Script
      id={`prefetch-cross-zones-links--${zone}`}
      type="speculationrules"
      {...otherProps}
      dangerouslySetInnerHTML={{
        __html: `${JSON.stringify(speculationRules)}`,
      }}
    />
  );
}
