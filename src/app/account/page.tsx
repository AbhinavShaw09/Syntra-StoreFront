"use client";

import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import BuyerAddressManager from "@/components/checkout/BuyerAddressManager";
import { useAuth } from "@/providers/AuthProvider";
import useAccountDetails from "@/hooks/useAccountDetails";
import AccountOrders from "@/components/account/AccountOrders";

export default function AccountPage() {
  const { user, logout } = useAuth();
  const { accountDetails } = useAccountDetails();

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
                <AccountOrders />
              ) : (
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-semibold">Login Required</h3>
                  <p className="text-muted-foreground">
                    Please{" "}
                    <Link
                      href="/auth/login"
                      className="text-blue-600 underline"
                    >
                      login
                    </Link>{" "}
                    to view your orders.
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
                  <BuyerAddressManager />
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-semibold">Login Required</h3>
                  <p className="text-muted-foreground">
                    Please{" "}
                    <Link
                      href="/auth/login"
                      className="text-blue-600 underline"
                    >
                      login
                    </Link>{" "}
                    to manage your addresses.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="profile">
              {user ? (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold tracking-tight">
                    Account Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Username</p>
                      <p className="text-base text-foreground">
                        {accountDetails?.username}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 mb-1">Email</p>
                      <p className="text-base text-foreground">
                        {accountDetails?.email}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 mb-1">First Name</p>
                      <p className="text-base text-foreground">
                        {accountDetails?.first_name}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 mb-1">Last Name</p>
                      <p className="text-base text-foreground">
                        {accountDetails?.last_name}
                      </p>
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={logout}
                      className="bg-destructive hover:bg-destructive/90 text-white px-5 py-2 text-sm rounded-xl transition-all"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-semibold">Login Required</h3>
                  <p className="text-muted-foreground">
                    Please{" "}
                    <Link
                      href="/auth/login"
                      className="text-blue-600 underline"
                    >
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
