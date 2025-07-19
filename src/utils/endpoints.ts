const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const BakckendEndpoints = {
  AUTH: {
    LOGIN: `${API_BASE}/auth/login/`,
    REGISTER: `${API_BASE}/auth/register/`,
    LOGOUT: `${API_BASE}/auth/logout/`,
  },
  PRODUCT: {
    LIST_BUYER_PRODUCTS: `${API_BASE}/buyer/products/`,
  },
  BUYER: {
    GET_BUYER_ADDRESS: `${API_BASE}/buyer/address/`,
  },
  ADDRESS: {
    CREATE_BUYER_ADDRESS: `${API_BASE}/buyer/address/create/`,
  },
  CART: {
    ADD_TO_CART: `${API_BASE}/buyer/cart/`,
  },
};
