"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const initialTransactions = [
  { id: 1, date: "2023-06-10", type: "Purchase", amount: "2.5 BTC", status: "Completed", vehicle: "Tesla Model S" },
  { id: 2, date: "2023-06-05", type: "Sale", amount: "3.2 BTC", status: "Pending", vehicle: "Porsche 911" },
  { id: 3, date: "2023-05-28", type: "Purchase", amount: "1.8 BTC", status: "Completed", vehicle: "Audi e-tron" },
]

export default function TransactionHistory() {
  const [transactions] = useState(initialTransactions)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>Your recent cryptocurrency transactions on CryptoDrive</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.type}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{transaction.vehicle}</TableCell>
                <TableCell>
                  <Badge variant={transaction.status === "Completed" ? "default" : "secondary"}>
                    {transaction.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

