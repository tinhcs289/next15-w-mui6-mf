"use client";

import Grid from "@mui/material/Grid";
import { FormGrid } from "@shared/form";
import useSubmitForm from "../hooks/useSubmitForm";
import ButtonSignIn from "./ButtonSignIn";
import FieldEmail from "./FieldEmail";
import FieldKeepMeSigned from "./FieldKeepMeSigned";
import FieldPassword from "./FieldPassword";
import LinkForgotPassword from "./LinkForgotPassword";
import LinkSignup from "./LinkSignup";

export default function FormSignIn({ returnUrl }: { returnUrl?: string }) {
  const { handleSubmit } = useSubmitForm({ returnUrl });

  return (
    <FormGrid onSubmitForm={handleSubmit} flexDirection="column" gap={2}>
      <Grid size={{ xs: 12 }}>
        <FieldEmail />
      </Grid>
      <Grid size={{ xs: 12 }} position="relative">
        <FieldPassword />
        <LinkForgotPassword />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FieldKeepMeSigned />
      </Grid>
      <ButtonSignIn />
      <LinkSignup />
    </FormGrid>
  );
}
