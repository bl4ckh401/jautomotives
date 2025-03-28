"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function InsuranceCalculator() {
  const [vehicleValue, setVehicleValue] = useState(2500000)
  const [vehicleAge, setVehicleAge] = useState(3)
  const [coverageType, setCoverageType] = useState("comprehensive")
  const [driverAge, setDriverAge] = useState(35)
  const [drivingRecord, setDrivingRecord] = useState("clean")
  const [estimatedPremium, setEstimatedPremium] = useState(0)

  // Calculate premium when inputs change
  const calculatePremium = () => {
    // Base rate as percentage of vehicle value
    let baseRate = 0.04 // 4% of vehicle value annually

    // Adjust for vehicle age
    if (vehicleAge <= 3) {
      baseRate += 0.01 // Newer vehicles cost more to insure
    } else if (vehicleAge >= 10) {
      baseRate -= 0.01 // Older vehicles may cost less
    }

    // Adjust for coverage type
    if (coverageType === "basic") {
      baseRate *= 0.6
    } else if (coverageType === "standard") {
      baseRate *= 0.8
    } else if (coverageType === "premium") {
      baseRate *= 1.2
    } else if (coverageType === "luxury") {
      baseRate *= 1.5
    }

    // Adjust for driver age
    if (driverAge < 25) {
      baseRate *= 1.5 // Young drivers pay more
    } else if (driverAge > 60) {
      baseRate *= 1.2 // Senior drivers may pay more
    }

    // Adjust for driving record
    if (drivingRecord === "minor") {
      baseRate *= 1.3
    } else if (drivingRecord === "major") {
      baseRate *= 2
    }

    // Calculate annual premium
    const annualPremium = vehicleValue * baseRate

    // Monthly premium
    const monthlyPremium = annualPremium / 12

    setEstimatedPremium(Math.round(monthlyPremium))
  }

  return (
    <section className="mb-20" id="calculator">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Premium Calculator</h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Get an estimate of your insurance premium based on your vehicle and coverage needs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="bg-[#242b33] border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Calculator className="mr-2 h-6 w-6 text-blue-500" />
                Insurance Premium Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">Vehicle Value: KES {vehicleValue.toLocaleString()}</label>
                    <span className="text-sm text-gray-400">KES 500,000 - KES 10,000,000</span>
                  </div>
                  <Slider
                    value={[vehicleValue]}
                    min={500000}
                    max={10000000}
                    step={100000}
                    onValueChange={(value) => setVehicleValue(value[0])}
                    className="w-full"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">Vehicle Age: {vehicleAge} years</label>
                    <span className="text-sm text-gray-400">0 - 15 years</span>
                  </div>
                  <Slider
                    value={[vehicleAge]}
                    min={0}
                    max={15}
                    step={1}
                    onValueChange={(value) => setVehicleAge(value[0])}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium block mb-2">Coverage Type</label>
                  <Select value={coverageType} onValueChange={setCoverageType}>
                    <SelectTrigger className="bg-[#1a1f24] border-gray-700">
                      <SelectValue placeholder="Select coverage type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic Plan</SelectItem>
                      <SelectItem value="standard">Standard Plan</SelectItem>
                      <SelectItem value="comprehensive">Comprehensive Plan</SelectItem>
                      <SelectItem value="premium">Premium Plan</SelectItem>
                      <SelectItem value="luxury">Luxury Plan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">Driver Age: {driverAge} years</label>
                    <span className="text-sm text-gray-400">18 - 75 years</span>
                  </div>
                  <Slider
                    value={[driverAge]}
                    min={18}
                    max={75}
                    step={1}
                    onValueChange={(value) => setDriverAge(value[0])}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium block mb-2">Driving Record</label>
                  <Select value={drivingRecord} onValueChange={setDrivingRecord}>
                    <SelectTrigger className="bg-[#1a1f24] border-gray-700">
                      <SelectValue placeholder="Select driving record" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clean">Clean Record</SelectItem>
                      <SelectItem value="minor">Minor Violations</SelectItem>
                      <SelectItem value="major">Major Violations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg" onClick={calculatePremium}>
                  Calculate Premium
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-[#242b33] border-gray-700 h-full">
            <CardHeader>
              <CardTitle className="text-2xl">Estimated Premium</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="bg-[#1a1f24] p-6 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Shield className="h-5 w-5 text-blue-500 mr-2" />
                    <h3 className="text-lg font-semibold">Monthly Premium</h3>
                  </div>
                  <p className="text-3xl font-bold text-blue-400">
                    {estimatedPremium > 0 ? `KES ${estimatedPremium.toLocaleString()}` : "Calculate to see estimate"}
                  </p>
                </div>

                <div className="text-gray-300 text-sm">
                  <p className="mb-4">
                    This is an estimated premium based on the information provided. Actual premiums may vary based on
                    additional factors and underwriting.
                  </p>
                  <p>For a precise quote, please contact our insurance specialists or request a personalized quote.</p>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700">Request Exact Quote</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

