import View from "@/views/SignUpView";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Sign Up",
    description: "description",
    other: {
      charset: "utf-8",
    },
  };
}
export default function SignupPage() {
  return (
    <View />
  );
}
