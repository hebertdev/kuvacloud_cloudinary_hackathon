//components
import { ButtonImages } from "./ButtonImages";

//material UI
import { ImageListItem, ImageListItemBar, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

export function CardFile({ file }) {
  return (
    <>
      <ImageListItem>
        <img src={file.url} alt={"imagen cloud"} loading="lazy" />
        <ImageListItemBar
          title={
            file.public_id.length > 7
              ? file.public_id.slice(0, 8) + "..."
              : file.public_id
          }
          subtitle={<>{(file.json_field.bytes / 1024).toFixed(2)}Kb</>}
          actionIcon={
            <>
              <ButtonImages file={file} />

              <IconButton sx={{ color: "rgba(255, 255, 255, 0.54)" }}>
                <InfoIcon />
              </IconButton>
            </>
          }
        />
      </ImageListItem>
    </>
  );
}
