import Button from "@mui/material/Button";
import FacebookIcon from "@shared/svg/FacebookIcon";

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
