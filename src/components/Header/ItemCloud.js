import { useContext, useState } from "react";

//services
import { change_current_cloud } from "services/cloudinary";

//contexts
import UserContext from "contexts/UserContext";
import AlertContext from "contexts/AlertContext";

//material UI
import {
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Checkbox,
  Avatar,
} from "@mui/material";

import CloudQueueIcon from "@mui/icons-material/CloudQueue";

export function ItemCloud({ cloud, handleCloseModal }) {
  const { setCloudinarys } = useContext(UserContext);
  const { alertSms } = useContext(AlertContext);
  const [loading, setLoading] = useState(false);

  const handleChangeCloud = async () => {
    if (loading) return;
    if (cloud.checked) return;
    try {
      setLoading(true);
      const data = await change_current_cloud(cloud.id);
      setCloudinarys([...data]);
      alertSms("El entorno se a cambiado", "success", true);
      setLoading(false);
      handleCloseModal();
    } catch (error) {
      setLoading(false);
      alertSms("ups, hubo un error", "error", true);
    }
  };

  return (
    <ListItem
      secondaryAction={
        <Checkbox
          edge="end"
          checked={cloud.checked}
          onClick={handleChangeCloud}
        />
      }
      disablePadding
    >
      <ListItemButton onClick={handleChangeCloud}>
        <ListItemAvatar>
          <Avatar>
            <CloudQueueIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={`${cloud.cloud_name}`} />
      </ListItemButton>
    </ListItem>
  );
}
