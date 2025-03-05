/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://cryptodrive-luxury.com",
  generateRobotsTxt: true,
  exclude: ["/server-sitemap.xml"], // exclude server-side generated sitemap
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://cryptodrive-luxury.com/server-sitemap.xml", // Add server-side generated sitemap
    ],
  },
}

