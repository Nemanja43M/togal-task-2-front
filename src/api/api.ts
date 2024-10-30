import axios from "axios";
import { FileResponse, UploadResponse } from "../interfaces/interfaces";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
});

export const uploadImage = async (
  formData: FormData
): Promise<UploadResponse> => {
  const response = await axiosInstance.post<UploadResponse>("/file", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getAllFiles = async (): Promise<FileResponse[]> => {
  const response = await axiosInstance.get<FileResponse[]>("/file");
  return response.data;
};
