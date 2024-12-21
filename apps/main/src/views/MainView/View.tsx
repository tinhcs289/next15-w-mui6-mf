import Box from "@mui/material/Box";
import { H1 } from "@repo/share-react/components/typo/h-tags";
import ConsoleLog from "./ConsoleLog";
import DemoTable from "./DemoTable";

export default function View() {
  return (
    <Box
      minHeight="100svh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      p={16}
    >
      <H1>Main view of Main</H1>
      <br />
      <ConsoleLog />
      <DemoTable />
    </Box>
  );
}
