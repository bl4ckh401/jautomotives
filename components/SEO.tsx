import Head from "next/head"

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  ogImage?: string
}

export default function SEO({
  title = "Jaba Automotives | Buy and Sell Cars with Cryptocurrency",
  description = "Jaba Automotives is the premier marketplace for buying and selling high-end vehicles using cryptocurrency. Explore our selection of luxury cars and experience seamless crypto transactions.",
  keywords = "luxury cars, cryptocurrency, bitcoin, ethereum, car marketplace, exotic cars, crypto payments, blockchain automotive",
  ogImage = "/logo.png",
}: SEOProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jabaautomotives.com"
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage.startsWith("http") ? ogImage : `${siteUrl}${ogImage}`} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage.startsWith("http") ? ogImage : `${siteUrl}${ogImage}`} />
      <link rel="canonical" href={siteUrl} />
    </Head>
  )
}

