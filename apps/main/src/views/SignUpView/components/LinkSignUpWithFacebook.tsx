import Button from "@mui/material/Button";
import FacebookIcon from "@shared/svg/FacebookIcon";

export default function LinkSignUpWithFacebook() {
  return (
    <Button
      fullWidth
      variant="outlined"
      startIcon={<FacebookIcon />}
    >
      Sign up with Facebook
    </Button>
  );
}
