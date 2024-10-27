import axios from "axios";
import { UploadResponse } from "../interfaces/interfaces";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
});

export const uploadImage = async (formData: FormData): Promise<UploadResponse> => {
    const response = await axiosInstance.post<UploadResponse>('/image/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};