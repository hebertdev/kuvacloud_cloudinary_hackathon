import { useState, useContext } from "react";

import axios from "axios";

import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

//services
import { new_file_change } from "services/cloudinary";

//context
import AlertContext from "contexts/AlertContext";

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

export function ModalCompress({ media }) {
  const { alertSms } = useContext(AlertContext);
  const [valueSlider, setValueSlider] = useState(70);
  const [uploading, setUploading] = useState(false);
  const [modifiedUrl, setModifiedUrl] = useState(null);
  const [modifiedSize, setModifiedSize] = useState(null);

  const handleChangeSlider = (e) => {
    setValueSlider(e.target.value);
  };

  const handleCompressImage = async () => {
    try {
      let formData = new FormData();
      formData.append("public_id", media.public_id);
      formData.append("quality", valueSlider);
      const compressed = await new_file_change(formData);
      setModifiedUrl(compressed.compressed_image_details);
      const modifiedResponse = await axios.head(
        compressed.compressed_image_details
      );
      const modifiedFileSize = modifiedResponse.headers["content-length"];
      setModifiedSize(modifiedFileSize);
      setUploading(false);
      alertSms("Se comprimió la imagen correctamente", "success", true);
    } catch (e) {
      console.log(e);
      alertSms("Hubo un error al comprimir la imagen", "error", true);
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

  return (
    <>
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
                      src={media.secure_url}
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
                  src={media.secure_url}
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
            {modifiedUrl && (
              <Box>
                Peso original: {(media.bytes / 1024).toFixed(2)}Kb | Peso
                comprimido: {(modifiedSize / 1024).toFixed(2)}Kb |{" "}
                {(((media.bytes - modifiedSize) / media.bytes) * 100).toFixed(
                  2
                )}
                % |{" "}
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => downloadImage(modifiedUrl)}
                >
                  Descargar Imagen
                </Button>
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
        <Button onClick={handleCompressImage}>comprimir</Button>
      </DialogActions>
    </>
  );
}
