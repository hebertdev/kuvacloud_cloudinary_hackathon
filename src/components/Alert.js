import { Box, Toolbar, Container, Snackbar, Alert } from "@mui/material";

export default function AlertApp({
  alertaMensaje,
  typeAlert,
  closeAlertSms,
  type,
}) {
  //const messages = ["error", "warning", "info", "success"];
  if (!alertaMensaje) {
    return null;
  }

  var state = {
    open: true,
    vertical: "bottom",
    horizontal: "left",
  };

  const { vertical, horizontal, open } = state;

  return (
    <>
      {type ? (
        <Snackbar
          open={open}
          anchorOrigin={{ vertical, horizontal }}
          key={vertical + horizontal}
        >
          <Alert
            variant="filled"
            onClose={() => {
              closeAlertSms();
            }}
            severity={typeAlert}
          >
            {alertaMensaje}
          </Alert>
        </Snackbar>
      ) : (
        <Box
          sx={{
            position: "fixed",
            zIndex: "100",
            width: "100%",
          }}
        >
          <Toolbar />
          <Container disableGutters>
            <Alert
              variant="filled"
              onClose={() => {
                closeAlertSms();
              }}
              severity={typeAlert}
              sx={{
                position: "relative",

                width: { xs: "95%", md: "100%" },
                margin: "auto",
              }}
            >
              {alertaMensaje}
            </Alert>
          </Container>
        </Box>
      )}
    </>
  );
}
