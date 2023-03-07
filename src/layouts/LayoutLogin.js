//components
import { HeaderLogin } from "components/Header";

import { Box, CssBaseline, Container } from "@mui/material";

import { DrawerHeader } from "components/Header/HeaderLogin";

export default function LayoutLogin({ children }) {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <HeaderLogin />
      <Box
        component="main"
        sx={{
          maxWidth: "100%",
          p: 2,
          flexGrow: 1,
          overflow: "hidden",
        }}
      >
        <DrawerHeader />
        <Container disableGutters>{children}</Container>
      </Box>
    </Box>
  );
}
