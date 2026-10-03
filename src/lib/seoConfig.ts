/**
 * Central SEO / business config — verified facts only.
 * Street, PIN, geo, and opening hours are omitted: the owner never verified
 * them in this project. Do not invent street, PIN, hours, geo, prices, or ratings.
 * Visible and schema address is city + Tamil Nadu only.
 */
import { CONTACT_DATA } from './contact.ts';
import { BRAND } from './content.ts';

export const BUSINESS = {
  name: BRAND.name,
  shortName: BRAND.shortName,
  legalName: BRAND.name,
  addressLocality: CONTACT_DATA.location,
  addressRegion: CONTACT_DATA.region,
  addressCountry: 'IN',
  phones: [CONTACT_DATA.phone1, CONTACT_DATA.phone2] as const,
  formattedPhones: [CONTACT_DATA.formattedPhone1, CONTACT_DATA.formattedPhone2] as const,
  email: CONTACT_DATA.email,
  bookingMethods: ['Call', 'WhatsApp', 'Email'] as const,
  /** Sedan / small-car only — not tempo, bus, or a published fare card. */
  vehicle: 'Sedans such as Toyota Etios (small-car travel)',
  homeBaseSlug: 'srivilliputtur',
  /** Brand logo path (pair with absoluteUrl in schema) */
  logoPath: '/logo.png',
  /** Social / WebPage primary image path (scenic hero — not the logo) */
  ogImagePath: '/hero-scene.webp',
} as const;

/** Cities / regions already served on this site (JSON-LD areaServed). */
export const AREA_SERVED = [
  { '@type': 'City', name: 'Srivilliputtur' },
  { '@type': 'City', name: 'Srivilliputhur' },
  { '@type': 'City', name: 'Rajapalayam' },
  { '@type': 'City', name: 'Madurai' },
  { '@type': 'City', name: 'Chennai' },
  { '@type': 'City', name: 'Coimbatore' },
  { '@type': 'City', name: 'Tirunelveli' },
  { '@type': 'City', name: 'Rameswaram' },
  { '@type': 'City', name: 'Kodaikanal' },
  { '@type': 'City', name: 'Kanyakumari' },
  { '@type': 'City', name: 'Courtallam' },
  { '@type': 'City', name: 'Thoothukudi' },
  { '@type': 'City', name: 'Bengaluru' },
  { '@type': 'City', name: 'Thiruvananthapuram' },
  { '@type': 'State', name: 'Tamil Nadu' },
  { '@type': 'Country', name: 'India' },
] as const;

export type RouteKind = 'home' | 'services-hub' | 'service' | 'locations-hub' | 'location' | 'contact';

export interface SeoRoute {
  path: string;
  kind: RouteKind;
  /** URL slug segment for matching */
  id: string;
  title: string;
  description: string;
  /** Short H1-friendly label */
  heading: string;
  /** Parent breadcrumb path (omit for home) */
  parentPath?: string;
  parentLabel?: string;
  /** Service or location entity name for schema */
  entityName?: string;
  /** Related destination note from existing content */
  note?: string;
}

