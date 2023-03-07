import axiosInstance from "helpers/axios";

export async function get_images() {
  const { data } = await axiosInstance.get(`/cloudinary/`);
  return data;
}

export async function add_cloudinary_key(credentials) {
  const { data } = await axiosInstance.post(
    "/users/add_cloudinary_key/",
    credentials
  );
  return data;
}

export async function change_current_cloud(id) {
  const { data } = await axiosInstance.post("/users/change_cloud/", {
    id,
  });
  return data;
}

export async function upload_file(formData) {
  const { data } = await axiosInstance.post("/cloudinary/upload/", formData);
  return data;
}

export async function new_file_change(formData) {
  const { data } = await axiosInstance.post(
    "/cloudinary/new_file_change/",
    formData
  );
  return data;
}
