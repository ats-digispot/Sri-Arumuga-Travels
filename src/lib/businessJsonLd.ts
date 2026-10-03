/**
 * Shared LocalBusiness / Organization JSON-LD.
 * LocalBusiness uses the confirmed street, plus code, and PIN.
 * Organization and the Andal temple stay city-level — the temple is not this desk.
 * No hours, ratings, or invented coordinates.
 */
import { BUSINESS_ADDRESS, CONTACT_DATA } from './contact.ts';
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

/** Desk address only. Plus code is stored as given — not converted to lat/long. */
export function businessPostalAddress() {
  return {
    '@type': 'PostalAddress' as const,
    streetAddress: `${BUSINESS_ADDRESS.plusCode}, ${BUSINESS_ADDRESS.street}`,
    addressLocality: BUSINESS.addressLocality,
    postalCode: BUSINESS_ADDRESS.postalCode,
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
    telephone: PHONE_E164[0],
    email: CONTACT_DATA.email,
    logo: logoUrl,
    sameAs: [BUSINESS_ADDRESS.mapsUrl],
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
    telephone: PHONE_E164[0],
    email: CONTACT_DATA.email,
    hasMap: BUSINESS_ADDRESS.mapsUrl,
    sameAs: [BUSINESS_ADDRESS.mapsUrl],
    geo: {
      '@type': 'GeoCoordinates' as const,
      latitude: BUSINESS_ADDRESS.latitude,
      longitude: BUSINESS_ADDRESS.longitude,
    },
    contactPoint: contactPoints(),
    address: businessPostalAddress(),
    parentOrganization: { '@id': `${siteUrl}/#organization` },
    areaServed: areaServedNodes(),
    keywords:
      'Srivilliputtur taxi, Srivilliputhur travels, outstation cab, Madurai airport taxi, Andal Temple, Rajapalayam cab',
  };
}

/**
 * The temple is a place people visit. The taxi company is not this attraction.
 * No ratings, hours, or geo. Do not copy the travel-desk street onto the temple.
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