/** Canonical sitemap / prerender route list (no invented towns). */
export const SEO_ROUTES: SeoRoute[] = [
  {
    id: 'home',
    path: '/',
    kind: 'home',
    title: 'Taxi & Travels in Srivilliputtur (Srivilliputhur) | Sri Arumuga Travels',
    description:
      'Sri Arumuga Travels — taxi and travels in Srivilliputtur (Srivilliputhur), Tamil Nadu. Sedan outstation cab, Madurai airport links, temple trips, and Rajapalayam–Srivilliputtur cab booking by call or WhatsApp.',
    heading: 'Taxi and travels in Srivilliputtur (Srivilliputhur)',
  },
  {
    id: 'services',
    path: '/services',
    kind: 'services-hub',
    title: 'Taxi Service & Car Hire from Srivilliputtur | Sri Arumuga Travels',
    description:
      'Taxi service and sedan car hire from Srivilliputtur (Srivilliputhur) — outstation cab, Madurai airport pickup, temple pilgrimage, and local day taxi. Book by call or WhatsApp.',
    heading: 'Taxi and travel services from Srivilliputtur',
    parentPath: '/',
    parentLabel: 'Home',
  },
  {
    id: 'outstation-cab',
    path: '/services/outstation-cab',
    kind: 'service',
    title: 'Outstation Cab from Srivilliputtur & Rajapalayam | Sri Arumuga Travels',
    description:
      'Outstation cab booking from Srivilliputtur (Srivilliputhur) and nearby Rajapalayam — Chennai one-way, Madurai, Rameswaram, Kanyakumari, Courtallam, and wider Tamil Nadu. Call or WhatsApp.',
    heading: 'Outstation cab from Srivilliputtur',
    parentPath: '/services',
    parentLabel: 'Services',
    entityName: 'Outstation cab from Srivilliputtur',
  },
  {
    id: 'airport-taxi',
    path: '/services/airport-taxi',
    kind: 'service',
    title: 'Madurai Airport Taxi from Srivilliputtur | Sri Arumuga Travels',
    description:
      'Madurai airport taxi and station pickup from Srivilliputtur (Srivilliputhur) or Rajapalayam — clear meet plan, luggage-aware sedan. Enquire by call or WhatsApp.',
    heading: 'Madurai airport & station taxi',
    parentPath: '/services',
    parentLabel: 'Services',
    entityName: 'Airport and station taxi from Srivilliputtur',
  },
  {
    id: 'temple-pilgrimage',
    path: '/services/temple-pilgrimage',
    kind: 'service',
    title: 'Andal Temple & South TN Temple Tour Cab | Sri Arumuga Travels',
    description:
      'Andal Temple visits, Madurai to Srivilliputtur temple travel, and south Tamil Nadu pilgrimage sedan trips — multi-stop circuits paced for families. Call or WhatsApp Sri Arumuga Travels.',
    heading: 'Temple & pilgrimage trips',
    parentPath: '/services',
    parentLabel: 'Services',
    entityName: 'Temple and pilgrimage taxi from Srivilliputtur',
  },
  {
    id: 'local-taxi',
    path: '/services/local-taxi',
    kind: 'service',
    title: 'Car Rental & Taxi Service in Srivilliputtur | Sri Arumuga Travels',
    description:
      'Local taxi service and day car hire in Srivilliputtur (Srivilliputhur) — sedan trips around town, Madurai day hops, and nearby Rajapalayam. Call or WhatsApp to book.',
    heading: 'Local taxi & day car hire',
    parentPath: '/services',
    parentLabel: 'Services',
    entityName: 'Local and day taxi from Srivilliputtur',
  },
  {
    id: 'locations',
    path: '/locations',
    kind: 'locations-hub',
    title: 'Cab Routes from Srivilliputtur across Tamil Nadu | Sri Arumuga Travels',
    description:
      'Outstation cab routes from Srivilliputtur (Srivilliputhur) to Madurai, Chennai, Coimbatore, Tirunelveli, Rameswaram, Kodaikanal, Kanyakumari, Courtallam, Thoothukudi, and more.',
    heading: 'Where we go from Srivilliputtur',
    parentPath: '/',
    parentLabel: 'Home',
  },
  {
    id: 'srivilliputtur',
    path: '/locations/srivilliputtur',
    kind: 'location',
    title: 'Srivilliputtur Taxi Desk (Srivilliputhur) | Sri Arumuga Travels',
    description:
      'Sri Arumuga Travels home base in Srivilliputtur (Srivilliputhur), Tamil Nadu — local taxi, outstation cab, Andal Temple trips, and journeys across India by call or WhatsApp.',
    heading: 'Srivilliputtur (Srivilliputhur) — our home base',
    parentPath: '/locations',
    parentLabel: 'Locations',
    entityName: 'Srivilliputtur',
    note: 'Home base · Tamil Nadu',
  },
  {
    id: 'rajapalayam',
    path: '/locations/rajapalayam',
    kind: 'location',
    title: 'Rajapalayam to Srivilliputtur Cab | Sri Arumuga Travels',
    description:
      'Cab booking between Rajapalayam and Srivilliputtur (Srivilliputhur), plus Madurai airport and outstation sedan trips from the Rajapalayam–Srivilliputtur belt. Call or WhatsApp.',
    heading: 'Rajapalayam ↔ Srivilliputtur cab',
    parentPath: '/locations',
    parentLabel: 'Locations',
    entityName: 'Rajapalayam',
    note: 'Nearby town · Virudhunagar belt',
  },
  {
    id: 'madurai',
    path: '/locations/madurai',
    kind: 'location',
    title: 'Srivilliputtur to Madurai Airport Cab | Sri Arumuga Travels',
    description:
      'Cab from Srivilliputtur (Srivilliputhur) or Rajapalayam to Madurai city and Madurai airport — temple visits and airport links by sedan. Confirm pickup by call or WhatsApp.',
    heading: 'Srivilliputtur to Madurai',
    parentPath: '/locations',
    parentLabel: 'Locations',
    entityName: 'Madurai',
    note: 'Temple city & airport',
  },
  {
    id: 'chennai',
    path: '/locations/chennai',
    kind: 'location',
    title: 'Srivilliputtur to Chennai One Way Cab | Sri Arumuga Travels',
    description:
      'Chennai one-way and return outstation cab from Srivilliputtur (Srivilliputhur) — city and station drops. Plan your long drive by call or WhatsApp with Sri Arumuga Travels.',
    heading: 'Srivilliputtur to Chennai',
    parentPath: '/locations',
    parentLabel: 'Locations',
    entityName: 'Chennai',
    note: 'City & station links',
  },
  {
    id: 'bengaluru',
    path: '/locations/bengaluru',
    kind: 'location',
    title: 'Srivilliputtur to Bengaluru Cab | Sri Arumuga Travels',
    description:
      'Sedan travel from Srivilliputtur (Srivilliputhur) to Bengaluru for work and family trips. Share dates and passengers — we confirm timing and fare by call or WhatsApp.',
    heading: 'Srivilliputtur to Bengaluru',
    parentPath: '/locations',
    parentLabel: 'Locations',
    entityName: 'Bengaluru',
    note: 'Work and family travel',
  },
  {
    id: 'coimbatore',
    path: '/locations/coimbatore',
    kind: 'location',
    title: 'Srivilliputtur to Coimbatore Cab | Sri Arumuga Travels',
    description:
      'Outstation cab from Srivilliputtur (Srivilliputhur) to Coimbatore in west Tamil Nadu. Enquire by call or WhatsApp for pickup, timing, and fare clarity.',
    heading: 'Srivilliputtur to Coimbatore',
    parentPath: '/locations',
    parentLabel: 'Locations',
    entityName: 'Coimbatore',
    note: 'West Tamil Nadu',
  },
  {
    id: 'tirunelveli',
    path: '/locations/tirunelveli',
    kind: 'location',
    title: 'Srivilliputtur to Tirunelveli Cab | Sri Arumuga Travels',
    description:
      'Sedan cab from Srivilliputtur (Srivilliputhur) to Tirunelveli — a southern Tamil Nadu hub for Courtallam, Thoothukudi, and Kanyakumari legs. Call or WhatsApp to plan.',
    heading: 'Srivilliputtur to Tirunelveli',
    parentPath: '/locations',
    parentLabel: 'Locations',
    entityName: 'Tirunelveli',
    note: 'Southern TN hub',
  },
  {
    id: 'rameswaram',
    path: '/locations/rameswaram',
    kind: 'location',
    title: 'Srivilliputtur to Rameswaram Cab | Sri Arumuga Travels',
    description:
      'Pilgrimage road from Srivilliputtur (Srivilliputhur) to Rameswaram by sedan. Family-paced trips — book by call or WhatsApp with Sri Arumuga Travels.',
    heading: 'Srivilliputtur to Rameswaram',
    parentPath: '/locations',
    parentLabel: 'Locations',
    entityName: 'Rameswaram',
    note: 'Pilgrimage road',
  },
  {
    id: 'kodaikanal',
    path: '/locations/kodaikanal',
    kind: 'location',
    title: 'Srivilliputtur to Kodaikanal Cab | Sri Arumuga Travels',
    description:
      'Hill weekend travel from Srivilliputtur (Srivilliputhur) to Kodaikanal by sedan. Plan timing and fare by call or WhatsApp — no app cart.',
    heading: 'Srivilliputtur to Kodaikanal',
    parentPath: '/locations',
    parentLabel: 'Locations',
    entityName: 'Kodaikanal',
    note: 'Hill weekends',
  },
  {
    id: 'kanyakumari',
    path: '/locations/kanyakumari',
    kind: 'location',
    title: 'Srivilliputtur to Kanyakumari Cab | Sri Arumuga Travels',
    description:
      'Outstation sedan from Srivilliputtur (Srivilliputhur) toward Kanyakumari — land’s-end temple and coast visits paced for families. Enquire by call or WhatsApp.',
    heading: 'Srivilliputtur to Kanyakumari',
    parentPath: '/locations',
    parentLabel: 'Locations',
    entityName: 'Kanyakumari',
    note: 'Land’s-end · coast',
  },
  {
    id: 'courtallam',
    path: '/locations/courtallam',
    kind: 'location',
    title: 'Srivilliputtur to Courtallam Cab | Sri Arumuga Travels',
    description:
      'Day or outstation cab from Srivilliputtur (Srivilliputhur) to Courtallam (Kutralam) and the Tenkasi belt — season-aware waterfall visits. Call or WhatsApp to plan.',
    heading: 'Srivilliputtur to Courtallam',
    parentPath: '/locations',
    parentLabel: 'Locations',
    entityName: 'Courtallam',
    note: 'Waterfalls · Tenkasi belt',
  },
  {
    id: 'thoothukudi',
    path: '/locations/thoothukudi',
    kind: 'location',
    title: 'Srivilliputtur to Thoothukudi Cab | Sri Arumuga Travels',
    description:
      'Coastal-city sedan travel from Srivilliputtur (Srivilliputhur) to Thoothukudi (Tuticorin) for family or work trips. Confirm drop locality by call or WhatsApp.',
    heading: 'Srivilliputtur to Thoothukudi',
    parentPath: '/locations',
    parentLabel: 'Locations',
    entityName: 'Thoothukudi',
    note: 'Coastal city · Tuticorin',
  },
  {
    id: 'thiruvananthapuram',
    path: '/locations/thiruvananthapuram',
    kind: 'location',
    title: 'Srivilliputtur to Thiruvananthapuram Cab | Sri Arumuga Travels',
    description:
      'Road travel from Srivilliputtur (Srivilliputhur) to Thiruvananthapuram on the Kerala coast. Confirm your plan by call or WhatsApp with Sri Arumuga Travels.',
    heading: 'Srivilliputtur to Thiruvananthapuram',
    parentPath: '/locations',
    parentLabel: 'Locations',
    entityName: 'Thiruvananthapuram',
    note: 'Kerala coast',
  },
  {
    id: 'contact',
    path: '/contact',
    kind: 'contact',
    title: 'Call Taxi Srivilliputtur Contact Number | Sri Arumuga Travels',
    description:
      'Call taxi Srivilliputtur (Srivilliputhur) contact numbers: +91 98942 20028 and +91 86676 69560. WhatsApp or enquire online with Sri Arumuga Travels.',
    heading: 'Call taxi — Srivilliputtur contact',
    parentPath: '/',
    parentLabel: 'Home',
  },
];

