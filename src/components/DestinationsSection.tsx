import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import { Reveal } from './Reveal';

interface DestinationsSectionProps {
  onEnquireRoute: (destination: string) => void;
  onDestinationNavigate?: (id: string) => void;
}

export const DestinationsSection: React.FC<DestinationsSectionProps> = ({ onEnquireRoute }) => {
  const { t } = useI18n();

  return (
    <section
      id="destinations"
      className="section-shell section-muted"
      aria-labelledby="destinations-heading"
    >
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="eyebrow mb-4">
            <span className="eyebrow-dot" aria-hidden />
            {t.destinations.eyebrow}
          </p>
          <h2 id="destinations-heading" className="display-title max-w-3xl">
            {t.destinations.title}
          </h2>
          <p className="lede mt-4">{t.destinations.lede}</p>
        </Reveal>

        {/* Highlight Banner: All Around Tamil Nadu & Beyond */}
        <Reveal delayMs={50} className="mt-8">
          <div className="rounded-[var(--radius-lg)] border-2 border-[var(--color-accent-soft)] bg-[var(--color-surface)] shadow-soft p-6 sm:p-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-accent-text)] flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 shrink-0 text-[var(--color-accent)]" aria-hidden />
                  {t.destinations.tnHighlightEyebrow}
                </p>
                <h3 className="mt-2 font-display text-2xl sm:text-3xl text-[var(--color-ink)] leading-snug">
                  {t.destinations.tnHighlightTitle}
                </h3>
                <p className="mt-3 text-[15px] sm:text-base text-[var(--color-muted)] leading-relaxed">
                  {t.destinations.tnHighlightBody}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
                <button
                  type="button"
                  onClick={() => onEnquireRoute('All Around Tamil Nadu')}
                  className="btn-primary py-3 px-6 inline-flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <span>{t.destinations.tnHighlightCta}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" aria-hidden />
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Direct Link to full destinations directory */}
        <Reveal delayMs={70} className="mt-6 flex justify-end">
          <Link
            to="/locations"
            className="text-[var(--color-accent-text)] font-semibold text-sm hover:underline inline-flex items-center gap-1.5"
          >
            <span>{t.nav.destinations}</span>
            <ArrowRight className="w-4 h-4" aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
};
