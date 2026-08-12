import { notFound } from 'next/navigation';
import ScrollHero from '../../components/ScrollHero';
import ScrollHeader from '../../components/ScrollHeader';
import ManifestoSection from '../../components/ManifestoSection';
import { getDictionary } from '../../dictionaries/content';

const SUPPORTED = ['en', 'pt-BR'];
const INSTAGRAM_URL = 'https://www.instagram.com/commandtwr';
const DELVER_URL = 'https://twr-delver.vercel.app/';
const COMMAND_TOWER_DOWNLOAD_URL = 'https://github.com/dimixd-githud/twr-command-tower-releases/releases/download/v1.1.1-alpha/TWR.-.Command.Tower.1.1.1-alpha.exe';

export function generateStaticParams() {
  return SUPPORTED.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const copy = getDictionary(lang);
  return {
    title: `TWR | ${copy.final.title}`,
    description: copy.hero.lede,
  };
}

function FeatureGrid({ items }) {
  return (
    <div className="feature-grid">
      {items.map(([title, text], index) => (
        <article className="feature-card" key={title}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <h3>{title}</h3>
          <p>{text}</p>
        </article>
      ))}
    </div>
  );
}

function MediaGallery({ product, slotLabel }) {
  return (
    <div className="media-gallery" aria-label={`${product} media gallery`}>
      {[1, 2, 3, 4, 5].map((slot) => (
        <div className={`media-slot media-slot-${slot}`} key={slot}>
          <span>{String(slot).padStart(2, '0')}</span>
          <p>{slotLabel}</p>
        </div>
      ))}
    </div>
  );
}

function ProductHero({
  className,
  background,
  logo,
  logoClass,
  logoAlt,
  eyebrow,
  titleTop,
  titleBottom,
  lede,
  quote,
  cta,
  ctaSymbol,
  ctaHref,
}) {
  return (
    <div
      className={`product-hero ${className}`}
      style={{ '--product-bg': `url("${background}")` }}
    >
      <div className="product-hero-image" aria-hidden="true" />
      <div className="product-hero-shade" aria-hidden="true" />
      <div className="product-hero-grain" aria-hidden="true" />
      <div className="shell product-hero-inner">
        <div className="product-copy product-copy-overlay">
          <p className="eyebrow">{eyebrow}</p>
          <img className={`product-logo ${logoClass}`} src={logo} alt={logoAlt} />
          <h2 className="section-subtitle">{titleTop}<br />{titleBottom}</h2>
          <p className="section-lede">{lede}</p>
          {quote ? <p className="pull-quote">{quote}</p> : null}
          <a className="text-link" href={ctaHref}>{cta} <span>{ctaSymbol}</span></a>
        </div>
      </div>
      <div className="product-hero-scrollhint" aria-hidden="true"><i /></div>
    </div>
  );
}

export default async function Home({ params }) {
  const { lang } = await params;
  if (!SUPPORTED.includes(lang)) notFound();
  const copy = getDictionary(lang);

  return (
    <main>
      <ScrollHeader lang={lang} copy={copy.nav} alternateLocale={copy.alternateLocale} alternateLabel={copy.alternateLabel} instagramUrl={INSTAGRAM_URL} />
      <ScrollHero copy={copy.hero} delverUrl={DELVER_URL} commandTowerUrl={COMMAND_TOWER_DOWNLOAD_URL} />
      <ManifestoSection copy={copy.manifesto} />

      <section className="product-section snap-section" id="delver">
        <ProductHero
          className="delver-product-hero"
          background="/assets/delver-mimic.png"
          logo="/assets/delver-logo.svg"
          logoClass="delver-logo"
          logoAlt="TWR Delver"
          eyebrow={copy.delver.eyebrow}
          titleTop={copy.delver.titleTop}
          titleBottom={copy.delver.titleBottom}
          lede={copy.delver.lede}
          cta={copy.delver.cta}
          ctaSymbol="↗"
          ctaHref={DELVER_URL}
        />
        <div className="product-content">
          <div className="shell"><FeatureGrid items={copy.delver.features} /></div>
          <div className="shell gallery-block">
            <p className="eyebrow gallery-eyebrow">{copy.delver.galleryEyebrow}</p>
            <h3 className="gallery-title section-subtitle">{copy.delver.galleryTitle}</h3>
            <MediaGallery product="Delver" slotLabel={copy.gallerySlot} />
          </div>
        </div>
      </section>

      <section className="product-section command-section snap-section" id="command-tower">
        <ProductHero
          className="command-product-hero"
          background="/assets/command-palantir.png"
          logo="/assets/command-tower-logo.svg"
          logoClass="command-logo"
          logoAlt="TWR Command Tower"
          eyebrow={copy.command.eyebrow}
          titleTop={copy.command.titleTop}
          titleBottom={copy.command.titleBottom}
          lede={copy.command.lede}
          quote={copy.command.quote}
          cta={copy.command.cta}
          ctaSymbol="↓"
          ctaHref={COMMAND_TOWER_DOWNLOAD_URL}
        />
        <div className="product-content">
          <div className="shell"><FeatureGrid items={copy.command.features} /></div>
          <div className="shell gallery-block">
            <p className="eyebrow gallery-eyebrow">{copy.command.galleryEyebrow}</p>
            <h3 className="gallery-title section-subtitle">{copy.command.galleryTitle}</h3>
            <MediaGallery product="Command Tower" slotLabel={copy.gallerySlot} />
          </div>
        </div>
      </section>

      <section className="community-section snap-section" id="community">
        <div className="shell community-inner">
          <div>
            <p className="eyebrow">{copy.community.eyebrow}</p>
            <h2 className="section-subtitle">{copy.community.titleTop}<br />{copy.community.titleBottom}</h2>
          </div>
          <div className="community-copy">
            <p>{copy.community.copy}</p>
            <a className="button button-light" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">{copy.community.cta}</a>
          </div>
        </div>
      </section>

      <section className="final-cta snap-section">
        <div className="shell final-inner">
          <img src="/assets/twr-logo.svg" alt="TWR" />
          <p className="eyebrow">{copy.final.eyebrow}</p>
          <h2 className="section-subtitle">{copy.final.title}</h2>
          <div className="button-row centered">
            <a className="button button-primary" href={DELVER_URL}>{copy.final.delverCta}</a>
            <a className="button button-ghost" href={COMMAND_TOWER_DOWNLOAD_URL}>{copy.final.commandCta}</a>
          </div>
        </div>
      </section>

      <footer>
        <div className="shell footer-inner">
          <span>© 2026 TWR</span>
          <div>
            <a href={`/${lang}#manifesto`}>{copy.nav.manifesto}</a>
            <a href={`/${lang}#delver`}>Delver</a>
            <a href={`/${lang}#command-tower`}>Command Tower</a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a>
          </div>
          <span>{copy.footerTagline}</span>
        </div>
      </footer>
    </main>
  );
}
