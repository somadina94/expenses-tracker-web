import axios, { AxiosError } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL + "notifications/",
  timeout: 30000,
});

class NotificationService {
  async getNotifications(token: string) {
    try {
      const response = await axiosInstance.get("/", {
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

  async getNotification(id: string, token: string) {
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

  async markNotificationRead(id: string, token: string) {
    try {
      const response = await axiosInstance.patch(
        `read/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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

const notificationService = new NotificationService();
export default notificationService;
