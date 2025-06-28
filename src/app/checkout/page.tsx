"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

const Checkout = () => {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("auth/login");
    }
  }, [loading, user, router]);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return null;
  }

  return (
    <div>
      <h1>Checkout Page</h1>
      {/* Add your checkout components here */}
    </div>
  );
};
export default Checkout;
