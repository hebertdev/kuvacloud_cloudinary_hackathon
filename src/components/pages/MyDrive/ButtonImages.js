import { useEffect, useState } from "react";
import Slider from "react-slick";

//material UI
import {
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Divider,
} from "@mui/material";

import Filter1OutlinedIcon from "@mui/icons-material/Filter1Outlined";
import Filter2OutlinedIcon from "@mui/icons-material/Filter2Outlined";
import Filter3OutlinedIcon from "@mui/icons-material/Filter3Outlined";
import Filter4OutlinedIcon from "@mui/icons-material/Filter4Outlined";
import Filter5OutlinedIcon from "@mui/icons-material/Filter5Outlined";
import Filter6OutlinedIcon from "@mui/icons-material/Filter6Outlined";
import Filter7OutlinedIcon from "@mui/icons-material/Filter7Outlined";
import Filter8OutlinedIcon from "@mui/icons-material/Filter8Outlined";
import Filter9PlusOutlinedIcon from "@mui/icons-material/Filter9PlusOutlined";
import CloseIcon from "@mui/icons-material/Close";

export function ButtonImages({ file }) {
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <Tooltip title="cantidad de cambios">
        <IconButton
          sx={{ color: "rgba(255, 255, 255, 0.54)" }}
          onClick={handleOpenModal}
        >
          {file?.versions?.length <= 1 ? (
            <Filter1OutlinedIcon />
          ) : file.versions.length === 2 ? (
            <Filter2OutlinedIcon />
          ) : file.versions.length === 3 ? (
            <Filter3OutlinedIcon />
          ) : file.versions.length === 4 ? (
            <Filter4OutlinedIcon />
          ) : file.versions.length === 5 ? (
            <Filter5OutlinedIcon />
          ) : file.versions.length === 6 ? (
            <Filter6OutlinedIcon />
          ) : file.versions.length === 7 ? (
            <Filter7OutlinedIcon />
          ) : file.versions.length === 8 ? (
            <Filter8OutlinedIcon />
          ) : (
            <Filter9PlusOutlinedIcon />
          )}
        </IconButton>
      </Tooltip>
      <Dialog open={open} fullWidth maxWidth="lg">
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>Realizaste {file?.versions?.length} cambios</Box>
            <IconButton onClick={handleCloseModal}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent
          sx={{
            paddingBottom: "35px",
            height: "100vh",
            maxHeight: "90vh",
          }}
        >
          <Box>
            <Slider
              {...settings}
              style={{
                width: "100%",
                height: "100%",
                maxWidth: "600PX",
                display: "flex",
                alignItems: "center",
                margin: "auto",
              }}
            >
              {file?.versions?.map((version) => (
                <ItemImage key={version.id} version={version} />
              ))}
            </Slider>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

function ItemImage({ version }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        margin: "auto",
      }}
    >
      <img
        src={version.url}
        alt="versión modificada"
        style={{
          display: "block",
          margin: "auto",
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    </div>
  );
}
