import Button from "@mui/material/Button";
import FacebookIcon from "@/components/icons/FacebookIcon";

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
