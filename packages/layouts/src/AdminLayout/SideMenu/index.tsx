import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CardAlert from "../components/CardAlert";
import MenuContent from "../components/MenuContent";
import OptionsMenu from "../components/OptionsMenu";
import SelectContent from "../components/SelectContent";
import DrawerStyled from "./DrawerStyled";

export default function SideMenu() {
  return (
    <DrawerStyled
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
      }}
      data-aos="fade-in"
      data-aos-easing="ease"
      data-aos-delay="100"
      data-aos-duration="300"
    >
      <Box
        sx={{
          display: "flex",
          mt: "calc(var(--template-frame-height, 0px) + 4px)",
          p: 1.5,
        }}
      >
        <SelectContent />
      </Box>
      <Divider />
      <MenuContent />
      <CardAlert />
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: "center",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Avatar
          sizes="small"
          alt="Riley Carter"
          src="/static/images/avatar/7.jpg"
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ mr: "auto" }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, lineHeight: "16px" }}
          >
            Riley Carter
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            riley@email.com
          </Typography>
        </Box>
        <OptionsMenu />
      </Stack>
    </DrawerStyled>
  );
}