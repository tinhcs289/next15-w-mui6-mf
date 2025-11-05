"use client";

import ButtonSubmit from "@shared/buttons/ButtonSubmit";
import { useGetSignInViewState } from "../context";

export default function ButtonSignIn() {
  const loading = useGetSignInViewState((s) => !!s?.submitting);

  return (
    <ButtonSubmit fullWidth loading={loading}>
      Sign in
    </ButtonSubmit>
  );
}
