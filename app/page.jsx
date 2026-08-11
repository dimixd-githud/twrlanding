import ScrollHero from '../components/ScrollHero';
import ScrollHeader from '../components/ScrollHeader';
import ManifestoSection from '../components/ManifestoSection';

const delverFeatures = [
  ['Character Builder', 'Guided character creation and level progression.'],
  ['Inventory', 'Equipment, consumables and resources in one place.'],
  ['Combat Tracker', 'HP, conditions and character resources during encounters.'],
  ['Spells', 'Search, prepare and keep your magic close at hand.'],
  ['Notes', 'Keep the details worth remembering near your character.'],
  ['Recorder', 'Capture the session and return to it later.'],
];

const commandFeatures = [
  ['Combat Tracker', 'Initiative, HP, conditions and encounter control.'],
  ['Loot Generator', 'Generate rewards without stopping the session.'],
  ['Spells & Bestiary', 'Reference what you need without leaving the workspace.'],
  ['Notes & Recorder', 'Capture ideas, rulings and sessions as they happen.'],
  ['Player View', 'Organize images and reveal only what the table should see.'],
  ['Campaign Compendium', 'Bring campaign knowledge in from Notion or Obsidian.'],
];

function FeatureGrid({ items }) {
  return (
    <div className="feature-grid">
      {items.map(([title, copy], index) => (
        <article className="feature-card" key={title}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <h3>{title}</h3>
          <p>{copy}</p>
        </article>
      ))}
    </div>
  );
}

function MediaGallery({ product }) {
  return (
    <div className="media-gallery" aria-label={`${product} media gallery`}>
      {[1, 2, 3, 4, 5].map((slot) => (
        <div className={`media-slot media-slot-${slot}`} key={slot}>
          <span>{String(slot).padStart(2, '0')}</span>
          <p>IMAGE / VIDEO</p>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <ScrollHeader />
      <ScrollHero />
      <ManifestoSection />

      <section className="product-section" id="delver">
        <div className="shell product-grid">
          <div className="product-copy">
            <p className="eyebrow">01 / FOR PLAYERS</p>
            <img className="product-logo delver-logo" src="/assets/delver-logo.svg" alt="TWR Delver" />
            <h2 className="section-subtitle">Your character.<br />Ready for the table.</h2>
            <p className="section-lede">
              Create, manage and play your character without turning the session into admin work. Delver connects the sheet to the tools you actually use at the table.
            </p>
            <a className="text-link" href="#">Open Delver <span>↗</span></a>
          </div>
          <div className="art-panel art-delver">
            <img src="/assets/delver-art.png" alt="Pixel art adventurer approaching a distant fantasy fortress" />
            <div className="art-label">DELVER / EXPEDITION VIEW</div>
          </div>
        </div>
        <div className="shell"><FeatureGrid items={delverFeatures} /></div>
        <div className="shell gallery-block">
          <p className="eyebrow gallery-eyebrow">DELVER IN ACTION</p>
          <h3 className="gallery-title section-subtitle">From character creation to the table.</h3>
          <MediaGallery product="Delver" />
        </div>
      </section>

      <section className="product-section command-section" id="command-tower">
        <div className="shell product-grid reverse">
          <div className="product-copy">
            <p className="eyebrow">02 / FOR DUNGEON MASTERS</p>
            <img className="product-logo command-logo" src="/assets/command-tower-logo.svg" alt="TWR Command Tower" />
            <h2 className="section-subtitle">Run the game.<br />Not the software.</h2>
            <p className="section-lede">
              A modular workspace for the tools you need during a session, without asking you to move your entire campaign into another platform.
            </p>
            <p className="pull-quote">Your campaign already has a home. Command Tower knows where to find it.</p>
            <a className="text-link" href="#">Download Command Tower <span>↓</span></a>
          </div>
          <div className="art-panel art-command">
            <img src="/assets/command-art.png" alt="Pixel art command terrace overlooking a monumental fantasy fortress" />
            <div className="art-label">COMMAND TOWER / OVERVIEW</div>
          </div>
        </div>
        <div className="shell"><FeatureGrid items={commandFeatures} /></div>
        <div className="shell gallery-block">
          <p className="eyebrow gallery-eyebrow">COMMAND TOWER IN ACTION</p>
          <h3 className="gallery-title section-subtitle">A clearer view of the whole session.</h3>
          <MediaGallery product="Command Tower" />
        </div>
      </section>

      <section className="community-section" id="community">
        <div className="shell community-inner">
          <div>
            <p className="eyebrow">BEHIND THE SCREEN</p>
            <h2 className="section-subtitle">We’re building<br />TWR in public.</h2>
          </div>
          <div className="community-copy">
            <p>Devlogs, new tools, design decisions and the absurdly specific situations that only happen at a TTRPG table.</p>
            <a className="button button-light" href="https://www.instagram.com/commandtwr" target="_blank" rel="noreferrer">Follow TWR on Instagram ↗</a>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="shell final-inner">
          <img src="/assets/twr-logo.svg" alt="TWR" />
          <p className="eyebrow">TWO APPS. ONE TABLE.</p>
          <h2 className="section-subtitle">Make room for the game.</h2>
          <div className="button-row centered">
            <a className="button button-primary" href="#">Open Delver</a>
            <a className="button button-ghost" href="#">Download Command Tower</a>
          </div>
        </div>
      </section>

      <footer>
        <div className="shell footer-inner">
          <span>© 2026 TWR</span>
          <div><a href="#delver">Delver</a><a href="#command-tower">Command Tower</a><a href="https://www.instagram.com/commandtwr" target="_blank" rel="noreferrer">Instagram</a></div>
          <span>Make room for the game.</span>
        </div>
      </footer>
    </main>
  );
}
