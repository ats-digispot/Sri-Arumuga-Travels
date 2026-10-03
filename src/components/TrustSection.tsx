import React from 'react';
import { Home, Armchair, PhoneCall, MessageSquareHeart, CheckCircle2 } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import { Reveal } from './Reveal';

const ICONS = [Home, Armchair, PhoneCall, MessageSquareHeart];

export const TrustSection: React.FC = () => {
  const { t } = useI18n();

  return (
    <section id="trust" className="section-shell section-surface" aria-labelledby="trust-heading">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="eyebrow mb-4">
            <span className="eyebrow-dot" aria-hidden />
            {t.trust.eyebrow}
          </p>
          <h2 id="trust-heading" className="display-title max-w-3xl">
            {t.trust.title}
          </h2>
          <p className="lede mt-4">{t.trust.lede}</p>
        </Reveal>

        {/* 1. Dedicated Sedan Showcase (Toyota Etios TN 84 F 6278) */}
        <Reveal delayMs={70} className="mt-10">
          <figure className="fleet-card card overflow-hidden">
            <div className="grid md:grid-cols-12 gap-0 items-stretch">
              <div className="md:col-span-7 relative bg-[var(--color-ink)] overflow-hidden">
                <picture>
                  <source srcSet="/toyota-etios-tn84f6278.webp" type="image/webp" />
                  <img
                    src="/toyota-etios-tn84f6278.png"
                    alt={t.trust.etiosAlt}
                    width={1200}
                    height={900}
                    className="relative z-[1] w-full h-full min-h-[260px] md:min-h-[340px] object-cover object-center"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              </div>
              <figcaption className="md:col-span-5 flex flex-col justify-center gap-4 p-6 sm:p-8 bg-[var(--color-surface)] border-t md:border-t-0 md:border-l border-[var(--color-line)]">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-accent-text)]">
                    {t.trust.fleetEyebrow}
                  </p>
                  <h3 className="mt-1 font-display text-2xl text-[var(--color-ink)] leading-snug">
                    {t.trust.fleetTitle}
                  </h3>
                </div>
                <p className="text-[15px] text-[var(--color-muted)] leading-relaxed">
                  {t.trust.fleetBody}
                </p>
                {t.trust.etiosBadges && (
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--color-line)]">
                    {t.trust.etiosBadges.map((badge) => (
                      <span
                        key={badge}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--color-surface-2)] text-[var(--color-ink-soft)] border border-[var(--color-line)]"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-accent-text)]" aria-hidden />
                        {badge}
                      </span>
                    ))}
                  </div>
                )}
              </figcaption>
            </div>
          </figure>
        </Reveal>

        {/* 2. Middle Content: 4 Core Trust Pillars (Generous gap between images) */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {t.trust.points.map((point, i) => {
            const Icon = ICONS[i] ?? Home;
            return (
              <Reveal key={point.title} delayMs={50 + i * 60}>
                <article className="card card-hover p-6 sm:p-7 h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-[var(--color-accent-soft)] text-[var(--color-accent-text)] flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" aria-hidden strokeWidth={1.75} />
                    </div>
                    <div>
                      <h3 className="font-display text-xl text-[var(--color-ink)]">{point.title}</h3>
                      <p className="mt-2 text-[15px] text-[var(--color-muted)] leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* 3. Fleet Options Banner Showcase Card (Innova, Etios, Verna, Grand i10) */}
        <Reveal delayMs={80} className="mt-14">
          <figure className="card overflow-hidden">
            <div className="p-6 sm:p-8 bg-[var(--color-surface)] border-b border-[var(--color-line)]">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-accent-text)]">
                {t.trust.fleetBannerEyebrow}
              </p>
              <h3 className="mt-1 font-display text-2xl sm:text-3xl text-[var(--color-ink)] leading-snug">
                {t.trust.fleetBannerTitle}
              </h3>
              <p className="mt-3 text-[15px] text-[var(--color-muted)] leading-relaxed max-w-3xl">
                {t.trust.fleetBannerBody}
              </p>
            </div>
            <div className="relative bg-[var(--color-bg-deep)]">
              <picture>
                <source srcSet="/fleet-banner.webp" type="image/webp" />
                <img
                  src="/fleet-banner.png"
                  alt={t.trust.fleetBannerAlt}
                  width={1400}
                  height={788}
                  className="block w-full h-auto"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>
          </figure>
        </Reveal>

        {/* 4. Journey Booking Process */}
        <Reveal delayMs={80} className="mt-14">
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-bg-deep)] p-7 sm:p-10">
            <h3 className="font-display text-2xl sm:text-3xl text-[var(--color-ink)] mb-8">
              {t.trust.howTitle}
            </h3>
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {t.trust.steps.map((item) => (
                <li key={item.step}>
                  <span className="text-xs font-bold tracking-[0.16em] text-[var(--color-accent-text)]">
                    {item.step}
                  </span>
                  <h4 className="mt-2 font-display text-xl text-[var(--color-ink)]">{item.title}</h4>
                  <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed">
                    {item.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
