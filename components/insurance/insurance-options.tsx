import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Check, X } from "lucide-react"

export default function InsuranceOptions() {
  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Insurance Plans</h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">Choose the plan that best fits your needs and budget.</p>
      </div>

      <Card className="bg-[#242b33] border-gray-700 overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl">Insurance Plans Comparison</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#1a1f24]">
                  <TableHead className="w-[250px]">Coverage</TableHead>
                  <TableHead>Basic Plan</TableHead>
                  <TableHead>Standard Plan</TableHead>
                  <TableHead>Premium Plan</TableHead>
                  <TableHead>Luxury Plan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Liability Coverage</TableCell>
                  <TableCell>Minimum Required</TableCell>
                  <TableCell>KES 3M/5M</TableCell>
                  <TableCell>KES 5M/10M</TableCell>
                  <TableCell>KES 10M/20M</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Collision Coverage</TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <X className="h-5 w-5 text-red-500" />
                    </div>
                  </TableCell>
                  <TableCell>KES 500K Limit</TableCell>
                  <TableCell>KES 1M Limit</TableCell>
                  <TableCell>Full Replacement</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Comprehensive Coverage</TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <X className="h-5 w-5 text-red-500" />
                    </div>
                  </TableCell>
                  <TableCell>KES 500K Limit</TableCell>
                  <TableCell>KES 1M Limit</TableCell>
                  <TableCell>Full Replacement</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Personal Injury Protection</TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <X className="h-5 w-5 text-red-500" />
                    </div>
                  </TableCell>
                  <TableCell>KES 250K Limit</TableCell>
                  <TableCell>KES 500K Limit</TableCell>
                  <TableCell>KES 1M Limit</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Uninsured Motorist</TableCell>
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
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Roadside Assistance</TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <X className="h-5 w-5 text-red-500" />
                    </div>
                  </TableCell>
                  <TableCell>Basic</TableCell>
                  <TableCell>Enhanced</TableCell>
                  <TableCell>Premium 24/7</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Rental Car Coverage</TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <X className="h-5 w-5 text-red-500" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <X className="h-5 w-5 text-red-500" />
                    </div>
                  </TableCell>
                  <TableCell>Economy Car</TableCell>
                  <TableCell>Luxury Car</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Gap Insurance</TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <X className="h-5 w-5 text-red-500" />
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
                  <TableCell>
                    <div className="flex justify-center">
                      <Check className="h-5 w-5 text-green-500" />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Mechanical Breakdown</TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <X className="h-5 w-5 text-red-500" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <X className="h-5 w-5 text-red-500" />
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
                  <TableCell className="font-medium">Monthly Premium</TableCell>
                  <TableCell>From KES 2,500</TableCell>
                  <TableCell>From KES 5,000</TableCell>
                  <TableCell>From KES 8,500</TableCell>
                  <TableCell>From KES 15,000</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

