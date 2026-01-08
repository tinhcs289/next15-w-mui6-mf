"use server";

import View from "@/views/SignInView";
import type { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Sign In",
    description: "description",
    other: {
      charset: "utf-8",
    },
  };
}

export default async function Signin() {
  return (
    <Suspense>
      <View />
    </Suspense>
  );
}
