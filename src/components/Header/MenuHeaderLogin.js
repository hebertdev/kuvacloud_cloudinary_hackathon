import { useContext } from "react";

//nextjs
import Link from "next/link";
import { useRouter } from "next/router";

//context
import UserContext from "contexts/UserContext";

import {
  List,
  Divider,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";

import CloudIcon from "@mui/icons-material/Cloud";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import ConstructionIcon from "@mui/icons-material/Construction";
import LogoutIcon from "@mui/icons-material/Logout";

export function MenuHeaderLogin() {
  const router = useRouter();
  const { logout } = useContext(UserContext);
  return (
    <>
      <Divider />
      <List>
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
            component={Link}
            href="/"
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <ConstructionIcon
                color={`${router.asPath === "/" && "primary"}`}
              />
            </ListItemIcon>
            <ListItemText
              primary={"Herramientas"}
              sx={{ opacity: open ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
            component={Link}
            href="/cloudinary"
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <CloudIcon
                color={`${router.asPath === "/cloudinary" && "primary"}`}
              />
            </ListItemIcon>
            <ListItemText
              primary={"Mi cloudinary"}
              sx={{ opacity: open ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
            component={Link}
            href="/my-drive"
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <AutoAwesomeMosaicIcon
                color={`${router.asPath === "/my-drive" && "primary"}`}
              />
            </ListItemIcon>
            <ListItemText
              primary={"Mis cambios"}
              sx={{ opacity: open ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
            onClick={logout}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
}
