import Button from "@mui/material/Button";
import GoogleIcon from "@shared/svg/GoogleIcon";

export default function LinkSignInWithGoogle() {
  return (
    <Button
    fullWidth
    variant="outlined"
    startIcon={<GoogleIcon />}
  >
    Sign in with Google
  </Button>
  );
}
