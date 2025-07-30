"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator, DollarSign, Clock, Percent } from "lucide-react"

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(25000)
  const [interestRate, setInterestRate] = useState(5.99)
  const [loanTerm, setLoanTerm] = useState(60)
  const [downPayment, setDownPayment] = useState(5000)
  const [monthlyPayment, setMonthlyPayment] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)
  const [totalCost, setTotalCost] = useState(0)

  // Calculate loan details
  useEffect(() => {
    const principal = loanAmount - downPayment
    const monthlyRate = interestRate / 100 / 12
    const numberOfPayments = loanTerm

    if (principal > 0 && monthlyRate > 0 && numberOfPayments > 0) {
      const x = Math.pow(1 + monthlyRate, numberOfPayments)
      const monthly = (principal * x * monthlyRate) / (x - 1)

      setMonthlyPayment(monthly)
      setTotalInterest(monthly * numberOfPayments - principal)
      setTotalCost(monthly * numberOfPayments + downPayment)
    } else {
      setMonthlyPayment(principal / numberOfPayments || 0)
      setTotalInterest(0)
      setTotalCost(principal + downPayment || 0)
    }
  }, [loanAmount, interestRate, loanTerm, downPayment])

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <section className="mb-20" id="calculator">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Loan Calculator</h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Estimate your monthly payments and total cost based on different loan parameters.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="bg-[#242b33] border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Calculator className="mr-2 h-6 w-6 text-blue-500" />
                Payment Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs defaultValue="loan" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="loan">Loan Calculator</TabsTrigger>
                  <TabsTrigger value="lease">Lease Calculator</TabsTrigger>
                </TabsList>

                <TabsContent value="loan" className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium">Vehicle Price: {formatCurrency(loanAmount)}</label>
                        <span className="text-sm text-gray-400">
                          {formatCurrency(0)} - {formatCurrency(100000)}
                        </span>
                      </div>
                      <Slider
                        value={[loanAmount]}
                        min={0}
                        max={100000}
                        step={1000}
                        onValueChange={(value) => setLoanAmount(value[0])}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium">Down Payment: {formatCurrency(downPayment)}</label>
                        <span className="text-sm text-gray-400">
                          {formatCurrency(0)} - {formatCurrency(loanAmount)}
                        </span>
                      </div>
                      <Slider
                        value={[downPayment]}
                        min={0}
                        max={loanAmount}
                        step={500}
                        onValueChange={(value) => setDownPayment(value[0])}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium">Interest Rate: {interestRate.toFixed(2)}%</label>
                        <span className="text-sm text-gray-400">0% - 20%</span>
                      </div>
                      <Slider
                        value={[interestRate]}
                        min={0}
                        max={20}
                        step={0.1}
                        onValueChange={(value) => setInterestRate(value[0])}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium">Loan Term: {loanTerm} months</label>
                        <span className="text-sm text-gray-400">12 - 84 months</span>
                      </div>
                      <Slider
                        value={[loanTerm]}
                        min={12}
                        max={84}
                        step={12}
                        onValueChange={(value) => setLoanTerm(value[0])}
                        className="w-full"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="lease" className="space-y-6">
                  <div className="flex items-center justify-center h-40">
                    <p className="text-gray-400">Lease calculator coming soon...</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-[#242b33] border-gray-700 h-full">
            <CardHeader>
              <CardTitle className="text-2xl">Payment Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="bg-background p-6 rounded-lg">
                  <div className="flex items-center mb-2">
                    <DollarSign className="h-5 w-5 text-blue-500 mr-2" />
                    <h3 className="text-lg font-semibold">Monthly Payment</h3>
                  </div>
                  <p className="text-3xl font-bold text-blue-400">{formatCurrency(monthlyPayment)}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between border-b border-gray-700 pb-2">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 text-blue-500 mr-2" />
                      <span>Loan Amount</span>
                    </div>
                    <span>{formatCurrency(loanAmount - downPayment)}</span>
                  </div>

                  <div className="flex justify-between border-b border-gray-700 pb-2">
                    <div className="flex items-center">
                      <Percent className="h-4 w-4 text-blue-500 mr-2" />
                      <span>Interest Rate</span>
                    </div>
                    <span>{interestRate.toFixed(2)}%</span>
                  </div>

                  <div className="flex justify-between border-b border-gray-700 pb-2">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-blue-500 mr-2" />
                      <span>Loan Term</span>
                    </div>
                    <span>{loanTerm} months</span>
                  </div>

                  <div className="flex justify-between border-b border-gray-700 pb-2">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 text-blue-500 mr-2" />
                      <span>Down Payment</span>
                    </div>
                    <span>{formatCurrency(downPayment)}</span>
                  </div>

                  <div className="flex justify-between border-b border-gray-700 pb-2">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 text-blue-500 mr-2" />
                      <span>Total Interest</span>
                    </div>
                    <span>{formatCurrency(totalInterest)}</span>
                  </div>

                  <div className="flex justify-between font-semibold">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 text-blue-500 mr-2" />
                      <span>Total Cost</span>
                    </div>
                    <span>{formatCurrency(totalCost)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

