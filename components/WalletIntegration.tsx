"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

export default function WalletIntegration() {
  const [isConnected, setIsConnected] = useState(false)
  const [balance, setBalance] = useState("0")
  const { toast } = useToast()

  const connectWallet = () => {
    // Simulating wallet connection
    setTimeout(() => {
      setIsConnected(true)
      setBalance("2.5")
      toast({
        title: "Wallet connected successfully",
        description: "Your crypto wallet is now linked to your account.",
      })
    }, 1000)
  }

  const disconnectWallet = () => {
    setIsConnected(false)
    setBalance("0")
    toast({
      title: "Wallet disconnected",
      description: "Your crypto wallet has been unlinked from your account.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Crypto Wallet</CardTitle>
        <CardDescription>Connect your wallet to make purchases and receive payments</CardDescription>
      </CardHeader>
      <CardContent>
        {isConnected ? (
          <div>
            <p className="mb-2">
              Status: <span className="text-green-500 font-semibold">Connected</span>
            </p>
            <p>
              Balance: <span className="font-semibold">{balance} BTC</span>
            </p>
          </div>
        ) : (
          <p>
            Status: <span className="text-red-500 font-semibold">Not Connected</span>
          </p>
        )}
      </CardContent>
      <CardFooter>
        {isConnected ? (
          <Button variant="destructive" onClick={disconnectWallet}>
            Disconnect Wallet
          </Button>
        ) : (
          <Button onClick={connectWallet}>Connect Wallet</Button>
        )}
      </CardFooter>
    </Card>
  )
}

