import { useState, useEffect, useContext } from "react";

//next
import { useRouter } from "next/router";

//services
import { getToken } from "helpers/auth";
import { whoami } from "services/accounts";

//contexts
import UserContext from "contexts/UserContext";
import AlertContext from "contexts/AlertContext";
import DarkModeContext from "contexts/DarkModeContext";

//components
import AlertApp from "components/Alert";
import { Header } from "components/Header";
import LayoutLogin from "./LayoutLogin";

//mui
import { Box } from "@mui/material";

export default function Layout({ children }) {
  const { alertaMensaje, closeAlertSms, type, typeAlert } =
    useContext(AlertContext);
  const { user, setUser, setCloudinarys } = useContext(UserContext);
  const [loadingUser, setLoadingUser] = useState(true);
  const { mode, colorMode, theme } = useContext(DarkModeContext);
  useEffect(() => {
    document.body.style.backgroundColor =
      theme.palette.mode === "light"
        ? "#f5f5f5"
        : theme.palette.background.default;
  }, [theme.palette.background.default, theme.palette.mode]);

  useEffect(() => {
    async function cargarUsuario() {
      if (!getToken()) {
        setLoadingUser(false);
        return;
      }

      setLoadingUser(true);
      try {
        const data = await whoami();
        setUser(data.user);
        setCloudinarys(data.cloudinary);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingUser(false);
      }
    }

    cargarUsuario();
  }, [setUser, setCloudinarys]);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          bgcolor: `${
            theme.palette.mode === "light" ? "#f5f5f5" : "background.default"
          }`,
          color: "text.secondary",
          overflow: "auto",
        }}
      >
        <AlertApp
          alertaMensaje={alertaMensaje}
          typeAlert={typeAlert}
          closeAlertSms={closeAlertSms}
          type={type}
        />
        {loadingUser ? (
          <>
            <div
              style={{
                height: "100vh",
                width: "100%",
                background: "#121212",
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 10000,
              }}
            ></div>
          </>
        ) : (
          <>
            {user ? (
              <LayoutLogin>{children}</LayoutLogin>
            ) : (
              <WithoutUser>{children}</WithoutUser>
            )}
          </>
        )}
      </Box>
    </>
  );
}

function WithoutUser({ children }) {
  const router = useRouter();
  return (
    <>
      <Header />

      {children}
    </>
  );
}
