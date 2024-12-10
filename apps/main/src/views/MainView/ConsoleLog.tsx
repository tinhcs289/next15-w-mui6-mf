"use client";

import { usePathname } from "@/i18n/navigation"
import Typo from "@repo/share-react/components/typo/Typo";
import { useEffect, useState } from "react";

export default function ConsoleLog() {
  const pathname = usePathname();

  const [text, setText] = useState(pathname);

  useEffect(() => {
    setText(pathname);
  }, [pathname]);

  return <Typo>Current pathname: {text}</Typo>
}