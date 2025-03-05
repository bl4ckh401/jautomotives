import Head from "next/head"

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  ogImage?: string
}

export default function SEO({
  title = "CryptoDrive Luxury | Buy and Sell Luxury Cars with Cryptocurrency",
  description = "CryptoDrive Luxury is the premier marketplace for buying and selling high-end vehicles using cryptocurrency. Explore our selection of luxury cars and experience seamless crypto transactions.",
  keywords = "luxury cars, cryptocurrency, bitcoin, ethereum, car marketplace, exotic cars, crypto payments, blockchain automotive",
  ogImage = "https://cryptodrive-luxury.com/og-image.jpg",
}: SEOProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <link rel="canonical" href="https://cryptodrive-luxury.com" />
    </Head>
  )
}

