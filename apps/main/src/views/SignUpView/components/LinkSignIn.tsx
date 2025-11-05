import Box from "@mui/material/Box";
import { ZoneLink } from "@shared/navigation";
import Text from "@shared/typo/Text";

export default function LinkSignIn() {
  return (
    <Text sx={{ textAlign: "center", width: "100%" }}>
      Already have an account?{" "}
      <Box component="span">
        <ZoneLink
          href="/sign-in"
          title="sign in"
          style={{
            fontWeight: 500,
            color: "var(--template-palette-primary-main)",
          }}
        >
          Sign in
        </ZoneLink>
      </Box>
    </Text>
  );
}
