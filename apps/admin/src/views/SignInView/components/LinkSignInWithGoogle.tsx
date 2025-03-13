import GoogleIcon from "@/components/icons/GoogleIcon";
import Button from "@mui/material/Button";

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