export const KNOWN_PATHS = SEO_ROUTES.map((r) => r.path);

export function getRouteByPath(pathname: string): SeoRoute | undefined {
  const normalized =
    pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname || '/';
  return SEO_ROUTES.find((r) => r.path === normalized);
}

export function getServiceRoutes(): SeoRoute[] {
  return SEO_ROUTES.filter((r) => r.kind === 'service');
}

export function getLocationRoutes(): SeoRoute[] {
  return SEO_ROUTES.filter((r) => r.kind === 'location');
}

/** Map homepage destination i18n id → location path (skip "anywhere"). */
export const DESTINATION_PATH_BY_ID: Record<string, string> = {
  madurai: '/locations/madurai',
  chennai: '/locations/chennai',
  bengaluru: '/locations/bengaluru',
  coimbatore: '/locations/coimbatore',
  rameswaram: '/locations/rameswaram',
  kodaikanal: '/locations/kodaikanal',
  kanyakumari: '/locations/kanyakumari',
  courtallam: '/locations/courtallam',
  tirunelveli: '/locations/tirunelveli',
  thoothukudi: '/locations/thoothukudi',
  rajapalayam: '/locations/rajapalayam',
  tvm: '/locations/thiruvananthapuram',
};

export const SERVICE_PATH_BY_ID: Record<string, string> = {
  outstation: '/services/outstation-cab',
  airport: '/services/airport-taxi',
  temple: '/services/temple-pilgrimage',
  local: '/services/local-taxi',
};
