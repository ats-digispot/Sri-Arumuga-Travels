import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import { Reveal } from './Reveal';
import { DESTINATION_PATH_BY_ID } from '../lib/seoConfig';

interface DestinationsSectionProps {
  onEnquireRoute: (destination: string) => void;
  onDestinationNavigate?: (id: string) => void;
}

const INITIAL_VISIBLE_COUNT = 4;

export const DestinationsSection: React.FC<DestinationsSectionProps> = ({ onEnquireRoute }) => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  const displayedItems = showAll
    ? t.destinations.items
    : t.destinations.items.slice(0, INITIAL_VISIBLE_COUNT);

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
          <div className="rounded-[var(--radius-lg)] border-2 border-[var(--color-accent-soft)] bg-[var(--color-surface)] shadow-soft p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-accent-text)] flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 shrink-0 text-[var(--color-accent)]" aria-hidden />
                  {t.destinations.tnHighlightEyebrow}
                </p>
                <h3 className="mt-2 font-display text-2xl sm:text-3xl text-[var(--color-ink)] leading-snug">
                  {t.destinations.tnHighlightTitle}
                </h3>
                <p className="mt-2 text-[15px] text-[var(--color-muted)] leading-relaxed">
                  {t.destinations.tnHighlightBody}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => onEnquireRoute('All Around Tamil Nadu')}
                  className="btn-primary text-sm py-2.5 px-5 inline-flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <span>{t.destinations.tnHighlightCta}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" aria-hidden />
                </button>

                {/* Quick Dropdown Route Picker */}
                <div className="relative min-w-[240px] sm:min-w-[280px]">
                  <label htmlFor="destination-quick-select" className="sr-only">
                    {t.destinations.quickDropdownLabel}
                  </label>
                  <div className="relative">
                    <select
                      id="destination-quick-select"
                      defaultValue=""
                      onChange={(e) => {
                        const destId = e.target.value;
                        if (!destId) return;
                        const path = DESTINATION_PATH_BY_ID[destId];
                        if (path) {
                          navigate(path);
                        } else {
                          onEnquireRoute(destId === 'anywhere' ? 'Anywhere in Tamil Nadu & India' : destId);
                        }
                      }}
                      className="w-full appearance-none rounded-xl border border-[var(--color-line-strong)] bg-[var(--color-surface-2)] py-2.5 pl-3.5 pr-10 text-xs sm:text-sm font-semibold text-[var(--color-ink)] hover:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-colors cursor-pointer"
                    >
                      <option value="" disabled>
                        {t.destinations.quickDropdownPlaceholder}
                      </option>
                      {t.destinations.items.map((place) => (
                        <option key={place.id} value={place.id}>
                          {place.name} — {place.note}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted)]"
                      aria-hidden
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Compact Grid of Destinations */}
        <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {displayedItems.map((place, i) => {
            const path = DESTINATION_PATH_BY_ID[place.id];
            const label =
              place.id === 'anywhere'
                ? t.destinations.enquireCustom
                : `${t.destinations.enquireTo} ${place.name}`;
            const body = (
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-lg text-[var(--color-ink)] group-hover:text-[var(--color-accent-text)] transition-colors">
                    {place.name}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">{place.note}</p>
                </div>
                <ArrowUpRight
                  className="w-4 h-4 text-[var(--color-faint)] group-hover:text-[var(--color-accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1"
                  aria-hidden
                />
              </div>
            );
            return (
              <li key={place.id}>
                <Reveal delayMs={30 + (i % 4) * 30}>
                  {path ? (
                    <Link to={path} aria-label={label} className="w-full text-left card card-hover p-5 group block">
                      {body}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onEnquireRoute('')}
                      aria-label={label}
                      className="w-full text-left card card-hover p-5 group"
                    >
                      {body}
                    </button>
                  )}
                </Reveal>
              </li>
            );
          })}
        </ul>

        {/* Expand/Collapse Toggle & Full Directory Link */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--color-line-strong)] bg-[var(--color-surface)] text-sm font-semibold text-[var(--color-ink)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent-text)] transition-colors cursor-pointer shadow-xs"
          >
            <span>{showAll ? t.destinations.showLess : t.destinations.showAll}</span>
            {showAll ? (
              <ChevronUp className="w-4 h-4 shrink-0 text-[var(--color-accent-text)]" aria-hidden />
            ) : (
              <ChevronDown className="w-4 h-4 shrink-0 text-[var(--color-accent-text)]" aria-hidden />
            )}
          </button>

          <Link
            to="/locations"
            className="text-[var(--color-accent-text)] font-semibold text-sm hover:underline inline-flex items-center gap-1.5"
          >
            <span>{t.nav.destinations}</span>
            <ArrowRight className="w-4 h-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
};
