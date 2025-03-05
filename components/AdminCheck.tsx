"use client";

import { useAuth } from "@clerk/nextjs";
import { AdminInitButton } from "./adminInitButton";
import React from "react";

export function AdminCheck() {
const auth = useAuth();
const [claims, setClaims] = React.useState<any>(null);

React.useEffect(() => {
    const getClaims = async () => {
        const token = await auth.getToken();
        // You might need to decode the JWT token to get claims
        // This is a simplified example
        const decodedClaims = token ? JSON.parse(atob(token.split('.')[1])) : null;
        setClaims(decodedClaims);
    };
    
    if (auth.isLoaded && auth.isSignedIn) {
        getClaims();
    }
}, [auth.isLoaded, auth.isSignedIn]);
  const isAdmin = claims?.metadata?.role === "admin";

  if (isAdmin) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AdminInitButton />
    </div>
  );
}