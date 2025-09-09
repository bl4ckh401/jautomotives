/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://cryptodrive-.com",
  generateRobotsTxt: true,
  exclude: ["/server-sitemap.xml"], // exclude server-side generated sitemap
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://cryptodrive-.com/server-sitemap.xml", // Add server-side generated sitemap
    ],
  },
}

