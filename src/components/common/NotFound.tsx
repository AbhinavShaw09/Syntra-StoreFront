import React from 'react'
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const NotFound404 = () => {
   const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-muted-foreground mb-6">
        Sorry, the page you’re looking for doesn’t exist.
      </p>
      <Button onClick={() => router.push("/")}>Go to Home</Button>
    </div>
  );
}

export default NotFound404