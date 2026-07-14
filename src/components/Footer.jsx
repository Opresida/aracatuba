import { Link } from 'react-router-dom';
import { brand, site } from '../data/site.js';
import Logo from './Logo.jsx';

const inst = [
  { href: '#empresa', label: 'A empresa' },
  { href: '#operacao', label: 'Operação' },
  { href: '#estrutura', label: 'Estrutura' },
  { href: '#ouvidoria', label: 'Ouvidoria' },
  { href: '#trabalhe', label: 'Trabalhe conosco' },
];

function Social({ label, children }) {
  return (
    <a href="#" aria-label={label} className="social" style={{ width: 42, height: 42, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer style={{ background: brand.ink, color: 'rgba(255,255,255,0.72)' }}>
      <div className="wrap footer-grid" style={{ padding: '64px 28px 36px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <Logo size={48} nameColor="#fff" subColor={brand.gold} />
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, maxWidth: 320 }}>
            {site.tagline}. Distribuição de alimentos e bebidas em Manaus e região.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <Social label="Instagram">
              <span style={{ width: 18, height: 18, border: '2px solid #fff', borderRadius: 6, position: 'relative', display: 'block' }}>
                <span style={{ position: 'absolute', top: 3, left: 3, width: 8, height: 8, border: '2px solid #fff', borderRadius: '50%' }} />
                <span style={{ position: 'absolute', top: 1, right: 1, width: 2.5, height: 2.5, background: '#fff', borderRadius: '50%' }} />
              </span>
            </Social>
            <Social label="Facebook"><span style={{ fontWeight: 900, fontSize: 22, fontFamily: 'Georgia, serif' }}>f</span></Social>
            <Social label="X"><span style={{ fontWeight: 800, fontSize: 18 }}>𝕏</span></Social>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontWeight: 800, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff' }}>Contato</div>
          <div style={{ fontSize: 14, lineHeight: 1.5 }}>
            {site.endereco.map((l, i) => <span key={i}>{l}<br /></span>)}
          </div>
          <div style={{ fontSize: 14 }}>Tel: {site.telefone}</div>
          <a href={site.wa} target="_blank" rel="noreferrer" style={{ fontSize: 14, color: brand.gold, fontWeight: 700 }}>Falar no WhatsApp →</a>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontWeight: 800, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff' }}>Institucional</div>
          {inst.map((n) => (
            <a key={n.href} href={n.href} className="link-foot" style={{ fontSize: 14 }}>{n.label}</a>
          ))}
          <Link to="/brandbook" className="link-foot" style={{ fontSize: 14 }}>Manual de marca</Link>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="wrap" style={{ padding: '22px 28px', display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', fontSize: 12.5, color: 'rgba(255,255,255,0.5)' }}>
          <span>© 2026 {site.razaoSocial} — CNPJ {site.cnpj}</span>
          <span>Todos os direitos reservados.</span>
        </div>
      </div>
    </footer>
  );
}
