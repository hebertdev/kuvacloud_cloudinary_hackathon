import { useState, useContext } from "react";

//next
import LinkNext from "next/link";

//helpers
import { setToken } from "helpers/auth";

//servicios
import { login } from "services/accounts";

//context
import AlertContext from "contexts/AlertContext";

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
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { Layout } from "components/pages/Accounts";

export default function LoginPage() {
  return (
    <Layout>
      <SignIn />
    </Layout>
  );
}

function SignIn() {
  const { alertSms } = useContext(AlertContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;
    try {
      setLoading(true);
      const data = await login(email, password);
      setToken(data.access);
      // Redirigir al usuario a la página de inicio después de iniciar sesión
      alertSms("Bienvenido", "success", true);
      window.location.href = "/";
      setLoading(false);
    } catch (error) {
      if (error?.response?.status === 400) {
        alertSms("Credenciales incorrectas", "error", true);
        setPassword("");
        setEmail("");
      } else {
        alertSms("Problemas con el servidor", "error", true);
      }
      setLoading(false);
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
          {!loading ? (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar sesión
            </Button>
          ) : (
            <LoadingButton
              loading
              variant="outlined"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </LoadingButton>
          )}

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
