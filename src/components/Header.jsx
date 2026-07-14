import { brand, site, nav } from '../data/site.js';
import Logo from './Logo.jsx';

export default function Header() {
  return (
    <header
      style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(244,240,231,0.9)', backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${brand.border}`,
      }}
    >
      <div
        className="wrap"
        style={{ padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}
      >
        <a href="#hero" aria-label="Araçatuba Distribuidora"><Logo size={44} /></a>
        <nav className="nav-links">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="link-ink" style={{ fontWeight: 600, fontSize: 14 }}>
              {n.label}
            </a>
          ))}
          <a
            href={site.wa} target="_blank" rel="noreferrer"
            className="btn-green"
            style={{ fontWeight: 700, fontSize: 14, padding: '10px 18px', borderRadius: 999 }}
          >
            Fale conosco
          </a>
        </nav>
      </div>
    </header>
  );
}
