//next
import Link from 'next/link'

//material UI
import { Box, styled, Typography, Button, Container } from "@mui/material";

import heroImg from "media/banner.png";

export const Banner = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing(5),
    width: "100%",
    height: "100vh",
    [theme.breakpoints.down("sm")]: {
      display: "block",
      height: "auto",
    },
  }));

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "50px",
    color: "#000336",
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      fontSize: "35px",
      marginTop: "100px",
    },
  }));

  return (
    <Container>
      <CustomBox>
        <Box sx={{ flex: "1" }}>
          <Title variant="h1">
            Simplifica la gestión de tus cuentas de Cloudinary.
          </Title>
          <Typography
            variant="body2"
            sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
          >
            Descubre nuestra solución para gestionar múltiples cuentas de
            Cloudinary de manera más efectiva. Nuestra plataforma mejora el
            rendimiento y la funcionalidad de tus cuentas utilizando la API de
            Cloudinary.
          </Typography>
          <Button variant="contained" component={Link} href="/accounts/login" >Pruebalo tu mismo</Button>
        </Box>

        <Box sx={{ flex: "1" }}>
          <img
            src={heroImg.src}
            alt="heroImg"
            style={{ maxWidth: "100%", marginBottom: "2rem" }}
          />
        </Box>
      </CustomBox>
    </Container>
  );
};
