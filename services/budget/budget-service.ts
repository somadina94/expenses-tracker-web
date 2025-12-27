import axios, { AxiosError } from "axios";
import { Budget } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL + "budgets/",
  timeout: 30000,
});

class BudgetService {
  async createBudget(budget: Budget, token: string) {
    try {
      const response = await axiosInstance.post("/", budget, {
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
  async getBudgets(token: string, month?: number, year?: number) {
    try {
      const response = await axiosInstance.get("/", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          month,
          year,
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
  async getBudgetById(id: string, token: string) {
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
  async updateBudget(id: string, budget: Budget, token: string) {
    try {
      const response = await axiosInstance.patch(`/${id}`, budget, {
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
  async deleteBudget(id: string, token: string) {
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

const budgetService = new BudgetService();
export default budgetService;
