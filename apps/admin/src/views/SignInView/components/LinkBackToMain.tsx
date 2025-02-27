import { Link } from "@/i18n/navigation";
import Box from "@mui/material/Box";
import Text from "@shared/typo/Text";

export default function LinkBackToMain() {
  return (
    <Text sx={{ textAlign: "center", width: "100%" }}>
      <Box component="span">
        <Link
          href="/"
          title="Back to home page"
          style={{
            fontWeight: 500,
            color: "var(--template-palette-primary-main)",
          }}
        >
          Back to home page
        </Link>
      </Box>
    </Text>
  );
}
