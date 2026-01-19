import api from "../../services/api";

export const loginRequest = async (
  email: string,
  password: string
): Promise<string> => {
  const { data } = await api.post("/login", { email, password });
  return data.accessToken;
};

export const getUserById = async (id: number) => {
  const { data } = await api.get(`/users/${id}`);
  return data;
};
