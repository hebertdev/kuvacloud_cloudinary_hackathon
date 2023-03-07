import { useEffect, useState, useContext, Fragment, useCallback } from "react";

//services
import { get_files } from "services/files";

//contexts
import UserContext from "contexts/UserContext";

//components
import { CardFile } from "components/pages/MyDrive";

import {
  CircularProgress,
  Box,
  ImageList,
  ListSubheader,
  Alert,
} from "@mui/material";

export default function MyDrive() {
  return (
    <>
      <Files />
    </>
  );
}

export function Files() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { cloudinarys } = useContext(UserContext);
  const [isError, setIsError] = useState(null);

  const handleGetImages = useCallback(async () => {
    if (loading) return;
    try {
      setIsError(null);
      setLoading(true);
      const data = await get_files();
      setImages([...data]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);

      if (error.response.status === 400) {
        setIsError(error.response.data.join(", "));
      } else {
        setIsError("Ups, ocurrió un error");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cloudinarys]);

  useEffect(() => {
    handleGetImages();
  }, [handleGetImages]);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        {loading ? (
          <CircularProgress sx={{ display: "block", margin: "auto" }} />
        ) : (
          <>
            {" "}
            <ListSubheader component="div">
              Archivos de cloudinary transformados
            </ListSubheader>
            {isError && <Alert severity="error">{isError}</Alert>}
            <ImageList
              variant="masonry"
              cols={4}
              gap={4}
              sx={{ marginTop: "0" }}
            >
              {images.map((file) => (
                <CardFile file={file} key={file.id} />
              ))}
            </ImageList>
          </>
        )}
      </Box>
    </>
  );
}
