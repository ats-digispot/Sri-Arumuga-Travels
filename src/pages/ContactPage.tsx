import React, { useMemo, useRef } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { EnquirySection } from '../components/EnquirySection';
import { BUSINESS_ADDRESS, CONTACT_DATA, businessAddressDisplay, businessMapsUrl, publicEmailHref, telHref, whatsappHref } from '../lib/contact';
import { useI18n } from '../i18n/I18nProvider';
import { getPagesCopy } from '../i18n/pages';
import { Phone, MessageCircle, Mail, MapPin } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { t, locale } = useI18n();
  const pages = getPagesCopy(locale);
  const location = useLocation();
  const [params] = useSearchParams();
  const initialDestination = useMemo(() => {
    const fromState = (location.state as { destination?: string } | null)?.destination;
    return fromState || params.get('destination') || '';
  }, [location.state, params]);
  const formRef = useRef<HTMLFormElement | null>(null);

  return (
    <div className="pt-[calc(var(--header-h))]">
      <div className="section-shell section-surface !pb-4">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs
            items={[
              { label: pages.ui.home, to: '/' },
              { label: t.nav.enquire },
            ]}
          />
          <p className="eyebrow mb-4">
            <span className="eyebrow-dot" aria-hidden />
            {pages.contact.eyebrow}
          </p>
          <h1 className="display-title max-w-3xl">{pages.contact.title}</h1>
          <p className="mt-3 text-sm font-semibold text-[var(--color-accent-text)]">{CONTACT_DATA.formattedPhone1} · {CONTACT_DATA.formattedPhone2}</p>
          <p className="lede mt-4 max-w-2xl">{pages.contact.lede}</p>
          <address className="mt-4 not-italic text-sm text-[var(--color-ink-soft)] max-w-xl">
            <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-faint)] mb-1">{t.footer.address}</span>
            <span className="block">{businessAddressDisplay()}</span>
            <span className="block mt-1">
              {BUSINESS_ADDRESS.plusCode}
              {' · '}
              <a
                href={businessMapsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-[var(--color-accent-text)]"
              >
                {t.footer.maps}
              </a>
            </span>
          </address>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={telHref(CONTACT_DATA.phone1)} className="btn btn-primary">
              <Phone className="w-4 h-4" aria-hidden />
              {CONTACT_DATA.formattedPhone1}
            </a>
            <a href={telHref(CONTACT_DATA.phone2)} className="btn btn-secondary">
              <Phone className="w-4 h-4" aria-hidden />
              {CONTACT_DATA.formattedPhone2}
            </a>
            <a
              href={whatsappHref(t.whatsapp.greeting)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <MessageCircle className="w-4 h-4" aria-hidden />
              {t.common.whatsapp}
            </a>
            <a href={publicEmailHref()} className="btn btn-secondary">
              <Mail className="w-4 h-4" aria-hidden />
              {CONTACT_DATA.email}
            </a>
            <a
              href={businessMapsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <MapPin className="w-4 h-4 text-[var(--color-accent-text)]" aria-hidden />
              {t.footer.maps}
            </a>
          </div>
        </div>
      </div>
      <EnquirySection initialDestination={initialDestination} formRef={formRef} />
    </div>
  );
};
