import axiosInstance from "helpers/axios";

export async function login(email, password) {
  const { data } = await axiosInstance.post(`/users/login/`, {
    email,
    password,
  });
  return data;
}

export async function signup(user_data) {
  const { data } = await axiosInstance.post(`/users/signup/`, user_data);
  return data;
}

export async function whoami() {
  const { data } = await axiosInstance.get(`/users/whoami/`);
  return data;
}
