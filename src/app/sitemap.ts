import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mahad.fcncare.com'
  
  const routes = [
    '',
    '/about/',
    '/academics/',
    '/religious/',
    '/admissions/',
    '/gallery/',
    '/news/',
    '/impact/',
    '/donate/',
    '/partners/',
    '/contact/',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))
}