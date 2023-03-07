import { useState } from "react";

//next
import LinkNext from "next/link";

//helpers
import { setToken } from "helpers/auth";

//servicios
import { login } from "services/accounts";

import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";

import heroImg from "media/banner_white.png";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function LoginPage() {
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

      <Box sx={{ width: "50%" }}>
        <SignIn />
      </Box>
    </Box>
  );
}

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await login(email, password);
      setToken(data.access);
      // Redirigir al usuario a la página de inicio después de iniciar sesión
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Toolbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Avatar sx={{ m: 1 }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar sesión
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Dirección email"
            name="email"
            autoComplete="email"
            autoFocus
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Iniciar sesión
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                href="#"
                variant="body2"
                sx={{
                  color: "inherit",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Olvidaste tu contraseña?
              </Link>
            </Grid>
            <Grid item>
              <Link
                variant="body2"
                sx={{
                  color: "inherit",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                component={LinkNext}
                href="/accounts/signup"
              >
                {"No tienes una cuenta? Registrate "}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
