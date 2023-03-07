import { useContext, useState, useEffect, Fragment } from "react";

//services
import { add_cloudinary_key } from "services/cloudinary";

//contetx
import UserContext from "contexts/UserContext";
import AlertContext from "contexts/AlertContext";

//components
import { ItemCloud } from "./ItemCloud";

//material UI
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  TextField,
  Stack,
  List,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export function ButtonCloudinary() {
  const { cloudinarys, setCloudinarys } = useContext(UserContext);
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <>
      <ButtonCloud
        cloudinarys={cloudinarys}
        handleOpenModal={handleOpenModal}
      />
      <Dialog open={open} onClose={handleCloseModal} fullWidth maxWidth="sm">
        {cloudinarys.length === 0 ? (
          <DialogWithoutCloudinarys
            cloudinarys={cloudinarys}
            setCloudinarys={setCloudinarys}
            handleCloseModal={handleCloseModal}
          />
        ) : (
          <DialogWithCloudinarys
            cloudinarys={cloudinarys}
            setCloudinarys={setCloudinarys}
            handleCloseModal={handleCloseModal}
          />
        )}
      </Dialog>
    </>
  );
}

function ButtonCloud({ cloudinarys, handleOpenModal }) {
  return (
    <>
      {cloudinarys.length === 0 ? (
        <Button
          variant="contained"
          color="error"
          sx={{
            marginRight: "10px",
            width: "150px",
          }}
          onClick={handleOpenModal}
          startIcon={<WarningAmberIcon />}
        >
          <Typography
            sx={{
              textTransform: "capitalize",
            }}
          >
            cloudinary
          </Typography>
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={handleOpenModal}
          sx={{
            marginRight: "10px",
            width: "150px",
          }}
          startIcon={<CloudQueueIcon />}
        >
          <Typography
            sx={{
              textTransform: "capitalize",
            }}
          >
            {cloudinarys.map((item) => {
              if (item.checked) {
                return (
                  <Fragment key={item.cloud_name}> {item.cloud_name}</Fragment>
                );
              } else {
                return null;
              }
            })}
          </Typography>
        </Button>
      )}
    </>
  );
}

function DialogWithCloudinarys({
  cloudinarys,
  setCloudinarys,
  handleCloseModal,
}) {
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const { alertSms } = useContext(AlertContext);
  const [crendentials, setCredentials] = useState({
    cloud_name: "",
    api_key: "",
    api_secret: "",
  });

  const handleChangeCredentials = (e) => {
    setCredentials({ ...crendentials, [e.target.name]: e.target.value });
  };

  const handleSubmitCredentials = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (
      crendentials.cloud_name === "" ||
      crendentials.api_key === "" ||
      crendentials.api_secret === ""
    ) {
      alertSms("todos los campos son requerido", "error", true);
      return;
    }
    try {
      setLoading(true);
      const data = await add_cloudinary_key(crendentials);
      console.log(data);
      alertSms(
        "Entorno de cloudinary vinculado correctamente",
        "success",
        true
      );
      setCloudinarys([...cloudinarys, data]);
      setOpenForm(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setCredentials({
        cloud_name: "",
        api_key: "",
        api_secret: "",
      });

      if (error.response.status === 400) {
        alertSms(error.response.data.join(", "), "error", true);
      } else {
        alertSms("Ups, ocurrió un error.", "error", true);
      }
    }
  };
  return (
    <>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography>
            {cloudinarys.length === 1
              ? "Tienes una cuenta de cloudinary vinculada"
              : "Elije con cual de los entornos de cloudinary quieres trabajar"}
          </Typography>
        </Box>
        <IconButton onClick={handleCloseModal}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
          {cloudinarys.map((cloud) => (
            <ItemCloud
              key={cloud.api_key}
              cloud={cloud}
              handleCloseModal={handleCloseModal}
            />
          ))}
        </List>
        {openForm ? (
          <>
            <Divider />
            <Stack
              component="form"
              sx={{
                width: "100%",
                marginTop: "20px",
              }}
              spacing={2}
              autoComplete="off"
              onSubmit={handleSubmitCredentials}
            >
              <TextField
                label="Cloud Name"
                variant="outlined"
                size="small"
                name="cloud_name"
                value={crendentials.cloud_name}
                onChange={handleChangeCredentials}
              />
              <TextField
                label="API Key"
                variant="outlined"
                size="small"
                name="api_key"
                value={crendentials.api_key}
                onChange={handleChangeCredentials}
              />
              <TextField
                label="API Secret"
                variant="outlined"
                size="small"
                name="api_secret"
                value={crendentials.api_secret}
                onChange={handleChangeCredentials}
              />
              <Button type="submit" variant="outlined">
                Guardar
              </Button>
              <Button
                type="button"
                color="error"
                variant="outlined"
                onClick={() => setOpenForm(false)}
              >
                cancelar
              </Button>
            </Stack>
          </>
        ) : (
          <Button
            variant="outlined"
            fullWidth
            onClick={() => setOpenForm(true)}
          >
            agregar otro
          </Button>
        )}
      </DialogContent>
    </>
  );
}

