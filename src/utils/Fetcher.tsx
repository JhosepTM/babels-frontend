import { IntervalData } from "@/types/Interval";
import {
  departments,
  expenseCategories,
  payMethods,
  revenueCategories,
  rooms,
} from "./Data";
import { Revenue } from "@/types/Revenue";
import { Expense } from "@/types/Expense";

export const fetchData = async (interval: IntervalData) => {
  const { startDate, endDate } = interval;
  const startDateString = startDate.toISOString().split('T')[0];
  const endDateString = endDate.toISOString().split('T')[0];
  const url = `http://localhost:8081/v1/daily-info?startDate=${startDateString}&endDate=${endDateString}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const res = await response.json();
    return res;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const fetchRooms = async () => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return rooms;
};

export const fetchPayMethods = async () => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return payMethods;
};

export const fetchDepartments = async () => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return departments;
};

export const fetchRevenueCategories = async () => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return revenueCategories;
};

export const fetchExpenseCategories = async () => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return expenseCategories;
};

export const putRevenue = async (revenue: Revenue) => {
  try {
    const response = await fetch("http://localhost:8081/v1/revenue", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(revenue),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

export const putExpense = async (expense: Expense) => {
  try {
    const response = await fetch("http://localhost:8081/v1/expense", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expense),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

export const fetchRevenue = async (pageNumber: number, pageSize: number) => {
  const response = await fetch(
    `http://localhost:8081/v1/revenue/page?pageNumber=${pageNumber}&pageSize=${pageSize}`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.content;
};

export const fetchExpense = async (pageNumber: number, pageSize: number) => {
  const response = await fetch(
    `http://localhost:8081/v1/expense/page?pageNumber=${pageNumber}&pageSize=${pageSize}`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.content;
};
