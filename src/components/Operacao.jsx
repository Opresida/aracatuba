import { brand, site } from '../data/site.js';
import Reveal from './Reveal.jsx';

const feats = [
  { t: 'Roteirização', d: 'entregas organizadas por região' },
  { t: 'Depósito próprio', d: 'armazenagem e separação ágil' },
  { t: 'Frota dedicada', d: 'transporte rodoviário de carga' },
];

export default function Operacao() {
  return (
    <section id="operacao" className="wrap" style={{ padding: '88px 28px' }}>
      <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40, maxWidth: 640 }}>
        <span style={{ fontWeight: 700, fontSize: 12.5, letterSpacing: '0.22em', color: brand.gold, textTransform: 'uppercase' }}>Operação</span>
        <h2 className="section-h2" style={{ margin: 0, fontWeight: 900, fontSize: 40, lineHeight: 1.05, letterSpacing: '-0.02em', color: brand.green, textWrap: 'balance' }}>
          Uma logística que veste a camisa da marca.
        </h2>
        <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.6, color: brand.ink, textWrap: 'pretty' }}>
          Do depósito à porta do cliente, cada etapa é pensada para a mercadoria chegar certa e no tempo. Nossa frota carrega a identidade da Araçatuba por toda a região.
        </p>
      </Reveal>

      {/* Painel da marca */}
      <Reveal className="brand-panel" style={{ borderRadius: 24, background: brand.green, position: 'relative', overflow: 'hidden', marginBottom: 20 }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: 280, height: 280, background: 'rgba(217,164,65,0.12)', borderRadius: '50%', transform: 'translate(90px,-90px)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 32, position: 'relative', flexWrap: 'wrap' }}>
          <div style={{ width: 110, height: 110, borderRadius: 20, background: brand.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', flex: 'none' }}>
            <div style={{ position: 'absolute', inset: 8, border: `2.5px solid ${brand.green}`, borderRadius: 13, opacity: 0.7 }} />
            <span style={{ fontWeight: 900, fontSize: 70, lineHeight: 1, color: brand.green, letterSpacing: '-0.03em' }}>A</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div className="op-badge" style={{ fontWeight: 900, fontSize: 52, lineHeight: 0.9, color: '#fff', letterSpacing: '-0.02em' }}>ARAÇATUBA</div>
            <div style={{ fontWeight: 700, fontSize: 17, letterSpacing: '0.34em', color: brand.gold }}>DISTRIBUIDORA</div>
            <div style={{ marginTop: 6, fontWeight: 600, fontSize: 14, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase' }}>{site.tagline}</div>
          </div>
        </div>
        <div style={{ marginTop: 34, height: 2, background: 'rgba(255,255,255,0.12)' }} />
        <div style={{ marginTop: 22, display: 'flex', gap: 40, flexWrap: 'wrap' }}>
          {feats.map((f) => (
            <div key={f.t} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontWeight: 800, fontSize: 15, color: brand.gold }}>{f.t}</span>
              <span style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.8)' }}>{f.d}</span>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="op-media">
        {['frota-1', 'frota-2'].map((img, i) => (
          <Reveal key={img} delay={i * 0.1} style={{ borderRadius: 20, overflow: 'hidden', aspectRatio: '16 / 10' }}>
            <img src={`/images/${img}.webp`} alt="Frota da Araçatuba" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
