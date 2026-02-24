import api from "./api";

export const fetchCV = async () => {
  const response = await api.get("/cv/");
  return response.data;
};

export const saveCV = async (cvData) => {
  const response = await api.post("/cv/", cvData);
  return response.data;
};
