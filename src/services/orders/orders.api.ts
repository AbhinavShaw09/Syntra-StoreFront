import { apiFetch } from "@/lib/api";

const BASE_URL = "http://localhost:8000";

export const createOrder = async (orderData: Record<string, unknown>, token: string) => {
  return apiFetch(`${BASE_URL}/buyer/order/`, {
    method: "POST",
    body: orderData,
    token,
  });
};

export const getOrders = async (token: string) => {
  return apiFetch(`${BASE_URL}/buyer/order/`, {
    method: "GET",
    token,
  });
};

export const getOrderById = async (id: number, token: string) => {
  return apiFetch(`${BASE_URL}/buyer/order/${id}/`, {
    method: "GET",
    token,
  });
};
