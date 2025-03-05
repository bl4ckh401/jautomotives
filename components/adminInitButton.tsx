"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export function AdminInitButton() {
  const [loading, setLoading] = useState(false);

  const initializeAdmin = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/init', {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error('Failed to initialize admin');
      }
      
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to initialize admin');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      onClick={initializeAdmin}
      disabled={loading}
      variant="default"
    >
      {loading ? "Setting up..." : "Setup Admin Access"}
    </Button>
  );
}