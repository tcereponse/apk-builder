import { useEffect } from 'react'

export interface SeoProps {
  title: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'profile'
  siteName?: string
  twitterCard?: 'summary' | 'summary_large_image' | 'player' | 'app'
  noindex?: boolean
}

/** Sets document title and meta tags for SEO + social sharing. */
export function Seo({
  title,
  description,
  image,
  url,
  type = 'website',
  siteName,
  twitterCard = 'summary_large_image',
  noindex = false,
}: SeoProps) {
  useEffect(() => {
    document.title = title

    const setMeta = (name: string, content: string, attr: 'name' | 'property' = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    if (description) {
      setMeta('description', description)
      setMeta('og:description', description, 'property')
      setMeta('twitter:description', description)
    }

    setMeta('og:title', title, 'property')
    setMeta('twitter:title', title)
    setMeta('og:type', type, 'property')

    if (siteName) setMeta('og:site_name', siteName, 'property')
    if (image) {
      setMeta('og:image', image, 'property')
      setMeta('twitter:image', image)
    }
    if (url) setMeta('og:url', url, 'property')

    setMeta('twitter:card', twitterCard)

    if (noindex) {
      setMeta('robots', 'noindex, nofollow')
    }

    if (url) {
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.rel = 'canonical'
        document.head.appendChild(canonical)
      }
      canonical.href = url
    }
  }, [title, description, image, url, type, siteName, twitterCard, noindex])

  return null
}
