import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jabaautomotives.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/dashboard/',
          '/profile/',
          '/sign-in',
          '/sign-up',
          '/forgot-password',
          '/_next/',
          '/private/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/dashboard/',
          '/profile/',
          '/sign-in',
          '/sign-up',
          '/forgot-password',
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}