import { Link } from "@/i18n/navigation";
import Box from "@mui/material/Box";
import Text from "@shared/typo/Text";
export default function LinkSignup() {
  return (
    <Text sx={{ textAlign: "center", width: "100%" }}>
      Don&apos;t have an account?{" "}
      <Box component="span">
        <Link
          href="/sign-up"
          title="sign up"
          style={{
            fontWeight: 500,
            color: "var(--template-palette-primary-main)",
          }}
        >
          Sign up
        </Link>
      </Box>
    </Text>
  );
}
