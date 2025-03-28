import { Card, CardContent } from "@/components/ui/card"
import { CreditCard, Landmark, Coins, Wallet, Banknote } from "lucide-react"

export default function FinancingOptions() {
  const options = [
    {
      title: "Traditional Auto Loan",
      icon: <Landmark className="h-10 w-10 text-blue-500" />,
      description:
        "Fixed monthly payments over a set term, typically 36-72 months. Competitive interest rates based on your credit score and loan term.",
      features: [
        "Fixed interest rates from 3.99% - 8.99% APR",
        "Loan terms from 36 to 72 months",
        "No prepayment penalties",
        "Quick approval process",
      ],
    },
    {
      title: "Cryptocurrency Financing",
      icon: <Coins className="h-10 w-10 text-blue-500" />,
      description:
        "Use your cryptocurrency as collateral for your auto loan, or make direct purchases using Bitcoin, Ethereum, and other major cryptocurrencies.",
      features: [
        "No need to liquidate your crypto assets",
        "Competitive loan-to-value ratios",
        "Flexible repayment options",
        "Direct crypto payments accepted",
      ],
    },
    {
      title: "Lease Options",
      icon: <CreditCard className="h-10 w-10 text-blue-500" />,
      description:
        "Lower monthly payments with the option to purchase the vehicle at the end of the lease term or upgrade to a new model.",
      features: [
        "Lower monthly payments than traditional loans",
        "Lease terms from 24 to 48 months",
        "Flexible end-of-lease options",
        "Warranty coverage throughout lease term",
      ],
    },
    {
      title: "In-House Financing",
      icon: <Wallet className="h-10 w-10 text-blue-500" />,
      description:
        "Financing directly through JABA Automobiles, offering flexible options for those with limited or challenged credit history.",
      features: [
        "Flexible approval criteria",
        "Customized payment plans",
        "Build or rebuild your credit",
        "No third-party lenders involved",
      ],
    },
    {
      title: "Trade-In & Finance",
      icon: <Banknote className="h-10 w-10 text-blue-500" />,
      description:
        "Trade in your current vehicle and apply the value toward your down payment, reducing your loan amount and monthly payments.",
      features: [
        "Immediate trade-in valuation",
        "Reduced loan amount",
        "Lower monthly payments",
        "Simplified transaction process",
      ],
    },
  ]

  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Financing Options</h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          We offer a variety of financing solutions to fit your needs and budget. Explore our options below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {options.map((option, index) => (
          <Card
            key={index}
            className="bg-[#242b33] border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-blue-500/20 hover:shadow-lg overflow-hidden h-full"
          >
            <CardContent className="p-8">
              <div className="mb-4">{option.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{option.title}</h3>
              <p className="text-gray-300 mb-4">{option.description}</p>
              <div className="space-y-2">
                <h4 className="font-semibold text-blue-400">Key Features:</h4>
                <ul className="space-y-1">
                  {option.features.map((feature, idx) => (
                    <li key={idx} className="text-gray-300 text-sm flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

