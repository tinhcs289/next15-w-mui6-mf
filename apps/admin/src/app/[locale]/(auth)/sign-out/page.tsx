"use server";

import View from "@/views/SignOutView";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Signing out ...",
    description: "description",
    other: {
      charset: "utf-8",
    },
  };
}

export default async function Signout() {
  return <View />;
}
