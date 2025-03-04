import GoogleIcon from "@/components/icons/GoogleIcon";
import Button from "@mui/material/Button";

export default function LinkSignUpWithGoogle() {
  return (
    <Button
    fullWidth
    variant="outlined"
    startIcon={<GoogleIcon />}
  >
    Sign up with Google
  </Button>
  );
}
