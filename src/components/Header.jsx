import { useState } from 'react';
import { brand, site, nav } from '../data/site.js';
import Logo from './Logo.jsx';

export default function Header() {
  const [open, setOpen] = useState(false);

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
        style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}
      >
        <a href="#hero" aria-label="Araçatuba Distribuidora" onClick={() => setOpen(false)}><Logo size={44} /></a>

        {/* Navegação desktop */}
        <nav className="nav-desktop">
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

        {/* Botão hamburger (mobile) */}
        <button
          className="nav-toggle"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Menu mobile */}
      {open && (
        <div className="mobile-menu">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="link-ink" onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ))}
          <a
            href={site.wa} target="_blank" rel="noreferrer"
            className="btn-green"
            onClick={() => setOpen(false)}
            style={{ marginTop: 12, textAlign: 'center', fontWeight: 700, fontSize: 15, padding: '13px 18px', borderRadius: 999 }}
          >
            Fale conosco
          </a>
        </div>
      )}
    </header>
  );
}
