import axiosInstance from "helpers/axios";
export async function get_files() {
  const { data } = await axiosInstance.get(`/files/`);
  return data;
}
