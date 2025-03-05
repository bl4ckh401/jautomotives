import SEO from "@/components/SEO"
import Breadcrumbs from "@/components/Breadcrumbs"

export default function TeslaPage() {
  const breadcrumbItems = [
    { label: "Brands", href: "/brands" },
    { label: "Tesla", href: "/brands/tesla" },
  ]

  return (
    <>
      <SEO
        title="Buy Tesla with Cryptocurrency | CryptoDrive Luxury"
        description="Explore our collection of Tesla electric vehicles available for purchase with cryptocurrency. Experience the future of automotive technology and finance with CryptoDrive Luxury."
        keywords="Tesla, electric cars, cryptocurrency, Bitcoin, luxury vehicles, Model S, Model 3, Model X, Model Y"
      />
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbItems} />
        <h1 className="text-4xl font-bold my-8">Tesla: The Future of Electric Luxury</h1>
        {/* Rest of the component remains the same */}
      </div>
    </>
  )
}

