import PATHS from "@/constants/paths";
import { Link } from "@/i18n/navigation";
import Box from "@mui/material/Box";
import Text from "@shared/typo/Text";

export default function LinkSignIn() {
  return (
    <Text sx={{ textAlign: "center", width: "100%" }}>
      Already have an account?{" "}
      <Box component="span">
        <Link
          href={PATHS.signIn}
          title="sign in"
          style={{
            fontWeight: 500,
            color: "var(--template-palette-primary-main)",
          }}
        >
          Sign in
        </Link>
      </Box>
    </Text>
  );
}
