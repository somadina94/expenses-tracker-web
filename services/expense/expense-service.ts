import axios, { AxiosError } from "axios";
import type { Expense } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL + "expenses/",
  timeout: 30000,
});

class ExpenseService {
  async createExpense(expense: Expense, token: string) {
    try {
      const response = await axiosInstance.post("createExpense", expense, {
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

  async getExpenses(token: string, startDate?: Date, endDate?: Date) {
    try {
      const response = await axiosInstance.get("getAllExpenses", {
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
      if (error instanceof AxiosError) {
        return { message: error.response?.data.message };
      }
      return { message: "An unexpected error occurred. Please try again." };
    }
  }

  async getExpense(id: string, token: string) {
    try {
      const response = await axiosInstance.get(`getOneExpense/${id}`, {
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
  async updateExpense(id: string, expense: Expense, token: string) {
    try {
      const response = await axiosInstance.patch(
        `updateExpense/${id}`,
        expense,
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
  async deleteExpense(id: string, token: string) {
    try {
      const response = await axiosInstance.delete(`deleteExpense/${id}`, {
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

const expenseService = new ExpenseService();
export default expenseService;
