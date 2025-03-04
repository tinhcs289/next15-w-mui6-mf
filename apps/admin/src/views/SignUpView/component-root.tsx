"use client";

import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid2";
import ButtonSubmit from "@shared/buttons/ButtonSubmit";
import { FormGrid } from "@shared/form";
import { AuthContentCard, AuthContentHeading } from "@shared/layouts/AuthLayout";
import FieldEmail from "./components/FieldEmail";
import FieldFullName from "./components/FieldFullName";
import FieldIAcceptWithTheTermsAndConditions from "./components/FieldIAcceptWithTheTermsAndConditions";
import FieldPassword from "./components/FieldPassword";
import FieldPasswordReEnter from "./components/FieldPasswordReEnter";
import LinkSignIn from "./components/LinkSignIn";
import LinkSignUpWithFacebook from "./components/LinkSignUpWithFacebook";
import LinkSignUpWithGoogle from "./components/LinkSignUpWithGoogle";
import useSubmitForm from "./hooks/useSubmitForm";

export default function View() {
  const { handleSubmit } = useSubmitForm();
  return (
    <AuthContentCard>
      <AuthContentHeading>Sign up</AuthContentHeading>
      <FormGrid onSubmitForm={handleSubmit} flexDirection="column" gap={2}>
      <Grid size={{ xs: 12 }}>
          <FieldFullName />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <FieldEmail />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <FieldPassword />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <FieldPasswordReEnter />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <FieldIAcceptWithTheTermsAndConditions />
        </Grid>
        <ButtonSubmit fullWidth>Sign in</ButtonSubmit>
        <LinkSignIn />
      </FormGrid>
      <Divider>or</Divider>
      <Grid container flexDirection="column" gap={2} width="100%">
        <LinkSignUpWithGoogle />
        <LinkSignUpWithFacebook />
      </Grid>
    </AuthContentCard>
  );
}
