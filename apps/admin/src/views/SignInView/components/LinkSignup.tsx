import PATHS from "@/constants/paths";
import { ZONE_NAME } from "@/constants/zone";
import Box from "@mui/material/Box";
import { ZoneLink } from "@shared/navigation";
import Text from "@shared/typo/Text";

export default function LinkSignup() {
  return (
    <Text sx={{ textAlign: "center", width: "100%" }}>
      Don&apos;t have an account?{" "}
      <Box component="span">
        <ZoneLink
          currentZone={ZONE_NAME}
          href={PATHS.signUp}
          title="sign up"
          style={{
            fontWeight: 500,
            color: "var(--template-palette-primary-main)",
          }}
        >
          Sign up
        </ZoneLink>
      </Box>
    </Text>
  );
}
