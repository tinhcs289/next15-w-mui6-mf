import Button from "@mui/material/Button";
import FacebookIcon from "@/components/icons/FacebookIcon";

export default function LinkSignInWithFacebook() {
  return (
    <Button
      fullWidth
      variant="outlined"
      startIcon={<FacebookIcon />}
    >
      Sign in with Facebook
    </Button>
  );
}
