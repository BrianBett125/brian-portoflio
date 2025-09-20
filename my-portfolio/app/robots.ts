import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/private'], // Add any paths you want to disallow
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000'}/sitemap.xml`,
  };
}