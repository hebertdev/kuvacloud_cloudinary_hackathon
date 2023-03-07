//material UI
import {
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Tooltip,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import Filter1OutlinedIcon from "@mui/icons-material/Filter1Outlined";
import Filter2OutlinedIcon from "@mui/icons-material/Filter2Outlined";
import Filter3OutlinedIcon from "@mui/icons-material/Filter3Outlined";
import Filter4OutlinedIcon from "@mui/icons-material/Filter4Outlined";
import Filter5OutlinedIcon from "@mui/icons-material/Filter5Outlined";
import Filter6OutlinedIcon from "@mui/icons-material/Filter6Outlined";
import Filter7OutlinedIcon from "@mui/icons-material/Filter7Outlined";
import Filter8OutlinedIcon from "@mui/icons-material/Filter8Outlined";
import Filter9PlusOutlinedIcon from "@mui/icons-material/Filter9PlusOutlined";

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
              <Tooltip title="cantidad de cambios">
                <IconButton sx={{ color: "rgba(255, 255, 255, 0.54)" }}>
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
