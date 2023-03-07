import { Box, Typography, styled } from "@mui/material";

import heroImg from "media/banner_white.png";

export function Layout({ children }) {
  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "50px",
    color: "white",
    fontWeight: "bold",

    [theme.breakpoints.down("sm")]: {
      fontSize: "35px",
      marginTop: "100px",
    },
  }));
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "space-between",
        "@media (max-width: 600px)": {
          width: "100%",
          display: "block",
          height: "auto",
        },
      }}
    >
      <Box
        sx={{
          width: "50%",
          background: "#074fa8d1",
          backgroundImage:
            "url('https://cdn.wallpapersafari.com/27/47/GYHbrc.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          position: "relative",
          ":before": {
            content: "''",
            position: "absolute",
            background: "#074fa8d1",
            width: "100%",
            height: "100vh",
          },
          "@media (max-width: 600px)": {
            width: "100%",
            display: "none",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "90%",
            margin: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Box>
            <img
              src={heroImg.src}
              alt="banner"
              style={{
                width: "80%",
                objectFit: "contain",
                margin: "auto",
                display: "block",
              }}
            />
            <Title
              sx={{
                fontSize: "20px",
                textAlign: "center",
              }}
            >
              Simplifica la gestión de tus cuentas de Cloudinary.
            </Title>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: "50%",
          "@media (max-width: 600px)": {
            width: "100%",
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
