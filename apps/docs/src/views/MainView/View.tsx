import Box from "@mui/material/Box";
import { H1 } from "@repo/share-react/components/typo/h-tags";
import ConsoleLog from "./ConsoleLog";

export default function View() {
  return (
    <Box
      minHeight="100svh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <H1>Main view of Docs</H1>
      <br />
      <ConsoleLog />
    </Box>
  );
}
