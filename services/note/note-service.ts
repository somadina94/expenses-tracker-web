import axios, { AxiosError } from "axios";
import type { Note } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL + "notes/",
  timeout: 30000,
});

class NoteService {
  async createNote(note: Note, token: string) {
    try {
      const response = await axiosInstance.post("/", note, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return {
        data: response.data,
        status: response.status,
        message: response.data.message,
      };
    } catch (error) {
      if (error && error instanceof AxiosError) {
        return { message: error.response?.data.message };
      }
      return { message: "An unexpected error occurred. Please try again." };
    }
  }
  async getNotes(token: string, startDate?: Date, endDate?: Date) {
    try {
      const response = await axiosInstance.get("/", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          startDate,
          endDate,
        },
      });
      return {
        data: response.data,
        status: response.status,
        message: response.data.message,
      };
    } catch (error) {
      if (error && error instanceof AxiosError) {
        return { message: error.response?.data.message };
      }
      return { message: "An unexpected error occurred. Please try again." };
    }
  }

  async getNote(id: string, token: string) {
    try {
      const response = await axiosInstance.get(`/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return {
        data: response.data,
        status: response.status,
        message: response.data.message,
      };
    } catch (error) {
      if (error && error instanceof AxiosError) {
        return { message: error.response?.data.message };
      }
      return { message: "An unexpected error occurred. Please try again." };
    }
  }
  async updateNote(id: string, note: Note, token: string) {
    try {
      const response = await axiosInstance.patch(`/${id}`, note, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return {
        data: response.data,
        status: response.status,
        message: response.data.message,
      };
    } catch (error) {
      if (error && error instanceof AxiosError) {
        return { message: error.response?.data.message };
      }
      return { message: "An unexpected error occurred. Please try again." };
    }
  }
  async deleteNote(id: string, token: string) {
    try {
      const response = await axiosInstance.delete(`/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return {
        data: response.data,
        status: response.status,
        message: response.data.message,
      };
    } catch (error) {
      if (error && error instanceof AxiosError) {
        return { message: error.response?.data.message };
      }
      return { message: "An unexpected error occurred. Please try again." };
    }
  }
}

const noteService = new NoteService();
export default noteService;
