import { useEffect, useState } from "react";
import { BakckendEndpoints } from "@/utils/endpoints";
import { showToast } from "@/lib/toast";

export default function useFetchAddress() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchAddresses() {
      setLoading(true);
      fetch(BakckendEndpoints.BUYER.GET_BUYER_ADDRESS, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setAddresses(data);
        })
        .catch(() => {
          showToast({
            title: "Address fetching failed",
            description: "Error from server",
            type: "error",
            actionLabel: "Retry",
          });
          setAddresses([]);
        })
        .finally(() => setLoading(false));
    }

    fetchAddresses();
  }, []);

  return { addresses, loading };
}
