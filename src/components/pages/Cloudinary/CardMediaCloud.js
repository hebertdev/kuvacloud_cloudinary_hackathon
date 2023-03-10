import { useState } from "react";

//components
import { ModalTransform } from "./ModalImage";

//material UI
import { ImageListItem, ImageListItemBar, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

export function CardMediaCloud({ media }) {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <ImageListItem key={media.asset_id}>
        <img src={media.secure_url} alt={"imagen cloud"} loading="lazy" />
        <ImageListItemBar
          title={
            media.public_id.length > 7
              ? media.public_id.slice(0, 8) + "..."
              : media.public_id
          }
          subtitle={<>{(media.bytes / 1024).toFixed(2)}Kb</>}
          actionIcon={
            <IconButton
              sx={{ color: "rgba(255, 255, 255, 0.54)" }}
              onClick={handleOpenModal}
            >
              <InfoIcon />
            </IconButton>
          }
        />
      </ImageListItem>
      <ModalTransform
        media={media}
        openModal={openModal}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
}
