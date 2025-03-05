"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export default function FinancingCalculator() {
  const [vehiclePrice, setVehiclePrice] = useState(50000)
  const [downPayment, setDownPayment] = useState(10000)
  const [interestRate, setInterestRate] = useState(3.5)
  const [loanTerm, setLoanTerm] = useState(60)

  const calculateMonthlyPayment = () => {
    const principal = vehiclePrice - downPayment
    const monthlyRate = interestRate / 100 / 12
    const numberOfPayments = loanTerm

    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

    return monthlyPayment.toFixed(2)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Financing Calculator</CardTitle>
        <CardDescription>Calculate your monthly payments for vehicle financing</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="vehiclePrice">Vehicle Price (USD)</Label>
          <Input
            id="vehiclePrice"
            type="number"
            value={vehiclePrice}
            onChange={(e) => setVehiclePrice(Number(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="downPayment">Down Payment (USD)</Label>
          <Input
            id="downPayment"
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="interestRate">Interest Rate (%)</Label>
          <Slider
            id="interestRate"
            min={0}
            max={20}
            step={0.1}
            value={[interestRate]}
            onValueChange={(value) => setInterestRate(value[0])}
          />
          <p className="text-sm text-muted-foreground mt-1">{interestRate}%</p>
        </div>
        <div>
          <Label htmlFor="loanTerm">Loan Term (months)</Label>
          <Slider
            id="loanTerm"
            min={12}
            max={84}
            step={12}
            value={[loanTerm]}
            onValueChange={(value) => setLoanTerm(value[0])}
          />
          <p className="text-sm text-muted-foreground mt-1">{loanTerm} months</p>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full text-center">
          <p className="text-lg font-semibold">Estimated Monthly Payment: ${calculateMonthlyPayment()}</p>
        </div>
      </CardFooter>
    </Card>
  )
}

