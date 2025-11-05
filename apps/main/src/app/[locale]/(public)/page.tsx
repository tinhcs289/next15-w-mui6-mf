import MainView from "@/views/MainView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "description",
  other: {
    charset: "utf-8",
  },
};

export default function Home() {
  return <MainView />;
};
