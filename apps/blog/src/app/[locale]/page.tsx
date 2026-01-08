import MainView from "@/views/MainView/View";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Blog",
  description: "description",
  other: {
    charset: "utf-8",
  },
};

export default function Home() {
  return (
    <Suspense>
      <MainView />
    </Suspense>
  );
}