function DialogWithoutCloudinarys({
  cloudinarys,
  setCloudinarys,
  handleCloseModal,
}) {
  const { alertSms } = useContext(AlertContext);
  const [loading, setLoading] = useState(false);
  const [crendentials, setCredentials] = useState({
    cloud_name: "",
    api_key: "",
    api_secret: "",
  });

  const handleChangeCredentials = (e) => {
    setCredentials({ ...crendentials, [e.target.name]: e.target.value });
  };

  const handleSubmitCredentials = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (
      crendentials.cloud_name === "" ||
      crendentials.api_key === "" ||
      crendentials.api_secret === ""
    ) {
      alertSms("todos los campos son requerido", "error", true);
      return;
    }
    try {
      setLoading(true);
      const data = await add_cloudinary_key(crendentials);
      console.log(data);
      alertSms(
        "Entorno de cloudinary vinculado correctamente",
        "success",
        true
      );
      setCloudinarys([...cloudinarys, data]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setCredentials({
        cloud_name: "",
        api_key: "",
        api_secret: "",
      });

      if (error.response.status === 400) {
        alertSms(error.response.data.join(", "), "error", true);
      } else {
        alertSms("Ups, ocurrió un error.", "error", true);
      }
    }
  };

  return (
    <>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <WarningAmberIcon
            color="warning"
            sx={{
              marginRight: "10px",
            }}
          />
          <Typography>
            Registra las credenciales de la cuenta cloudinary que quieras
            vincular
          </Typography>
        </Box>
        <IconButton onClick={handleCloseModal}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <small>
          1. Ingresa a tu cuenta de cloudinary{" "}
          <a
            href="https://cloudinary.com/users/login"
            target={"_blank"}
            style={{
              color: "blue",
            }}
          >
            aqui.
          </a>{" "}
        </small>
        <br />
        <small>
          2. Dirígete a la sección <b>Dashboard</b> y veras tus credenciales
        </small>
        <br />
        <picture>
          <img
            src="/cloudinary.jpg"
            alt="cloudinary credentials"
            style={{
              width: "100%",
            }}
          />
        </picture>
        <br />
        <small>
          3. Llena esos datos en el formulario para vincular tu cuenta de
          <b> cloudinary</b> con <b>Kuvacloud</b>
          <br />
          <small>
            tus datos son cifrados y unicamente son visibles para tí.
          </small>
        </small>
        <Stack
          component="form"
          sx={{
            width: "100%",
            marginTop: "20px",
          }}
          spacing={2}
          autoComplete="off"
          onSubmit={handleSubmitCredentials}
        >
          <TextField
            label="Cloud Name"
            variant="outlined"
            size="small"
            name="cloud_name"
            value={crendentials.cloud_name}
            onChange={handleChangeCredentials}
          />
          <TextField
            label="API Key"
            variant="outlined"
            size="small"
            name="api_key"
            value={crendentials.api_key}
            onChange={handleChangeCredentials}
          />
          <TextField
            label="API Secret"
            variant="outlined"
            size="small"
            name="api_secret"
            value={crendentials.api_secret}
            onChange={handleChangeCredentials}
          />
          <Button type="submit" variant="outlined">
            Guardar
          </Button>
        </Stack>
      </DialogContent>
    </>
  );
}
