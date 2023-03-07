import { useState } from "react";

//components
import { ModalCompress } from "./ModalCompress";

//material UI
import {
  Box,
  Typography,
  DialogTitle,
  Tabs,
  Tab,
  IconButton,
  Dialog,
} from "@mui/material";

import CompressOutlinedIcon from "@mui/icons-material/CompressOutlined";
import CloseIcon from "@mui/icons-material/Close";

export function ModalTransform({ openModal, media, handleCloseModal }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="lg">
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
            <Tab label="RECORTAR IMAGEN" disabled />
            <Tab label="AGREGAR FILTRO" disabled />
          </Tabs>
          <IconButton onClick={handleCloseModal}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      {value === 0 && <ModalCompress media={media} />}
    </Dialog>
  );
}
