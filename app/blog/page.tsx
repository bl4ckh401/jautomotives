import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import SEO from "@/components/SEO"

const blogPosts = [
  {
    id: 1,
    title: "The Future of  Car Buying: Cryptocurrency Transactions",
    excerpt:
      "Explore how cryptocurrency is revolutionizing the luxury automotive market and what it means for buyers and sellers.",
    date: "2023-06-20",
    slug: "future-of-luxury-car-buying-cryptocurrency",
  },
  {
    id: 2,
    title: "Top 5  Cars You Can Buy with Bitcoin in 2023",
    excerpt:
      "Discover the most sought-after luxury vehicles that can be purchased using Bitcoin and other cryptocurrencies.",
    date: "2023-06-15",
    slug: "top-5-luxury-cars-buy-with-bitcoin-2023",
  },
  {
    id: 3,
    title: "Crypto Financing: A New Era for  Car Loans",
    excerpt: "Learn about the innovative financing options available for luxury car buyers using cryptocurrency.",
    date: "2023-06-10",
    slug: "crypto-financing-new-era-luxury-car-loans",
  },
]

export default function BlogPage() {
  return (
    <>
      <SEO
        title="CryptoDrive  Blog | Cryptocurrency and  Cars"
        description="Stay informed about the latest trends in cryptocurrency and luxury car transactions. Explore our articles on buying luxury cars with Bitcoin and more."
        keywords="luxury cars, cryptocurrency, bitcoin, car financing, automotive trends, crypto payments"
      />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">CryptoDrive  Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id}>
              <CardContent className="p-4">
                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-2">{post.date}</p>
                <p className="mb-4">{post.excerpt}</p>
              </CardContent>
              <CardFooter>
                <Link href={`/blog/${post.slug}`} className="w-full">
                  <Button className="w-full">Read More</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}

