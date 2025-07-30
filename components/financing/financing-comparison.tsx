import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X } from "lucide-react"

export default function FinancingComparison() {
  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Financing Comparison</h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Compare our financing options to find the best fit for your needs.
        </p>
      </div>

      <Card className="bg-[#242b33] border-gray-700 overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl">Financing Options Comparison</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-background">
                  <TableHead className="w-[250px]">Feature</TableHead>
                  <TableHead>Traditional Auto Loan</TableHead>
                  <TableHead>Cryptocurrency Financing</TableHead>
                  <TableHead>Lease Options</TableHead>
                  <TableHead>In-House Financing</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Interest Rates</TableCell>
                  <TableCell>3.99% - 8.99%</TableCell>
                  <TableCell>4.99% - 9.99%</TableCell>
                  <TableCell>Money Factor Equivalent</TableCell>
                  <TableCell>6.99% - 12.99%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Term Length</TableCell>
                  <TableCell>36 - 72 months</TableCell>
                  <TableCell>12 - 60 months</TableCell>
                  <TableCell>24 - 48 months</TableCell>
                  <TableCell>24 - 60 months</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Down Payment Required</TableCell>
                  <TableCell>10% - 20% recommended</TableCell>
                  <TableCell>Crypto collateral</TableCell>
                  <TableCell>First month + security deposit</TableCell>
                  <TableCell>Varies based on credit</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Vehicle Ownership</TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <Check className="h-5 w-5 text-green-500" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <Check className="h-5 w-5 text-green-500" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <X className="h-5 w-5 text-red-500" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <Check className="h-5 w-5 text-green-500" />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Early Payoff Penalty</TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <X className="h-5 w-5 text-green-500" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <X className="h-5 w-5 text-green-500" />
                    </div>
                  </TableCell>
                  <TableCell>Lease termination fee</TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <X className="h-5 w-5 text-green-500" />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Mileage Restrictions</TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <X className="h-5 w-5 text-green-500" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <X className="h-5 w-5 text-green-500" />
                    </div>
                  </TableCell>
                  <TableCell>10,000 - 15,000 miles/year</TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <X className="h-5 w-5 text-green-500" />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Credit Score Requirements</TableCell>
                  <TableCell>650+ for best rates</TableCell>
                  <TableCell>Based on collateral</TableCell>
                  <TableCell>700+ typically</TableCell>
                  <TableCell>Flexible, 550+</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Approval Time</TableCell>
                  <TableCell>1-3 business days</TableCell>
                  <TableCell>Same day possible</TableCell>
                  <TableCell>1-2 business days</TableCell>
                  <TableCell>Same day possible</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

