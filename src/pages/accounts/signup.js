import { useState, useContext } from "react";

//nextjs
import { useRouter } from "next/router";
import LinkNext from "next/link";

//services
import { signup } from "services/accounts";

//context
import AlertContext from "contexts/AlertContext";

//Material UI
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Toolbar,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { LoadingButton } from "@mui/lab";

import { Layout } from "components/pages/Accounts";

export default function LoginPage() {
  return (
    <Layout>
      <SignUp />
    </Layout>
  );
}

function SignUp() {
  let router = useRouter();
  const { alertSms } = useContext(AlertContext);
  const [creandoUsuario, setCreandoUsuario] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [usernameError, setUsernameError] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [lastnameError, setLastnameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [passwordConfError, setPasswordConfError] = useState(null);
  // eslint-disable-next-line
  const [nonFieldsError, setNonFieldsError] = useState(null);
  const [usuario, setUsuario] = useState({
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    password: "",
    password_confirmation: "",
  });

  const expresiones = {
    // eslint-disable-next-line
    username: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    // eslint-disable-next-line
    name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    // eslint-disable-next-line
    password: /^.{8,15}$/, // 4 a 12 digitos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    // eslint-disable-next-line
    telefono: /^\d{7,14}$/, // 7 a 14 numeros.
  };

  function handleInputChange(e) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
    // eslint-disable-next-line
    switch (e.target.name) {
      case "username":
        setUsuario({
          ...usuario,
          [e.target.name]: e.target.value.toLowerCase(),
        });
        if (expresiones.username.test(e.target.value.toLowerCase())) {
          setUsernameError(null);
        } else {
          setUsernameError(
            "No se permite espacios ni Carácteres  especiales , más de 3 y menos de 16 digitos."
          );
        }
        break;
      case "email":
        if (expresiones.email.test(e.target.value)) {
          setEmailError(null);
        } else {
          setEmailError("Ingrese un correo valido.");
        }
        break;
      case "first_name":
        if (expresiones.name.test(e.target.value)) {
          setNameError(null);
        } else {
          setNameError("Ingrese un nombre valido.");
        }
        break;
      case "last_name":
        if (expresiones.name.test(e.target.value)) {
          setLastnameError(null);
        } else {
          setLastnameError("Ingrese un nombre valido.");
        }
        break;
      case "password":
        if (expresiones.password.test(e.target.value)) {
          setPasswordError(null);
        } else {
          setPasswordError("Ingrese una contraseña de 8 a 15 digitos.");
        }
        break;
      case "password_confirmation":
        if (expresiones.password.test(e.target.value)) {
          setPasswordConfError(null);
        } else {
          setPasswordConfError("Ingrese una contraseña de 8 a 15 digitos.");
        }
        break;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (creandoUsuario) {
      return null;
    }

    try {
      setCreandoUsuario(true);

      let modified_user = {
        ...usuario,
        username: usuario.username.toLowerCase(),
      };

      await handleSignup(modified_user);
      setCreandoUsuario(false);
      router.push("/accounts/login");
    } catch (error) {
      setCreandoUsuario(false);
      alertSms(
        "Hubo un problema al registrarse intente de nuevo.",
        "error",
        true
      );
      if (error?.response?.status === 400) {
        setEmailError(error.response.data.email);
        setUsernameError(error.response.data.username);
        setNameError(error.response.data.first_name);
        setLastnameError(error.response.data.last_name);
        setPasswordError(error.response.data.password);
        setPasswordConfError(error.response.data.password_confirmation);
        setNonFieldsError(error.response.data.non_field_errors);
      }
    }
  }

  async function handleSignup(usuario) {
    await signup(usuario);

    setUsuario({
      email: "",
      username: "",
      first_name: "",
      last_name: "",
      password: "",
      password_confirmation: "",
    });

    alertSms(
      `Cuenta creada correctamente, ya puedes iniciar sesión.`,
      "success",
      true
    );
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Toolbar />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 3,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Crea una cuenta
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={nameError ? true : false}
                  helperText={nameError}
                  autoComplete="off"
                  name="first_name"
                  required
                  fullWidth
                  id="first_name"
                  label="Nombre"
                  value={usuario.first_name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={lastnameError ? true : false}
                  helperText={lastnameError}
                  required
                  fullWidth
                  id="last_name"
                  label="Apellidos"
                  name="last_name"
                  value={usuario.last_name}
                  onChange={handleInputChange}
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={usernameError ? true : false}
                  helperText={usernameError}
                  required
                  fullWidth
                  id="username"
                  label="Nombre de usuario"
                  name="username"
                  value={usuario.username}
                  onChange={handleInputChange}
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={emailError ? true : false}
                  helperText={emailError}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={usuario.email}
                  onChange={handleInputChange}
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={passwordError ? true : false}
                  helperText={passwordError}
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  value={usuario.password}
                  onChange={handleInputChange}
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={passwordConfError ? true : false}
                  helperText={passwordConfError}
                  required
                  fullWidth
                  name="password_confirmation"
                  label="Confirmación de contraseña"
                  type="password"
                  id="password"
                  autoComplete="off"
                  value={usuario.password_confirmation}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>

            {!usernameError &&
            !nameError &&
            !lastnameError &&
            !emailError &&
            !passwordError &&
            !passwordConfError ? (
              <>
                {creandoUsuario === false ? (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    size="large"
                    disableElevation
                  >
                    Crear cuenta
                  </Button>
                ) : (
                  <LoadingButton
                    loading
                    variant="outlined"
                    size="large"
                    fullWidth
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Submit
                  </LoadingButton>
                )}
              </>
            ) : (
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, opacity: 0, height: 0 }}
                disabled={true}
              ></Button>
            )}

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  variant="body2"
                  sx={{
                    color: "inherit",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  component={LinkNext}
                  href="/accounts/login"
                >
                  {"Ya tienes una cuenta? Inicie sesión "}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
