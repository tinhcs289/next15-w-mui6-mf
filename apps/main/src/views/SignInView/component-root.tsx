"use client";

import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import ButtonSubmit from "@shared/buttons/ButtonSubmit";
import { FormGrid } from "@shared/form";
import { AuthContentCard, AuthContentHeading } from "@shared/layouts/AuthLayout";
import FieldEmail from "./components/FieldEmail";
import FieldKeepMeSigned from "./components/FieldKeepMeSigned";
import FieldKeepMeSigned2 from "./components/FieldKeepMeSigned2";
import FieldKeepMeSigned3 from "./components/FieldKeepMeSigned3";
import FieldPassword from "./components/FieldPassword";
import LinkBackToMain from "./components/LinkBackToMain";
import LinkForgotPassword from "./components/LinkForgotPassword";
import LinkSignInWithFacebook from "./components/LinkSignInWithFacebook";
import LinkSignInWithGoogle from "./components/LinkSignInWithGoogle";
import LinkSignup from "./components/LinkSignup";
import useSubmitForm from "./hooks/useSubmitForm";

export default function View() {
  const { handleSubmit } = useSubmitForm();
  return (
    <AuthContentCard>
      <AuthContentHeading>Sign in</AuthContentHeading>
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
        <Grid size={{ xs: 12 }}>
          <FieldKeepMeSigned2 />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <FieldKeepMeSigned3 />
        </Grid>
        <ButtonSubmit fullWidth>Sign in</ButtonSubmit>
        <LinkSignup />
      </FormGrid>
      <Divider>or</Divider>
      <Grid container flexDirection="column" gap={2} width="100%">
        <LinkSignInWithGoogle />
        <LinkSignInWithFacebook />
      </Grid>
      <Divider>
        <LinkBackToMain />
      </Divider>
    </AuthContentCard>
  );
}
