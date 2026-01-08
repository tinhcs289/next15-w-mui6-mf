"use client";

import { useGetAuthState } from "@packages/auth";
import {
  AuthContentCard,
  AuthContentHeading,
} from "@shared/layouts/AuthLayout";
import wait from "@packages/utils/async/wait";
import { useEffect } from "react";

export default function View() {
  const saveAuthToStore = useGetAuthState(s => s?.saveAuthToStore);

  useEffect(() => {
    if (!saveAuthToStore) return;

    const signOut = async () => {
      await wait(2000);
      saveAuthToStore(null);
    }

    signOut();
  }, [saveAuthToStore]);

  return (
    <AuthContentCard>
      <AuthContentHeading>Signing out...</AuthContentHeading>
    </AuthContentCard>
  );
}
