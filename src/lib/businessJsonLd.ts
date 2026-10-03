/**
 * Shared LocalBusiness / Organization JSON-LD.
 * Address is city + Tamil Nadu only — no street, PIN, geo, or hours.
 */
import { CONTACT_DATA } from './contact.ts';
import { BRAND } from './content.ts';
import { AREA_SERVED, BUSINESS } from './seoConfig.ts';

export const PHONE_E164 = [`+91${CONTACT_DATA.phone1}`, `+91${CONTACT_DATA.phone2}`] as const;

export function postalAddress() {
  return {
    '@type': 'PostalAddress' as const,
    addressLocality: BUSINESS.addressLocality,
    addressRegion: BUSINESS.addressRegion,
    addressCountry: BUSINESS.addressCountry,
  };
}

export function contactPoints() {
  return PHONE_E164.map((telephone) => ({
    '@type': 'ContactPoint' as const,
    telephone,
    contactType: 'customer service',
    areaServed: 'IN',
    availableLanguage: ['English', 'Tamil'],
  }));
}

export function areaServedNodes() {
  return AREA_SERVED.map((a) => ({ ...a }));
}

export function organizationNode(siteUrl: string, logoUrl: string) {
  return {
    '@type': 'Organization' as const,
    '@id': `${siteUrl}/#organization`,
    name: BRAND.name,
    url: `${siteUrl}/`,
    telephone: [...PHONE_E164],
    email: CONTACT_DATA.email,
    logo: logoUrl,
    contactPoint: contactPoints(),
    address: postalAddress(),
    areaServed: areaServedNodes(),
  };
}

export function localBusinessNode(siteUrl: string, logoUrl: string, description: string) {
  return {
    '@type': ['LocalBusiness', 'TravelAgency'] as const,
    '@id': `${siteUrl}/#business`,
    name: BRAND.name,
    description,
    url: `${siteUrl}/`,
    logo: logoUrl,
    image: logoUrl,
    telephone: [...PHONE_E164],
    email: CONTACT_DATA.email,
    contactPoint: contactPoints(),
    address: postalAddress(),
    parentOrganization: { '@id': `${siteUrl}/#organization` },
    areaServed: areaServedNodes(),
    keywords:
      'Srivilliputtur taxi, Srivilliputhur travels, outstation cab, Madurai airport taxi, Andal Temple, Rajapalayam cab',
  };
}

/**
 * The temple is a place people visit. The taxi company is not this attraction.
 * No ratings, hours, or geo — those are not verified here.
 */
export function andalTempleNode(siteUrl: string) {
  return {
    '@type': 'TouristAttraction' as const,
    '@id': `${siteUrl}/#andal-temple`,
    name: 'Srivilliputtur Andal Temple',
    alternateName: 'Andal Temple',
    description:
      'The Andal–Vatapatrasayi temple in Srivilliputtur, a public temple visitors travel to. Sri Arumuga Travels is a taxi service that drives people to this temple; the business is not the attraction.',
    address: postalAddress(),
    containedInPlace: { '@type': 'City', name: 'Srivilliputtur' },
  };
}
