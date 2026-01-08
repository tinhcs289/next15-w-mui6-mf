"use server";

import View from "@/views/SignUpView";
import type { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Sign Up",
    description: "description",
    other: {
      charset: "utf-8",
    },
  };
}

export default async function Signup() {
  return (
    <Suspense>
      <View />
    </Suspense>
  );
}
