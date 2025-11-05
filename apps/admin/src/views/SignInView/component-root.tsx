import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import {
  AuthContentCard,
  AuthContentHeading,
} from "@shared/layouts/AuthLayout";
import FormSignIn from "./components/FormSignIn";
import LinkSignInWithFacebook from "./components/LinkSignInWithFacebook";
import LinkSignInWithGoogle from "./components/LinkSignInWithGoogle";
import { SignInViewStatesProvider } from "./context";

export default function View({ returnUrl }: { returnUrl?: string }) {
  return (
    <SignInViewStatesProvider>
      <AuthContentCard>
        <AuthContentHeading>Sign in</AuthContentHeading>
        <FormSignIn returnUrl={returnUrl} />
        <Divider>or</Divider>
        <Grid container flexDirection="column" gap={2} width="100%">
          <LinkSignInWithGoogle />
          <LinkSignInWithFacebook />
        </Grid>
      </AuthContentCard>
    </SignInViewStatesProvider>
  );
}
