import { useState, useEffect, useContext } from "react";

//nextjs
import Link from "next/link";

//contexts
import UserContext from "contexts/UserContext";
import DarkModeContext from "contexts/DarkModeContext";

//helpers
import { setStatus, getStatus } from "helpers/header";

//components
import { MenuHeaderLogin } from "./MenuHeaderLogin";
import { ButtonCloudinary } from "./ButtonCloudinary";

//material ui
import { styled } from "@mui/material/styles";
import {
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  AppBar,
  Button,
  Drawer,
} from "@mui/material";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";

const drawerWidth = 190;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBarMui = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const MuiDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export function HeaderLogin() {
  const { user } = useContext(UserContext);
  const { theme } = useContext(DarkModeContext);
  const [open, setOpen] = useState(false);
  const [headerStyles, setHeaderStyle] = useState({
    background: "#090909",
    color: "white",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  });

  useEffect(() => {
    setHeaderStyle({
      background: `${theme.palette.mode === "dark" ? "#090909" : "white"}`,
      color: "#090909",
      borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    });
  }, [theme.palette.mode]);

  useEffect(() => {
    const initialStatus = getStatus();
    if (initialStatus) {
      setOpen(initialStatus === "open");
    }
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
    setStatus("open");
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setStatus("close");
  };
  return (
    <>
      <AppBarMui position="fixed" open={open} sx={headerStyles} elevation={0}>
        <Toolbar>
          {open ? (
            <IconButton
              onClick={handleDrawerClose}
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{
                marginRight: 3,
              }}
            >
              {theme.direction === "rtl" ? (
                <MenuOpenOutlinedIcon />
              ) : (
                <MenuOpenOutlinedIcon />
              )}
            </IconButton>
          ) : (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 3,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component={Link}
              href="/"
              sx={{
                color: "inherit",
              }}
            >
              Kuvacloud
            </Typography>

            <Box>
              <ButtonCloudinary />
              <Button
                startIcon={
                  <Avatar
                    src={user?.profile?.avatar}
                    sx={{
                      width: "30px",
                      height: "30px",
                    }}
                  />
                }
                endIcon={<ArrowDropDownIcon />}
              >
                MENU
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBarMui>
      <MuiDrawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <MenuHeaderLogin />
      </MuiDrawer>
    </>
  );
}
