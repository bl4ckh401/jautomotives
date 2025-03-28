import { Card, CardContent } from "@/components/ui/card"
import { ClipboardCheck, FileText } from "lucide-react"

export default function EligibilityProcess() {
  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Eligibility & Application Process</h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Learn about our eligibility requirements and how to apply for financing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-[#242b33] border-gray-700">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <ClipboardCheck className="mr-3 h-7 w-7 text-blue-500" />
              Eligibility Requirements
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-2 text-blue-400">Traditional Auto Loan</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Minimum credit score of 650 (lower scores may qualify for different rates)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Proof of steady income and employment history</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Debt-to-income ratio below 45%</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Valid driver's license and insurance</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-2 text-blue-400">Cryptocurrency Financing</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Ownership of supported cryptocurrencies (BTC, ETH, etc.)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Ability to transfer crypto to a secure escrow wallet</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Valid identification and proof of residence</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-2 text-blue-400">In-House Financing</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Minimum credit score of 550</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Proof of income and residence</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Valid ID and references</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Down payment (amount varies based on credit)</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#242b33] border-gray-700">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <FileText className="mr-3 h-7 w-7 text-blue-500" />
              Application Process
            </h3>

            <div className="space-y-8">
              <div className="flex">
                <div className="flex-shrink-0 mr-6">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-lg font-bold">
                    1
                  </div>
                  <div className="w-0.5 h-16 bg-blue-600/50 mx-auto mt-2"></div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Complete Application Form</h4>
                  <p className="text-gray-300">
                    Fill out our secure online application form with your personal and financial information. This
                    typically takes about 10-15 minutes.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 mr-6">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-lg font-bold">
                    2
                  </div>
                  <div className="w-0.5 h-16 bg-blue-600/50 mx-auto mt-2"></div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Document Submission</h4>
                  <p className="text-gray-300">
                    Upload required documents including ID, proof of income, and insurance information. For crypto
                    financing, you'll need to verify your crypto holdings.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 mr-6">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-lg font-bold">
                    3
                  </div>
                  <div className="w-0.5 h-16 bg-blue-600/50 mx-auto mt-2"></div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Application Review</h4>
                  <p className="text-gray-300">
                    Our financing team will review your application and documents. This process typically takes 1-3
                    business days depending on the financing option.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 mr-6">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-lg font-bold">
                    4
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Approval & Completion</h4>
                  <p className="text-gray-300">
                    Once approved, you'll receive your financing terms. After accepting, we'll finalize the paperwork
                    and you can drive away in your new vehicle.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

