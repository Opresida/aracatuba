import { brand } from '../data/site.js';
import Reveal from './Reveal.jsx';

export default function Estrutura() {
  return (
    <section id="estrutura" className="wrap" style={{ padding: '88px 28px' }}>
      <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 38, maxWidth: 640 }}>
        <span style={{ fontWeight: 700, fontSize: 12.5, letterSpacing: '0.22em', color: brand.gold, textTransform: 'uppercase' }}>Nossa estrutura</span>
        <h2 className="section-h2" style={{ margin: 0, fontWeight: 900, fontSize: 40, lineHeight: 1.05, letterSpacing: '-0.02em', color: brand.green, textWrap: 'balance' }}>
          Espaço, organização e capacidade para escalar.
        </h2>
        <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.6, color: brand.ink, textWrap: 'pretty' }}>
          Nosso galpão foi pensado para armazenar com segurança e separar pedidos com rapidez.
        </p>
      </Reveal>

      <Reveal className="estrutura-grid">
        <div className="estr-main" style={{ gridRow: 'span 2', borderRadius: 22, overflow: 'hidden' }}>
          <img src="/images/galpao-1.webp" alt="Galpão da Araçatuba" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ borderRadius: 22, overflow: 'hidden' }}>
          <img src="/images/galpao-2.webp" alt="Prateleiras e estoque" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ borderRadius: 22, overflow: 'hidden' }}>
          <img src="/images/galpao-3.webp" alt="Doca e separação de pedidos" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </Reveal>
    </section>
  );
}
