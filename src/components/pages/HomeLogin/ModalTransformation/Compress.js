import { useState, useEffect, useContext } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

//services
import { new_file_change } from "services/cloudinary";

//context
import AlertContext from "contexts/AlertContext";

//material UI
import {
  Box,
  Typography,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Slider,
  CircularProgress,
  IconButton,
} from "@mui/material";

import axios from "axios";

import CompressOutlinedIcon from "@mui/icons-material/CompressOutlined";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const cld = new Cloudinary({
  cloud: {
    cloudName: "hebertdev1",
  },
});

export function Compress({ preview, handleUploadClick, handleCloseModal }) {
  const { alertSms } = useContext(AlertContext);
  const [value, setValue] = useState(0);
  const [valueSlider, setValueSlider] = useState(70);
  const [uploading, setUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [modifiedUrl, setModifiedUrl] = useState(null);
  const [modifiedSize, setModifiedSize] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeSlider = (e) => {
    setValueSlider(e.target.value);
  };

  const handleUploadAndCompressImage = async () => {
    if (uploading) return;
    try {
      setUploading(true);
      let uploadedFileX = uploadedFile;
      if (!isUploaded) {
        uploadedFileX = await handleUploadClick();
        setUploadedFile(uploadedFileX);
        setIsUploaded(true);
      } else {
        uploadedFileX = uploadedFile;
      }

      const compressedFormData = new FormData();
      compressedFormData.append("public_id", uploadedFileX.public_id);
      compressedFormData.append("quality", valueSlider);
      const compressed = await new_file_change(compressedFormData);
      console.log(compressed);
      setModifiedUrl(compressed.compressed_image_details);
      alertSms("Se comprimió la imagen correctamente", "success", true);

      const modifiedResponse = await axios.head(
        compressed.compressed_image_details
      );
      const modifiedFileSize = modifiedResponse.headers["content-length"];
      setModifiedSize(modifiedFileSize);
      setUploading(false);
    } catch (error) {
      setUploading(false);
      console.log(error);
    }
  };

  const downloadImage = (url) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const timestamp = Date.now();
        const filename = `${timestamp}.jpg`;
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  };

  function copyToClipboard() {
    const input = document.createElement("input");
    input.value = modifiedUrl.toString();
    console.log(input.value);
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    alertSms("se copio la URL al portapeles", "success", true);
  }

  return (
    <>
      <DialogTitle>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab
              label={
                <Typography sx={{ display: "flex" }}>
                  <CompressOutlinedIcon sx={{ mr: "5px" }} /> Comprimir
                </Typography>
              }
            />
            <Tab label="QUITAR FONDO" disabled />
          </Tabs>
          <IconButton onClick={handleCloseModal}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent
        sx={{
          height: "100vh",
        }}
      >
        {uploading ? (
          <>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </Box>
          </>
        ) : (
          <>
            {modifiedUrl ? (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <ReactCompareSlider
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  itemOne={
                    <ReactCompareSliderImage
                      src={uploadedFile.secure_url}
                      alt="Original Image"
                      style={{
                        display: "block",
                        margin: "auto",
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  }
                  itemTwo={
                    <ReactCompareSliderImage
                      src={modifiedUrl}
                      alt="Modified Image"
                      style={{
                        display: "block",
                        margin: "auto",
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  }
                />
              </Box>
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <img
                  src={preview}
                  alt="PREVIEW IMAGE"
                  style={{
                    display: "block",
                    margin: "auto",
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
            )}
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: "90%",
              margin: "auto",
              display: "block",
            }}
          >
            {uploadedFile && (
              <Box>
                Peso original: {(uploadedFile.bytes / 1024).toFixed(2)}Kb | Peso
                comprimido: {(modifiedSize / 1024).toFixed(2)} |{" "}
                {(
                  ((uploadedFile.bytes - modifiedSize) / uploadedFile.bytes) *
                  100
                ).toFixed(2)}
                % |{" "}
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => downloadImage(modifiedUrl)}
                >
                  Descargar Imagen comprimida
                </Button>
                <IconButton onClick={copyToClipboard}>
                  <ContentCopyIcon />
                </IconButton>
              </Box>
            )}
            <Slider
              valueLabelDisplay="auto"
              step={10}
              marks
              min={10}
              max={80}
              onChange={handleChangeSlider}
              value={valueSlider}
            />
            <Typography variant="body2">
              La imagen se comprimirá manteniendo {valueSlider}% de su calidad
            </Typography>
          </Box>
        </Box>
      </DialogActions>

      <DialogActions>
        <Button onClick={handleUploadAndCompressImage}>comprimir</Button>
      </DialogActions>
    </>
  );
}
