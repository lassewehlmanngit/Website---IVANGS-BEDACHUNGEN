import { useTina } from 'tinacms/dist/react';
import { client } from './client';
import type { SupportedLang } from '@/shared/config/i18n';

export function useHomePageData(lang: SupportedLang) {
  const relativePath = 'startseite.json';

  // Use useTina hook for visual editing support
  return useTina({
    query: `
      query HomePageQuery($relativePath: String!) {
        homePage(relativePath: $relativePath) {
          seo {
            title
            description
          }
          hero {
            eyebrow
            title
            subtitle
            description
            primaryButtonText
            primaryButtonLink
            secondaryButtonText
            secondaryButtonLink
            backgroundImage
            videoUrl
            showQuickForm
          }
          stats {
            value
            label
            icon
          }
          servicesSection {
            eyebrow
            title
            description
          }
          ceoQuote {
            eyebrow
            name
            role
            quote
            text
            image
            buttonText
            buttonLink
          }
          projects {
            title
            description
            image
            link
          }
          finalCTA {
            title
            description
            buttonText
            buttonLink
          }
        }
      }
    `,
    variables: { relativePath },
    data: null,
  });
}
