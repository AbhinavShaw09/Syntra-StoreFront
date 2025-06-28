"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/providers/AuthProvider";
import Link from "next/link";

export default function AccountPage() {
  const { user, logout } = useAuth();

  async function handleLogout() {
    if (user) {
      logout();
    }
  }

  return (
    <div className="max-w-5xl mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>My Account</CardTitle>
        </CardHeader>

        <Separator />

        <CardContent>
          <Tabs defaultValue="orders" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            <Separator />

            <TabsContent value="orders">
              {user ? (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Order History</h3>
                  <p>You have not placed any orders yet.</p>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Login Required</h3>
                  <p>
                    Please{" "}
                    <Link href="/auth/login" className="text-blue-600">
                      login
                    </Link>{" "}
                    to view your order history.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="address">
              {user ? (
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Manage Addresses
                  </h3>
                  <p>Add or edit your delivery addresses here.</p>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Login Required</h3>
                  <p>
                    Please{" "}
                    <Link href="/auth/login" className="text-blue-600">
                      login
                    </Link>{" "}
                    to manage your addresses.
                  </p>
                </div>  
              )}
            </TabsContent>

            <TabsContent value="profile">
              {user ? (
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Account Details
                  </h3>
                  <p>Update your name, email, or password here.</p>
                  <button
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-2xl"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Login Required</h3>
                  <p>
                    Please{" "}
                    <Link href="/auth/login" className="text-blue-600">
                      login
                    </Link>{" "}
                    to view and manage your account details.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
