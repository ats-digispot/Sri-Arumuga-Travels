import React from 'react';
import { CONTACT_DATA, whatsappHref } from '../lib/contact';
import { BRAND } from '../lib/content';
import { SITE_URL, BRAND_LOGO_SQUARE_URL, BRAND_LOGO_URL, HERO_IMAGE_URL } from '../lib/site';
import { andalTempleNode, localBusinessNode, organizationNode } from '../lib/businessJsonLd';
import { useI18n } from '../i18n/I18nProvider';

/** LocalBusiness / TravelAgency + WebSite + WebPage (+ FAQ when present). Facts only. */
export const SeoSchema: React.FC = () => {
  const { t, locale } = useI18n();
  const pageUrl = `${SITE_URL}/`;
  const heroImage = HERO_IMAGE_URL;
  const waUrl = whatsappHref(t.whatsapp.greeting);
  const inLanguage = locale === 'ta' ? 'ta-IN' : 'en-IN';

  const businessDescription =
    locale === 'ta'
      ? 'ஸ்ரீவில்லிபுத்தூர், தமிழ்நாட்டிலிருந்து டாக்சி மற்றும் சிறிய கார் பயணம் — வெளியூர், விமான நிலையம், கோயில் மற்றும் உள்ளூர் பயணங்கள் இந்தியா முழுவதும்.'
      : 'Taxi and small-car travel from Srivilliputtur, Tamil Nadu — outstation, airport, temple, and local trips across India.';

  const graph: Record<string, unknown>[] = [
    organizationNode(SITE_URL, BRAND_LOGO_SQUARE_URL),
    {
      ...localBusinessNode(SITE_URL, BRAND_LOGO_SQUARE_URL, businessDescription, BRAND_LOGO_URL),
      alternateName: t.brand.name,
      potentialAction: [
        {
          '@type': 'ContactAction',
          name: 'Call',
          target: `tel:+91${CONTACT_DATA.phone1}`,
        },
        {
          '@type': 'ContactAction',
          name: 'Call',
          target: `tel:+91${CONTACT_DATA.phone2}`,
        },
        {
          '@type': 'CommunicateAction',
          name: 'WhatsApp',
          target: waUrl,
          url: waUrl,
        },
        {
          '@type': 'CommunicateAction',
          name: 'Email',
          target: `mailto:${CONTACT_DATA.email}`,
        },
      ],
    },
    andalTempleNode(SITE_URL),
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: BRAND.name,
      url: pageUrl,
      description:
        'Official site for Sri Arumuga Travels — enquire by call or WhatsApp for travel from Srivilliputtur.',
      publisher: { '@id': `${SITE_URL}/#business` },
      inLanguage: ['en-IN', 'ta-IN'],
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/#webpage`,
      url: pageUrl,
      name:
        locale === 'ta'
          ? 'ஸ்ரீவில்லிபுத்தூர் டாக்சி & வெளியூர் கேப் | ஸ்ரீ அருமுக டிராவல்ஸ்'
          : 'Srivilliputtur Taxi & Outstation Cab | Sri Arumuga Travels',
      description: t.hero.lede,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#business` },
      mentions: { '@id': `${SITE_URL}/#andal-temple` },
      primaryImageOfPage: heroImage,
      inLanguage,
    },
  ];

  if (t.faq?.items?.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      isPartOf: { '@id': `${SITE_URL}/#webpage` },
      inLanguage,
      mainEntity: t.faq.items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    });
  }

  const schema = {
    '@context': 'https://schema.org',
    '@graph': graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
