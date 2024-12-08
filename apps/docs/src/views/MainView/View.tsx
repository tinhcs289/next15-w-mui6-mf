import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function View() {
  return (
    <Box
      minHeight="100svh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Typography component="h1">Main view of Docs</Typography>
    </Box>
  );
}
