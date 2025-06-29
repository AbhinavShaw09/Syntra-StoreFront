// hooks/useProducts.js
import { useEffect, useState } from "react";
import { BakckendEndpoints } from "@/utils/endpoints";
import { showToast } from "@/lib/toast";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      fetch(BakckendEndpoints.PRODUCT.LIST_BUYER_PRODUCTS, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setProducts(data);
        })
        .catch(() => {
          showToast({
            title: "Product fetching failed",
            description: "Error from server",
            type: "error",
            actionLabel: "Retry",
          });
          setProducts([]);
        })
        .finally(() => setLoading(false));
    }

    fetchProducts();
  }, []);

  return { products, loading };
}
