import { useEffect, useState, useContext, Fragment, useCallback } from "react";

//services
import { get_images } from "services/cloudinary";

//contexts
import UserContext from "contexts/UserContext";

//components
import { CardMediaCloud } from "components/pages/Cloudinary";

import {
  CircularProgress,
  Box,
  ImageList,
  ListSubheader,
  Alert,
} from "@mui/material";

export default function CloudinaryPage() {
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
      const data = await get_images();
      setImages([...data.resources]);
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
              Cloudinary Files |{" "}
              {cloudinarys.map((item) => {
                if (item.checked) {
                  return (
                    <Fragment key={item.cloud_name}>
                      {" "}
                      {item.cloud_name}
                    </Fragment>
                  );
                } else {
                  return null;
                }
              })}
            </ListSubheader>
            {isError && <Alert severity="error">{isError}</Alert>}
            <ImageList
              variant="masonry"
              cols={4}
              gap={4}
              sx={{ marginTop: "0" }}
            >
              {images.map((media) => (
                <CardMediaCloud media={media} key={media.asset_id} />
              ))}
            </ImageList>
          </>
        )}
      </Box>
    </>
  );
}
