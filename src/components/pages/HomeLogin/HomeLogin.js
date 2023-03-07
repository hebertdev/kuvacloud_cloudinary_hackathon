import React, { useState, useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { upload_file } from "services/cloudinary";

//context
import UserContext from "contexts/UserContext";

//components
import { Compress } from "./ModalTransformation";

//material UI
import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Slider,
} from "@mui/material";

import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import BrokenImageOutlinedIcon from "@mui/icons-material/BrokenImageOutlined";
import CompressOutlinedIcon from "@mui/icons-material/CompressOutlined";

export function HomeLogin() {
  const { user, cloudinarys } = useContext(UserContext);
  return (
    <Container>
      <Typography
        variant="h1"
        sx={{
          fontSize: "1.6rem",
          textAlign: "center",
          fontWeight: "600",
          marginBottom: "20px",
        }}
      >
        Herramientas rapidas
      </Typography>

      {cloudinarys.length === 0 ? (
        <Alert severity="error">
          Es necesario vincular una cuenta de cloudinary para poder acceder a
          todas las funciones!
        </Alert>
      ) : (
        <UploadImage />
      )}
    </Container>
  );
}

function UploadImage() {
  const [preview, setPreview] = useState(null);
  const [withUrl, setWithUrl] = useState(false);
  const [urlImage, setImageUrl] = useState("");
  const [file, setFile] = useState(null);

  //images
  const [openModal, setOpenModal] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    const reader = new FileReader();

    reader.onload = () => {
      setPreview(reader.result);
      setFile(acceptedFiles[0]);
    };

    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleRemoveImage = () => {
    setFile(null);
    setPreview(null);
    setImageUrl("");
  };

  const handleUploadClick = async () => {
    if (preview) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await upload_file(formData);
        setFile(null);
        setPreview(null);
        setImageUrl("");
        return response;
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      {!preview && (
        <Paper
          sx={{
            width: "100%",
            margin: "auto",
            padding: `${preview ? "10px" : "20px"}`,
            height: `${preview ? "75px" : "auto"}`,
            transition: "all 0.3s",
          }}
          variant="outlined"
        >
          <Box
            {...getRootProps()}
            className="dropzone"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            <input {...getInputProps()} />
            <>
              <Box>
                <Button
                  variant="outlined"
                  sx={{
                    margin: "auto",
                    display: "flex",
                    alignItems: "center",
                  }}
                  startIcon={<AddPhotoAlternateOutlinedIcon />}
                >
                  {preview ? "Seleccionar otra imagen" : "Seleccionar imagen"}
                </Button>
                {!preview && (
                  <>
                    <small>o arrastre y suelte una imagen aquí</small>
                  </>
                )}
              </Box>
            </>
          </Box>
        </Paper>
      )}
      {preview && (
        <>
          <Box>
            <Box
              sx={{
                height: "500px",
                width: "100%",
              }}
            >
              <picture>
                <img
                  src={preview}
                  alt="previsualización de imagen"
                  style={{
                    display: "block",
                    margin: "auto",
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </picture>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <Box>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleRemoveImage}
                >
                  remover
                </Button>{" "}
                o usar las siguientes herramientas
              </Box>
            </Box>
          </Box>
        </>
      )}
      <br />
      <Typography
        variant="caption"
        sx={{ textAlign: "center", color: "text.secondary", display: "block" }}
      >
        Para toda acción primero se subirá la imagen a tu cuenta de cloudinary
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
        <Button
          disabled={preview ? false : true}
          sx={{ flex: "1 0 calc(25% - 10px)", margin: "5px" }}
          variant="outlined"
          startIcon={<CompressOutlinedIcon />}
          onClick={() => setOpenModal(true)}
        >
          Comprimir Imagen
        </Button>
        <Button
          disabled={preview ? false : true}
          sx={{ flex: "1 0 calc(25% - 10px)", margin: "5px" }}
          variant="outlined"
          startIcon={<CompressOutlinedIcon />}
        >
          Recortar Imagen
        </Button>
        <Button
          disabled={preview ? false : true}
          sx={{ flex: "1 0 calc(25% - 10px)", margin: "5px" }}
          variant="outlined"
          startIcon={<CompressOutlinedIcon />}
        >
          Agregar Filtro
        </Button>
        <Button
          disabled={preview ? false : true}
          sx={{ flex: "1 0 calc(25% - 10px)", margin: "5px" }}
          variant="outlined"
          startIcon={<CompressOutlinedIcon />}
        >
          Quitar fondo
        </Button>
      </Box>
      <Dialog open={openModal} fullWidth maxWidth="lg">
        <Compress
          preview={preview}
          handleUploadClick={handleUploadClick}
          handleCloseModal={handleCloseModal}
        />
      </Dialog>
    </>
  );
}
