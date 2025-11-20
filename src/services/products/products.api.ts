import { apiFetch } from "@/lib/api";

const BASE_URL = "http://localhost:8000";

export const getAllProducts = async () => {
  return apiFetch(`${BASE_URL}/buyer/products/`, {
    method: "GET",
  });
};

export const getProductById = async (id: number) => {
  return apiFetch(`${BASE_URL}/buyer/products/${id}/`, {
    method: "GET",
  });
};
