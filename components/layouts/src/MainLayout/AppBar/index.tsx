import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import AppbarDrawer from "./AppbarDrawer";
import ButtonCloseAppbar from "./ButtonCloseAppbar";
import ButtonOpenAppbar from "./ButtonOpenAppbar";
import ButtonSignIn from "./ButtonSignIn";
import ButtonSignUp from "./ButtonSignUp";
import ColorModeIconDropdown from "./ColorModeIconDropdown";
import NavigationItems, { NavigationItemsMobile } from "./NavigationItems";
import SitemarkIcon from "./SitemarkIcon";
import StyledToolbar from "./StyledToolbar";

export default async function AppBar() {
  return (
    <MuiAppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 28px)",
      }}
      data-aos="fade-down"
      data-aos-easing="ease"
      data-aos-delay="200"
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
          >
            <SitemarkIcon />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <NavigationItems />
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            <ButtonSignIn />
            <ButtonSignUp />
            <ColorModeIconDropdown />
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
            <ColorModeIconDropdown size="medium" />
            <ButtonOpenAppbar />
            <AppbarDrawer>
              <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <ButtonCloseAppbar />
                </Box>

                <NavigationItemsMobile />
                <Divider sx={{ my: 3 }} />
                <MenuItem>
                  <ButtonSignUp mobile />
                </MenuItem>
                <MenuItem>
                  <ButtonSignIn mobile />
                </MenuItem>
              </Box>
            </AppbarDrawer>
          </Box>
        </StyledToolbar>
      </Container>
    </MuiAppBar>
  );
}
